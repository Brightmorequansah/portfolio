<script lang="ts">
	import { siGithub } from 'simple-icons';

	let { name, class: className = 'size-4' }: { name: 'github' | 'linkedin'; class?: string } =
		$props();
</script>

<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class={className}>
	{#if name === 'github'}
		<path d={siGithub.path} />
	{:else}
		<!-- simple "in" mark -->
		<rect
			x="2"
			y="2"
			width="20"
			height="20"
			rx="3"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		/>
		<rect x="6.5" y="10" width="2.5" height="7.5" />
		<circle cx="7.75" cy="7" r="1.5" />
		<path
			d="M11 10h2.4v1.1c.5-.8 1.4-1.3 2.6-1.3 2 0 3 1.3 3 3.6v4.1h-2.5v-3.7c0-1.1-.4-1.8-1.3-1.8-1 0-1.6.7-1.6 1.9v3.6H11z"
		/>
	{/if}
</svg>
