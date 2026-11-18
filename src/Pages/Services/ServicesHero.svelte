<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import { reveal } from '#lib/motion.js';
	import { servicesHero } from '#lib/data/services.js';
</script>

<section class="pt-8 pb-12 md:py-32">
	<Container class="max-w-7xl md:px-8 lg:px-12">
		<div class="mx-auto max-w-4xl text-center">
			<div use:reveal={{ duration: 0.8 }} class="mb-8">
				<h1 class="mb-6 text-3xl font-light tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
					<span class="font-normal">{servicesHero.lead}</span>
					<br />
					<span class="relative inline-block">
						{servicesHero.title}
						<span
							use:reveal={{ width: '100%', duration: 0.8, delay: 0.8 }}
							class="absolute -bottom-2 left-0 h-0.5 w-full bg-accent"
						></span>
					</span>
				</h1>
				<p class="mx-auto max-w-2xl text-[15px] text-soft md:text-lg">{servicesHero.text}</p>
			</div>
			<div
				use:reveal={{ duration: 0.8, delay: 0.3 }}
				class="flex flex-col justify-center gap-4 sm:flex-row"
			>
				<Button href="#services" size="lg">
					Explore Services
					<ArrowRight class="transition-transform group-hover:translate-x-1" />
				</Button>
				<Button href="/get-started" variant="outline" size="lg">Start a Project</Button>
			</div>
		</div>
	</Container>
</section>
