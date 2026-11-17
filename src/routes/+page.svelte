<script lang="ts">
	import Hero from '#pages/landing/hero/Hero.svelte';
	import About from '#pages/landing/About.svelte';
	import SelectedProjects from '#pages/landing/SelectedProjects.svelte';
	import TechStack from '#pages/landing/TechStack.svelte';
	import Contact from '#pages/landing/Contact.svelte';
	import { profile } from '#lib/data/profile.js';
</script>

<svelte:head>
	<title>{profile.name} — Portfolio</title>
	<meta name="description" content={profile.tagline} />
</svelte:head>

<div class="pt-16">
	<Hero />
	<About />
	<SelectedProjects />
	<TechStack />
	<Contact />
</div>
