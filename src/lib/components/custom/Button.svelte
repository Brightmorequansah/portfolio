<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'outline' | 'ghost';
	type Size = 'sm' | 'md' | 'lg' | 'icon';

	type Props = {
		variant?: Variant;
		size?: Size;
		href?: string;
		external?: boolean;
		class?: string;
		children: Snippet;
	} & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children'>;

	let {
		variant = 'primary',
		size = 'md',
		href,
		external = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'bg-accent text-accent-foreground shadow hover:opacity-85',
		outline: 'border border-border bg-background shadow-sm hover:bg-surface-raised',
		ghost: 'hover:bg-surface-raised'
	};

	const sizes: Record<Size, string> = {
		sm: 'h-8 px-3 text-xs',
		md: 'h-9 px-4 text-sm',
		lg: 'h-11 px-8 text-base',
		icon: 'size-10'
	};

	const classes = $derived(
		`group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 ${variants[variant]} ${sizes[size]} ${className}`
	);
</script>

{#if href}
	<a
		{href}
		class={classes}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button type="button" class={classes} {...rest}>
		{@render children()}
	</button>
{/if}
