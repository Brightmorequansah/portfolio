<!--
	Decorative top-left + bottom-right corner brackets. Place inside a `relative` parent.
	size: sm (thin, 64px) · md (2px, 80px) · lg (4px, 128px)
-->
<script lang="ts">
	import { reveal } from '#lib/motion.js';

	let { size = 'md' }: { size?: 'sm' | 'md' | 'lg' } = $props();

	const styles = {
		sm: {
			box: 'size-16',
			tl: 'border-t border-l -mt-2 -ml-2',
			br: 'border-b border-r -mb-2 -mr-2'
		},
		md: {
			box: 'size-20',
			// phones: sit inside the container gutter instead of touching the screen edge
			tl: 'border-t-2 border-l-2 -mt-4 md:-ml-4',
			br: 'border-b-2 border-r-2 -mb-4 md:-mr-4'
		},
		lg: {
			box: 'size-32',
			tl: 'border-t-4 border-l-4 -mt-4 md:-ml-4',
			br: 'border-b-4 border-r-4 -mb-4 md:-mr-4'
		}
	};
	const s = $derived(styles[size]);
</script>

<div
	aria-hidden="true"
	use:reveal={{ scale: 0.8, delay: 0.2 }}
	class="pointer-events-none absolute top-0 left-0 border-accent {s.box} {s.tl}"
></div>
<div
	aria-hidden="true"
	use:reveal={{ scale: 0.8, delay: 0.4 }}
	class="pointer-events-none absolute right-0 bottom-0 border-accent {s.box} {s.br}"
></div>
