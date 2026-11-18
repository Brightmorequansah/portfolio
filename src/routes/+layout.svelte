<script lang="ts">
	import '../layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from '#lib/components/layout/Navbar.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// the projects showcase is a full-screen, viewport-locked page with its own controls
	const fullscreen = $derived(page.url.pathname.startsWith('/projects'));
</script>

<svelte:head>
	<!-- BQ tab icon: SVG (inverts in dark browser themes), PNG fallback, and the iOS home-screen icon -->
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	{#if !fullscreen}
		<Footer />
	{/if}
</div>
