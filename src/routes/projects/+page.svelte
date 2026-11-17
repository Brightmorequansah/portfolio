<script lang="ts">
	import ProjectShowcase from '#pages/Projects/ProjectShowcase.svelte';
	import { profile } from '#lib/data/profile.js';
</script>

<svelte:head>
	<title>Projects | {profile.name}</title>
</svelte:head>

<ProjectShowcase />
