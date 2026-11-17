<!-- ✏️ Replace with your own logo (e.g. an <img> from /static) whenever you have one. -->
<script lang="ts">
	import { profile } from '#lib/data/profile.js';

	let { class: className = '' }: { class?: string } = $props();
</script>

<a
	href="/"
	class="inline-flex items-center transition-opacity hover:opacity-80 {className}"
	aria-label="{profile.name} — home"
>
	<span
		class="flex size-10 items-center justify-center rounded-full border border-current text-sm font-normal tracking-tight"
	>
		{profile.initials}
	</span>
</a>
