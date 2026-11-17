<script lang="ts">
	import ServicesHero from '#pages/Services/ServicesHero.svelte';
	import ServiceList from '#pages/Services/ServiceList.svelte';
	import CustomCta from '#pages/Services/CustomCta.svelte';
	import { profile } from '#lib/data/profile.js';
</script>

<svelte:head>
	<title>Services | {profile.name}</title>
</svelte:head>

<div class="pt-16">
	<ServicesHero />
	<ServiceList />
	<CustomCta />
</div>
