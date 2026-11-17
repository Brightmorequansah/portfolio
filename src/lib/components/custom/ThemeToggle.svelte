<script lang="ts">
	import { onMount } from 'svelte';
	import { Sun, Moon } from '@lucide/svelte';

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('theme', dark ? 'dark' : 'light');
		} catch {
			// storage unavailable (private mode etc.) — theme still switches for this visit
		}
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	class="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface-raised"
>
	<Sun
		class="size-5 transition-all duration-300 {dark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}"
	/>
	<Moon
		class="absolute size-5 transition-all duration-300 {dark
			? 'scale-100 rotate-0'
			: 'scale-0 rotate-90'}"
	/>
</button>
