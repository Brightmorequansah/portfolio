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
	// 1 = moved forward, -1 = moved back; on phones the new slide enters from that side
	let direction = $state(0);

	const total = projects.length;
	const atEnd = $derived(current === total - 1);

	function go(index: number) {
		const next = Math.max(0, Math.min(total - 1, index));
		if (next === current) return;
		direction = next > current ? 1 : -1;
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

		// Swipes: the first ~10px of movement decide the axis. Sideways → it's ours (and we cancel
		// the browser's own "swipe = go back" gesture); up/down → normal scrolling, untouched.
		let startX = 0;
		let startY = 0;
		let axis: 'x' | 'y' | null = null;
		function onTouchStart(e: TouchEvent) {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			axis = null;
		}
		function onTouchMove(e: TouchEvent) {
			const dx = e.touches[0].clientX - startX;
			const dy = e.touches[0].clientY - startY;
			if (!axis && Math.hypot(dx, dy) > 10) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
			if (axis === 'x' && e.cancelable) e.preventDefault();
		}
		function onTouchEnd(e: TouchEvent) {
			if (axis !== 'x') return;
			const dx = e.changedTouches[0].clientX - startX;
			if (Math.abs(dx) > 50) {
				if (dx < 0) next();
				else prev();
			}
		}

		window.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKey);
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		// not passive: it has to be able to cancel the browser's sideways gesture
		window.addEventListener('touchmove', onTouchMove, { passive: false });
		window.addEventListener('touchend', onTouchEnd, { passive: true });

		// Horizontal swipes belong to this page: stop the browser from treating a sideways swipe
		// as "go back / forward" (Chrome's overscroll history navigation) while it is open.
		const root = document.documentElement;
		const previousOverscroll = root.style.overscrollBehaviorX;
		root.style.overscrollBehaviorX = 'none';

		return () => {
			root.style.overscrollBehaviorX = previousOverscroll;
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	});

	const arrowBtn =
		'flex size-10 items-center justify-center rounded-full border border-border bg-background/80 shadow-sm backdrop-blur-sm transition-all hover:bg-surface-raised disabled:pointer-events-none disabled:opacity-30';
	const dot = (active: boolean) =>
		`rounded-full transition-all duration-300 ${active ? 'bg-accent' : 'bg-border hover:bg-subtle'}`;
</script>

<!-- touch-pan-y: vertical scrolling stays native; horizontal swipes are handled above -->
<div class="h-dvh touch-pan-y overflow-hidden overscroll-x-none pt-16">
	{#key current}
		<!-- each slide's pieces fade up on their own (see ProjectSlide);
		     on phones the whole slide also glides in from the side you swiped toward -->
		<div class="h-full max-md:animate-slide-in" style:--slide-from="{direction * 48}px">
			<div class="h-full overflow-y-auto pb-28 lg:flex lg:items-center lg:overflow-hidden lg:pb-0">
				<!-- right padding keeps content clear of the fixed arrow column;
				     phones: top padding clears the fixed stepper bar -->
				<Container class="pt-36 pb-10 md:px-8 md:py-10 lg:py-0 lg:pr-28 lg:pl-16">
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
<!-- Phones: stepper bar under the navbar (dots + an always-on swipe hint) -->
<div
	class="fixed inset-x-0 top-16 z-40 border-b border-border/60 bg-background/90 pt-5 pb-4 backdrop-blur-md md:hidden"
>
	<div class="flex justify-center gap-2">
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

	<!-- swipe hint: label nudges and the thumb glides in the swipe direction
	     (leftward for "next"; rightward once you reach the last project) -->
	<div
		class="mt-4 flex flex-col items-center gap-2"
		style:--nudge={atEnd ? '4px' : '-4px'}
		style:--swipe-from={atEnd ? '0' : '2.75rem'}
		style:--swipe-to={atEnd ? '2.75rem' : '0'}
		aria-hidden="true"
	>
		<p class="animate-swipe-nudge text-xs text-muted">
			{atEnd ? 'Swipe right for previous project' : 'Swipe to see next project'}
		</p>
		<span class="relative h-0.5 w-16 overflow-hidden rounded-full bg-border">
			<span class="absolute inset-y-0 left-0 w-5 animate-swipe-thumb rounded-full bg-foreground"
			></span>
		</span>
	</div>
</div>

<!-- Desktop hint, hidden after first interaction: a small mouse under the side arrows.
	 (Phones get the always-on swipe hint in the stepper bar above.) -->
{#if !interacted}
	<div
		in:fade={{ delay: 1200, duration: 600 }}
		out:fade={{ duration: 300 }}
		class="pointer-events-none fixed top-[calc(50%+4.5rem)] right-8 z-30 hidden w-10 flex-col items-center md:flex"
	>
		<div class="flex h-10 w-6 justify-center rounded-full border-2 border-border">
			<div class="mt-2 h-3 w-1 animate-wheel rounded-full bg-subtle"></div>
		</div>
		<p class="mt-2 text-[10px] tracking-[0.18em] text-muted uppercase">Scroll</p>
	</div>
{/if}
