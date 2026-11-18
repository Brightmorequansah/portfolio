<!--
	Full-screen, one-at-a-time project showcase.
	Navigate with the mouse wheel (desktop), arrow / page keys, swipes, the arrow buttons or the dots.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import ProjectSlide from './ProjectSlide.svelte';
	import { projects } from '#lib/data/projects.js';

	// /projects?project=<slug> opens straight on that project
	const requested = projects.findIndex((p) => p.slug === page.url.searchParams.get('project'));
	let current = $state(Math.max(0, requested));
	let interacted = $state(false);
	let locked = false;

	const total = projects.length;

	function go(index: number) {
		const next = Math.max(0, Math.min(total - 1, index));
		if (next === current) return;
		current = next;
		interacted = true;
		locked = true;
		setTimeout(() => (locked = false), 900);
	}
	const next = () => go(current + 1);
	const prev = () => go(current - 1);

	onMount(() => {
		const desktop = window.matchMedia('(min-width: 1024px)');

		function onWheel(e: WheelEvent) {
			if (!desktop.matches) return; // mobile slides scroll internally
			// trackpad pinch and Ctrl + wheel arrive as wheel events with ctrlKey set:
			// leave those to the browser so zooming still works
			if (e.ctrlKey) return;
			e.preventDefault();
			if (locked || Math.abs(e.deltaY) < 30) return;
			if (e.deltaY > 0) next();
			else prev();
		}

		function onKey(e: KeyboardEvent) {
			if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return;
			if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
				e.preventDefault();
				next();
			} else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
				e.preventDefault();
				prev();
			}
		}

		let startX = 0;
		let startY = 0;
		function onTouchStart(e: TouchEvent) {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		}
		function onTouchEnd(e: TouchEvent) {
			const dx = e.changedTouches[0].clientX - startX;
			const dy = e.changedTouches[0].clientY - startY;
			// horizontal swipes only on mobile, so vertical scrolling inside a slide still works
			if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
				if (dx < 0) next();
				else prev();
			}
		}

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		return () => {
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchend', onTouchEnd);
		};
	});

	const arrowBtn =
		'flex size-10 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm backdrop-blur-sm transition-all hover:bg-surface-raised disabled:pointer-events-none disabled:opacity-30';
	const dot = (active: boolean) =>
		`rounded-full transition-all duration-300 ${active ? 'bg-accent' : 'bg-border hover:bg-subtle'}`;
</script>

<div class="h-dvh overflow-hidden pt-16">
	{#key current}
		<!-- each slide's pieces fade up on their own (see ProjectSlide) -->
		<div class="h-full">
			<div class="h-full overflow-y-auto pb-28 lg:flex lg:items-center lg:overflow-hidden lg:pb-0">
				<!-- right padding keeps content clear of the fixed arrow column -->
				<Container class="py-10 md:px-8 lg:py-0 lg:pr-28 lg:pl-16">
					<ProjectSlide project={projects[current]} index={current} {total} />
				</Container>
			</div>
		</div>
	{/key}
</div>

<p class="sr-only" aria-live="polite">
	Project {current + 1} of {total}: {projects[current].title}
</p>

<!-- Arrow controls: right edge on desktop, bottom centre on mobile -->
<div
	class="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-4 md:top-1/2 md:right-8 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2 md:flex-col"
>
	<button
		type="button"
		class={arrowBtn}
		onclick={prev}
		disabled={current === 0}
		aria-label="Previous project"
	>
		<ChevronUp class="hidden size-4 md:block" /><ChevronLeft class="size-4 md:hidden" />
	</button>
	<button
		type="button"
		class={arrowBtn}
		onclick={next}
		disabled={current === total - 1}
		aria-label="Next project"
	>
		<ChevronDown class="hidden size-4 md:block" /><ChevronRight class="size-4 md:hidden" />
	</button>
</div>

<!-- Dots: left edge vertical on desktop, top centre horizontal on mobile -->
<div class="fixed top-1/2 left-8 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
	{#each projects as p, i (p.slug)}
		<button
			type="button"
			class="h-12 w-2 {dot(i === current)}"
			onclick={() => go(i)}
			aria-label="Go to {p.title}"
			aria-current={i === current}
		></button>
	{/each}
</div>
<div class="fixed top-20 left-1/2 z-40 flex -translate-x-1/2 gap-2 md:hidden">
	{#each projects as p, i (p.slug)}
		<button
			type="button"
			class="h-2 w-8 {dot(i === current)}"
			onclick={() => go(i)}
			aria-label="Go to {p.title}"
			aria-current={i === current}
		></button>
	{/each}
</div>

<!-- Hint, hidden after first interaction.
	 Mobile: text above the bottom arrows · desktop: a small mouse under the side arrows, clear of the content. -->
{#if !interacted}
	<div
		in:fade={{ delay: 1200, duration: 600 }}
		out:fade={{ duration: 300 }}
		class="pointer-events-none fixed bottom-20 left-1/2 z-30 -translate-x-1/2 text-center md:top-[calc(50%+4.5rem)] md:right-8 md:bottom-auto md:left-auto md:flex md:w-10 md:translate-x-0 md:flex-col md:items-center"
	>
		<p
			class="rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs whitespace-nowrap text-muted backdrop-blur-sm md:hidden"
		>
			Swipe or tap arrows to explore
		</p>
		<div class="hidden h-10 w-6 justify-center rounded-full border-2 border-border md:flex">
			<div class="mt-2 h-3 w-1 animate-wheel rounded-full bg-subtle"></div>
		</div>
		<p class="mt-2 hidden text-[10px] tracking-[0.18em] text-muted uppercase md:block">Scroll</p>
	</div>
{/if}
