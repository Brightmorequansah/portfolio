<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<div class="mx-auto w-full max-w-[1400px] px-4 md:px-6 {className}">
	{@render children()}
</div>
