<!--
	Hero background: a three.js wireframe "terrain" of flowing lines.
	- Rows of lines ripple with layered sine waves; sparse cross-lines give it a constructed grid feel.
	- The surface lifts gently towards the cursor.
	- Drawn in the current foreground colour at low opacity, so it follows light/dark mode.
	- Pauses when off-screen; renders a single still frame for reduced-motion users.
	three.js is loaded lazily in the browser, so it never runs during SSR.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '#lib/motion.js';

	let container: HTMLDivElement;

	const ROWS = 56; // lines running left → right
	const COLS = 160; // points per row
	const CROSS_EVERY = 10; // a front → back line every N points
	const WIDTH = 34;
	const DEPTH = 26;

	const vertexShader = /* glsl */ `
		uniform float uTime;
		uniform vec2 uPointer;
		attribute float aCross;
		varying float vAlpha;

		float wave(vec2 p, float t) {
			return sin(p.x * 0.32 + t * 0.9 + p.y * 0.45) * 0.55
				+ sin(p.x * 0.75 - t * 1.25 + p.y * 0.18) * 0.22
				+ sin(p.y * 0.62 + t * 0.6) * 0.32;
		}

		void main() {
			vec3 p = position;
			float t = uTime * 0.35;

			p.y += wave(p.xz, t);

			// soft swell under the pointer
			vec2 target = vec2(uPointer.x * 12.0, -6.0 - uPointer.y * 5.0);
			float d = distance(p.xz, target);
			p.y += exp(-d * d * 0.06) * 1.1;

			vec4 mv = modelViewMatrix * vec4(p, 1.0);
			gl_Position = projectionMatrix * mv;

			float depthFade = clamp(1.0 - (-mv.z - 3.0) / 24.0, 0.0, 1.0);
			float edgeFade = 1.0 - smoothstep(${(WIDTH * 0.3).toFixed(1)}, ${(WIDTH * 0.5).toFixed(1)}, abs(position.x));
			vAlpha = depthFade * edgeFade * mix(1.0, 0.45, aCross);
		}
	`;

	const fragmentShader = /* glsl */ `
		uniform vec3 uColor;
		uniform float uOpacity;
		varying float vAlpha;

		void main() {
			gl_FragColor = vec4(uColor, vAlpha * uOpacity);
		}
	`;

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		import('three').then((THREE) => {
			if (disposed) return;

			const still = prefersReducedMotion();
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
				powerPreference: 'low-power'
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
			renderer.setClearColor(0x000000, 0);
			container.appendChild(renderer.domElement);
			renderer.domElement.style.display = 'block';

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
			camera.position.set(0, 3.4, 8);
			camera.lookAt(0, -0.5, -5);

			// Build all lines as one LineSegments geometry (a single draw call)
			const positions: number[] = [];
			const cross: number[] = [];
			const at = (row: number, col: number) => [
				(col / (COLS - 1) - 0.5) * WIDTH,
				0,
				4 - (row / (ROWS - 1)) * DEPTH
			];
			for (let r = 0; r < ROWS; r++) {
				for (let c = 0; c < COLS - 1; c++) {
					positions.push(...at(r, c), ...at(r, c + 1));
					cross.push(0, 0);
				}
			}
			for (let c = 0; c < COLS; c += CROSS_EVERY) {
				for (let r = 0; r < ROWS - 1; r++) {
					positions.push(...at(r, c), ...at(r + 1, c));
					cross.push(1, 1);
				}
			}

			const geometry = new THREE.BufferGeometry();
			geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
			geometry.setAttribute('aCross', new THREE.Float32BufferAttribute(cross, 1));

			const uniforms = {
				uTime: { value: 0 },
				uPointer: { value: new THREE.Vector2(0, 0) },
				uColor: { value: new THREE.Color() },
				uOpacity: { value: 0.3 }
			};
			const material = new THREE.ShaderMaterial({
				uniforms,
				vertexShader,
				fragmentShader,
				transparent: true,
				depthWrite: false
			});
			scene.add(new THREE.LineSegments(geometry, material));

			// colour follows the theme's foreground token
			const syncColour = () => {
				const isDark = document.documentElement.classList.contains('dark');
				uniforms.uColor.value.set(getComputedStyle(container).color);
				uniforms.uOpacity.value = isDark ? 0.3 : 0.3;
			};
			syncColour();
			const themeObserver = new MutationObserver(() => {
				syncColour();
				if (still) renderer.render(scene, camera);
			});
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class']
			});

			const resize = () => {
				const { clientWidth: w, clientHeight: h } = container;
				if (!w || !h) return;
				renderer.setSize(w, h, false);
				renderer.domElement.style.width = '100%';
				renderer.domElement.style.height = '100%';
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				if (still) renderer.render(scene, camera);
			};
			const resizeObserver = new ResizeObserver(resize);
			resizeObserver.observe(container);

			// pointer (smoothed), normalised to -1..1 across the viewport
			const pointer = new THREE.Vector2(0, 0);
			const onPointer = (e: PointerEvent) => {
				pointer.set(
					(e.clientX / window.innerWidth) * 2 - 1,
					(e.clientY / window.innerHeight) * 2 - 1
				);
			};

			const clock = new THREE.Clock();
			let frame = 0;
			let running = false;

			const tick = () => {
				uniforms.uTime.value = clock.getElapsedTime();
				uniforms.uPointer.value.lerp(pointer, 0.04);
				renderer.render(scene, camera);
				frame = requestAnimationFrame(tick);
			};
			const start = () => {
				if (running || still) return;
				running = true;
				clock.start();
				frame = requestAnimationFrame(tick);
			};
			const stop = () => {
				running = false;
				clock.stop();
				cancelAnimationFrame(frame);
			};

			const visibility = new IntersectionObserver(([entry]) =>
				entry.isIntersecting ? start() : stop()
			);

			resize();
			if (still) {
				uniforms.uTime.value = 4;
				renderer.render(scene, camera);
			} else {
				window.addEventListener('pointermove', onPointer, { passive: true });
				visibility.observe(container);
			}

			cleanup = () => {
				stop();
				visibility.disconnect();
				resizeObserver.disconnect();
				themeObserver.disconnect();
				window.removeEventListener('pointermove', onPointer);
				geometry.dispose();
				material.dispose();
				renderer.dispose();
				renderer.domElement.remove();
			};
		});

		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<!-- text-foreground: the canvas reads this colour; the mask fades the field out at the top and edges -->
<div
	bind:this={container}
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_80%_70%_at_50%_60%,black_30%,transparent_85%)] text-foreground"
></div>
