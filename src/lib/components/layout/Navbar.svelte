<!--
	Full-width bar at the top of the page; once the page scrolls it shrinks into a floating pill.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { ChevronDown, Menu, X } from '@lucide/svelte';
	import ThemeToggle from '#lib/components/custom/ThemeToggle.svelte';
	import Logo from './Logo.svelte';
	import { navLinks } from '#lib/data/profile.js';

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

	// close the mobile menu whenever the route changes
	$effect(() => {
		void page.url.pathname;
		mobileOpen = false;
	});

	onMount(() => {
		const update = () => (scrolled = window.scrollY > 24);
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	// shape of the bar: flat full-width at the top, rounded floating pill once scrolled
	const shell = $derived(
		scrolled
			? `max-w-[60rem] border-border bg-background/70 shadow-lg shadow-foreground/5 backdrop-blur-md ${mobileOpen ? 'rounded-3xl' : 'rounded-[2rem]'}`
			: 'max-w-full rounded-none border-x-transparent border-t-transparent border-b-border/60 bg-background/80 backdrop-blur-sm'
	);
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out {scrolled
		? 'px-4 pt-3'
		: 'px-0 pt-0'}"
>
	<div class="mx-auto border transition-all duration-500 ease-out {shell}">
		<div
			class="mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-500 ease-out {scrolled
				? 'h-15 px-4 md:px-5'
				: 'h-16 px-4 md:px-6'}"
		>
			<Logo />

			<div class="flex items-center gap-3 md:gap-4">
				<nav
					class="hidden items-center transition-all duration-500 md:flex {scrolled
						? 'gap-6'
						: 'gap-8'}"
					aria-label="Main"
				>
					{#each navLinks as link (link.href)}
						<div class="group relative">
							<a
								href={link.href}
								class="flex items-center gap-1 text-sm transition-colors hover:text-subtle {isActive(
									link.href
								)
									? 'font-medium'
									: 'font-light'}"
								aria-current={isActive(link.href) ? 'page' : undefined}
							>
								{link.label}
								{#if link.children}
									<ChevronDown
										class="size-3.5 transition-transform duration-300 group-hover:rotate-180"
									/>
								{/if}
							</a>

							{#if link.children}
								<div
									class="invisible absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
								>
									<div class="w-44 rounded-lg border border-border bg-background p-2 shadow-lg">
										{#each link.children as child (child.href)}
											<a
												href={child.href}
												class="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface-raised"
											>
												{child.label}
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</nav>

				<ThemeToggle />

				<button
					type="button"
					class="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface-raised md:hidden"
					aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileOpen}
					aria-controls="mobile-menu"
					onclick={() => (mobileOpen = !mobileOpen)}
				>
					{#if mobileOpen}<X class="size-5" />{:else}<Menu class="size-5" />{/if}
				</button>
			</div>
		</div>

		{#if mobileOpen}
			<nav
				id="mobile-menu"
				transition:slide={{ duration: 300 }}
				class="border-t border-border md:hidden"
				aria-label="Mobile"
			>
				<div class="flex flex-col px-4 py-4">
					{#each navLinks as link (link.href)}
						<a
							href={link.href}
							class="py-3 text-lg transition-colors hover:text-subtle {isActive(link.href)
								? 'font-medium'
								: 'font-light'}"
							onclick={() => (mobileOpen = false)}
						>
							{link.label}
						</a>
						{#if link.children}
							<div class="mb-2 flex flex-col border-l border-border pl-4">
								{#each link.children as child (child.href)}
									<a
										href={child.href}
										class="py-2 text-sm text-muted transition-colors hover:text-foreground"
										onclick={() => (mobileOpen = false)}
									>
										{child.label}
									</a>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</nav>
		{/if}
	</div>
</header>
