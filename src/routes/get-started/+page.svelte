<script lang="ts">
	import Intro from '#pages/Get Started/Intro.svelte';
	import RequirementsForm from '#pages/Get Started/RequirementsForm.svelte';
	import { profile } from '#lib/data/profile.js';
</script>

<svelte:head>
	<title>Get Started | {profile.name}</title>
</svelte:head>

<div class="pt-24 pb-16">
	<Intro />
	<RequirementsForm />
</div>
