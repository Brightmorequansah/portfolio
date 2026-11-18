<!--
	Light/dark switch: a two-segment pill ("Light" | "Dark"); a knob slides under the active mode.
-->
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
			localStorage.setItem('color-theme', dark ? 'dark' : 'light');
		} catch {
			// storage unavailable (private mode etc.) — theme still switches for this visit
		}
	}

	const segment = (active: boolean) =>
		`relative z-10 flex items-center justify-center gap-1.5 px-3 transition-colors duration-300 ${
			active ? 'text-accent-foreground' : 'text-soft group-hover:text-foreground'
		}`;
</script>

<button
	type="button"
	role="switch"
	aria-checked={dark}
	aria-label="Dark mode"
	onclick={toggle}
	class="group relative inline-grid h-9 shrink-0 grid-cols-2 items-stretch rounded-full border border-border bg-surface-raised p-0.5 text-xs font-medium transition-colors duration-300 hover:border-subtle"
>
	<!-- sliding knob: exactly one segment wide -->
	<span
		aria-hidden="true"
		class="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-accent shadow-sm transition-transform duration-300 ease-out {dark
			? 'translate-x-full'
			: 'translate-x-0'}"
	></span>

	<span class={segment(!dark)} aria-hidden="true">
		<Sun class="size-3.5" />
		Light
	</span>
	<span class={segment(dark)} aria-hidden="true">
		<Moon class="size-3.5" />
		Dark
	</span>
</button>
