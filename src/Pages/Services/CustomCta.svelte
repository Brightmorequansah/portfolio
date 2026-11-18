<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import { reveal } from '#lib/motion.js';
	import { customCta } from '#lib/data/services.js';
</script>

<section class="bg-surface py-20 md:py-32">
	<Container class="max-w-7xl md:px-8 lg:px-12">
		<div use:reveal class="mx-auto max-w-4xl text-center">
			<h2 class="mb-5 text-2xl font-light tracking-tighter md:mb-6 md:text-4xl">
				{customCta.title}
			</h2>
			<p class="mx-auto mb-8 max-w-2xl text-base text-soft md:text-lg">{customCta.text}</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/get-started" size="lg">
					Start a Project
					<ArrowRight class="transition-transform group-hover:translate-x-1" />
				</Button>
				<Button href="/projects" variant="outline" size="lg">View My Work</Button>
			</div>
		</div>
	</Container>
</section>
