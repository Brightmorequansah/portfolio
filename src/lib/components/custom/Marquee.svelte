<!--
	Infinite horizontal marquee of icon + label pills.
	- The item set is repeated enough to fill wide screens, then the whole track is doubled and
	  slid by -50% so the loop is seamless.
	- Edges fade out, hovering pauses the row, each pill inverts on hover.
	- Reduced motion: the global rule in layout.css stops the animation (static row).
-->
<script lang="ts">
	type Item = { title: string; path: string };

	let {
		items,
		reverse = false,
		duration = 40,
		label
	}: {
		items: Item[];
		/** scroll right → left (default) or left → right */
		reverse?: boolean;
		/** seconds for one full loop */
		duration?: number;
		/** accessible name for the list */
		label: string;
	} = $props();

	// repeat short lists so one set is wider than the viewport
	const set = $derived(items.length < 8 ? [...items, ...items] : items);
</script>

{#snippet pills(list: Item[], hidden: boolean)}
	<ul
		class="flex shrink-0 gap-4 pr-4"
		aria-hidden={hidden ? 'true' : undefined}
		aria-label={hidden ? undefined : label}
	>
		{#each list as item, i (item.title + i)}
			<li
				class="flex shrink-0 cursor-default items-center gap-3 rounded-full border border-border bg-background px-5 py-3 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground md:px-6 md:py-4"
			>
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-5 md:size-6">
					<path d={item.path} />
				</svg>
				<span class="text-sm whitespace-nowrap md:text-base">{item.title}</span>
			</li>
		{/each}
	</ul>
{/snippet}

<div
	class="group relative flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] py-1"
>
	<div
		class="flex w-max animate-marquee group-hover:[animation-play-state:paused] {reverse
			? '[animation-direction:reverse]'
			: ''}"
		style="--marquee-duration: {duration}s"
	>
		{@render pills(set, false)}
		{@render pills(set, true)}
	</div>
</div>
