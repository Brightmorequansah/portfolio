<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/motion.js';

	let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<h2
	use:reveal
	class="mb-12 text-center text-3xl font-light tracking-tighter md:text-4xl {className}"
>
	{@render children()}
</h2>
