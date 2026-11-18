<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import { reveal } from '#lib/motion.js';
	import type { TimelineItem } from '#lib/data/experience.js';

	let {
		heading,
		items,
		toggleLabel = 'Show details',
		defaultOpen = false
	}: {
		heading: string;
		items: TimelineItem[];
		toggleLabel?: string;
		/** start with every item's details expanded */
		defaultOpen?: boolean;
	} = $props();

	// items the visitor has toggled away from the default state
	let toggled = $state<Record<number, boolean>>({});
	const isOpen = (i: number) => (toggled[i] ? !defaultOpen : defaultOpen);
</script>

<div>
	<h3 class="mb-6 flex items-center text-xl font-light">
		<span use:reveal={{ width: '1.5rem', duration: 0.6 }} class="mr-3 h-0.5 w-6 bg-accent"></span>
		{heading}
	</h3>

	<div class="space-y-6">
		{#each items as item, i (item.title + item.period)}
			<!-- outer div: scroll reveal · inner elements: hover (line fills, dot halo, content nudges) -->
			<div use:reveal={{ x: -10, delay: i * 0.1 }} class="group relative pb-6 pl-6 last:pb-0">
				<!-- timeline line + an accent fill that draws down it on hover (hidden after the last item) -->
				<span aria-hidden="true" class="absolute inset-y-0 left-0 w-px bg-border group-last:hidden"
				></span>
				<span
					aria-hidden="true"
					class="absolute top-0 left-0 h-0 w-px bg-accent transition-[height] duration-500 ease-out group-last:hidden group-hover:h-full"
				></span>

				<!-- dot: wrapper scales in on scroll, inner dot grows + gains a halo on hover -->
				<div
					use:reveal={{ scale: 0, delay: 0.2 + i * 0.1, duration: 0.4 }}
					class="absolute top-0 -left-1.5"
				>
					<span
						class="block size-3 rounded-full bg-accent ring-0 ring-accent/15 transition-all duration-300 group-hover:scale-125 group-hover:ring-4"
					></span>
				</div>

				<div class="transition-transform duration-300 ease-out group-hover:translate-x-1">
					<div
						class="mb-1 text-sm text-subtle transition-colors duration-300 group-hover:text-foreground"
					>
						{item.period}
					</div>
					<h4 class="font-medium">
						<span
							class="bg-linear-to-r from-accent to-accent bg-size-[0%_1px] bg-bottom-left bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-size-[100%_1px]"
						>
							{item.title}
						</span>
					</h4>
					<p class="mb-1 text-sm text-soft">{item.org}</p>
					<p class="mb-2 text-sm text-muted transition-colors duration-300 group-hover:text-soft">
						{item.summary}
					</p>

					{#if item.details?.length}
						<button
							type="button"
							class="mt-2 flex items-center text-xs font-medium hover:underline"
							aria-expanded={isOpen(i)}
							onclick={() => (toggled[i] = !toggled[i])}
						>
							{isOpen(i) ? toggleLabel.replace(/^Show/, 'Hide') : toggleLabel}
							<ChevronDown
								class="ml-1 size-3 transition-transform duration-300 {isOpen(i)
									? 'rotate-180'
									: ''}"
							/>
						</button>
						{#if isOpen(i)}
							<ul
								transition:slide={{ duration: 300 }}
								class="mt-3 list-disc space-y-1 pl-4 text-sm text-muted"
							>
								{#each item.details as d (d)}
									<li>{d}</li>
								{/each}
							</ul>
						{/if}
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
