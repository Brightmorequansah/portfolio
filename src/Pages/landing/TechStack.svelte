<script lang="ts">
	import Container from '#lib/components/custom/Container.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import IconCloud from '#lib/components/custom/IconCloud.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';
	import { stack } from '#lib/data/stack.js';
</script>

<section id="stack" class="scroll-mt-16 bg-surface py-20 md:py-32">
	<Container>
		<SectionHeading>Tech Stack</SectionHeading>
		<div class="mx-auto max-w-4xl">
			<p use:reveal class="mb-12 text-center text-lg text-soft">{profile.stackIntro}</p>
			<div use:reveal={{ scale: 0.9, duration: 0.8 }}>
				<IconCloud icons={stack} />
			</div>
		</div>
	</Container>
</section>
