<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import { reveal } from '#lib/motion.js';
	import type { TimelineItem } from '#lib/data/experience.js';

	let {
		heading,
		items,
		toggleLabel = 'Show details'
	}: { heading: string; items: TimelineItem[]; toggleLabel?: string } = $props();

	let open = $state<Record<number, boolean>>({});
</script>

<div>
	<h3 class="mb-6 flex items-center text-xl font-light">
		<span use:reveal={{ width: '1.5rem', duration: 0.6 }} class="mr-3 h-0.5 w-6 bg-accent"></span>
		{heading}
	</h3>

	<div class="space-y-6">
		{#each items as item, i (item.title + item.period)}
			<div
				use:reveal={{ x: -10, delay: i * 0.1 }}
				class="relative border-l border-border pb-6 pl-6 last:border-transparent last:pb-0"
			>
				<div
					use:reveal={{ scale: 0, delay: 0.2 + i * 0.1, duration: 0.4 }}
					class="absolute top-0 -left-1.5 size-3 rounded-full bg-accent"
				></div>
				<div class="mb-1 text-sm text-subtle">{item.period}</div>
				<h4 class="font-medium">{item.title}</h4>
				<p class="mb-1 text-sm text-soft">{item.org}</p>
				<p class="mb-2 text-sm text-muted">{item.summary}</p>

				{#if item.details?.length}
					<button
						type="button"
						class="mt-2 flex items-center text-xs font-medium hover:underline"
						aria-expanded={!!open[i]}
						onclick={() => (open[i] = !open[i])}
					>
						{open[i] ? toggleLabel.replace(/^Show/, 'Hide') : toggleLabel}
						<ChevronDown
							class="ml-1 size-3 transition-transform duration-300 {open[i] ? 'rotate-180' : ''}"
						/>
					</button>
					{#if open[i]}
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
		{/each}
	</div>
</div>
