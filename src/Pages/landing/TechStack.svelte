<script lang="ts">
	import Container from '#lib/components/custom/Container.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import Marquee from '#lib/components/custom/Marquee.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';
	import { stack } from '#lib/data/stack.js';

	// split the stack across two rows that glide in opposite directions
	const half = Math.ceil(stack.length / 2);
	const rowOne = stack.slice(0, half);
	const rowTwo = stack.slice(half);
</script>

<!-- light mode: a proper grey band (surface-raised); in dark mode surface-raised = surface -->
<section id="stack" class="scroll-mt-16 overflow-hidden bg-surface-raised py-20 md:py-32">
	<Container>
		<SectionHeading>Tech Stack</SectionHeading>
		<p
			use:reveal
			class="mx-auto mb-10 max-w-2xl text-center text-base text-soft md:mb-12 md:text-lg"
		>
			{profile.stackIntro}
		</p>
	</Container>

	<div use:reveal={{ y: 30, duration: 0.8, delay: 0.1 }} class="space-y-4">
		<Marquee items={rowOne} duration={38} label="Tech stack, part one" />
		<Marquee items={rowTwo} duration={44} reverse label="Tech stack, part two" />
	</div>
</section>
