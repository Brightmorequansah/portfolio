<!--
	Rotating 3D sphere of technology logos drawn on a canvas.
	Icons are simple-icons SVG paths, painted in the current text colour so they follow light/dark mode.
	Mouse position over the canvas steers the spin; pauses when off-screen.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '#lib/motion.js';

	let { icons, size = 420 }: { icons: { title: string; path: string }[]; size?: number } = $props();

	let canvas: HTMLCanvasElement;
	let wrapper: HTMLDivElement;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = size * dpr;
		canvas.height = size * dpr;
		ctx.scale(dpr, dpr);

		const radius = size * 0.38;
		const iconSize = size * 0.08;
		const paths = icons.map((i) => new Path2D(i.path));

		// even distribution on a sphere (Fibonacci lattice)
		const points = icons.map((_, i) => {
			const y = 1 - (i / (icons.length - 1)) * 2;
			const r = Math.sqrt(1 - y * y);
			const theta = Math.PI * (3 - Math.sqrt(5)) * i;
			return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
		});

		let rotX = 0.3;
		let rotY = 0;
		let speedX = 0.002;
		let speedY = 0.004;
		let targetX = speedX;
		let targetY = speedY;
		let visible = true;
		let frame = 0;

		const colour = () => getComputedStyle(wrapper).color;

		function draw() {
			const fill = colour();
			ctx.clearRect(0, 0, size, size);
			const cx = Math.cos(rotX),
				sx = Math.sin(rotX),
				cy = Math.cos(rotY),
				sy = Math.sin(rotY);

			const projected = points
				.map((p, i) => {
					// rotate around Y then X
					const x1 = p.x * cy - p.z * sy;
					const z1 = p.x * sy + p.z * cy;
					const y2 = p.y * cx - z1 * sx;
					const z2 = p.y * sx + z1 * cx;
					return { i, x: x1, y: y2, z: z2 };
				})
				.sort((a, b) => a.z - b.z);

			for (const p of projected) {
				const depth = (p.z + 1) / 2; // 0 back → 1 front
				const scale = 0.6 + depth * 0.6;
				const s = (iconSize * scale) / 24;
				ctx.save();
				ctx.globalAlpha = 0.15 + depth * 0.85;
				ctx.translate(size / 2 + p.x * radius - 12 * s, size / 2 + p.y * radius - 12 * s);
				ctx.scale(s, s);
				ctx.fillStyle = fill;
				ctx.fill(paths[p.i]);
				ctx.restore();
			}
		}

		function tick() {
			speedX += (targetX - speedX) * 0.05;
			speedY += (targetY - speedY) * 0.05;
			rotX += speedX;
			rotY += speedY;
			draw();
			if (visible) frame = requestAnimationFrame(tick);
		}

		function onMove(e: PointerEvent) {
			const rect = canvas.getBoundingClientRect();
			const nx = (e.clientX - rect.left) / rect.width - 0.5;
			const ny = (e.clientY - rect.top) / rect.height - 0.5;
			targetY = nx * 0.03;
			targetX = -ny * 0.03;
		}
		function onLeave() {
			targetX = 0.002;
			targetY = 0.004;
		}

		if (prefersReducedMotion()) {
			draw();
			const mo = new MutationObserver(draw);
			mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
			return () => mo.disconnect();
		}

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			cancelAnimationFrame(frame);
			if (visible) frame = requestAnimationFrame(tick);
		});
		io.observe(canvas);
		canvas.addEventListener('pointermove', onMove);
		canvas.addEventListener('pointerleave', onLeave);

		return () => {
			cancelAnimationFrame(frame);
			io.disconnect();
			canvas.removeEventListener('pointermove', onMove);
			canvas.removeEventListener('pointerleave', onLeave);
		};
	});
</script>

<div
	bind:this={wrapper}
	class="relative flex w-full items-center justify-center overflow-hidden text-foreground"
	role="img"
	aria-label="Technologies: {icons.map((i) => i.title).join(', ')}"
>
	<canvas
		bind:this={canvas}
		style="width: {size}px; height: {size}px"
		class="max-w-full rounded-lg"
		aria-hidden="true"
	></canvas>
</div>
