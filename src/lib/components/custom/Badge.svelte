<!--
	Minimal pill label for short tags (tech stack, statuses…).
	variant: outline (default, hairline border) · soft (filled surface) · solid (inverted accent).
	color: any CSS colour (e.g. a brand hex from techColor()) → tinted border, text and wash in that colour.
	  The text is blended toward the theme foreground so light brands stay readable on white
	  and dark brands stay readable on black.
	Icons passed as children are sized automatically.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'outline' | 'soft' | 'solid';

	let {
		children,
		variant = 'outline',
		color,
		class: className = '',
		...rest
	}: HTMLAttributes<HTMLSpanElement> & {
		children: Snippet;
		variant?: Variant;
		/** brand / accent colour; overrides the variant's colours */
		color?: string;
		class?: string;
	} = $props();

	const variants: Record<Variant, string> = {
		outline: 'border border-border text-soft',
		soft: 'border border-transparent bg-surface-raised text-soft',
		solid: 'border border-transparent bg-accent text-accent-foreground'
	};

	const tinted =
		'border border-[color-mix(in_oklab,var(--badge)_55%,transparent)] bg-transparent text-[color-mix(in_oklab,var(--badge)_78%,var(--foreground))] transition-colors duration-300 hover:border-(--badge)';
</script>

<span
	{...rest}
	style:--badge={color}
	class="inline-flex items-center gap-1 rounded-full px-3 py-[5px] text-[13px] leading-none font-normal whitespace-nowrap [&_svg]:size-3 [&_svg]:shrink-0 {color
		? tinted
		: variants[variant]} {className}"
>
	{@render children()}
</span>
