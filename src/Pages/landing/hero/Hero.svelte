<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';
	import HeroBackground from './HeroBackground.svelte';
</script>

<section
	id="home"
	class="relative isolate flex min-h-[calc(100vh-4rem)] scroll-mt-16 items-center overflow-hidden"
>
	<HeroBackground />

	<!-- bottom padding lifts the centred content; the absolute scroll bar below is unaffected -->
	<Container class="relative z-10 pb-16 md:pb-24">
		<div class="mx-auto max-w-5xl text-center">
			<h1
				use:reveal={{ duration: 0.8, delay: 0.2 }}
				class="mb-6 text-3xl font-light tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl"
			>
				<!-- phones: name a size up (scaling with width), role a size down; desktop: role one size under the name so it stays on one line -->
				<span class="font-normal max-md:text-[clamp(2rem,9.6vw,2.375rem)]">{profile.name}</span>
				<br />
				<span class="relative inline-block max-md:text-2xl md:text-5xl lg:text-6xl">
					{profile.role}
					<span
						use:reveal={{ width: '100%', duration: 0.8, delay: 0.9 }}
						class="absolute -bottom-2 left-0 h-0.5 w-full bg-accent"
					></span>
				</span>
			</h1>

			<div use:reveal={{ duration: 0.8, delay: 0.4 }} class="flex flex-col items-center gap-8">
				<p class="mx-auto max-w-xl text-[15px] text-soft md:text-lg">{profile.tagline}</p>
				<div class="flex gap-4">
					<Button href="#projects">
						View Projects
						<ArrowRight class="transition-transform group-hover:translate-x-1" />
					</Button>
					<Button href="#contact" variant="outline">Contact Me</Button>
				</div>
			</div>
		</div>
	</Container>

	<div
		use:reveal={{ delay: 1.2, duration: 0.8, y: 0 }}
		class="absolute bottom-12 left-1/2 z-10 hidden -translate-x-1/2 md:block"
		aria-hidden="true"
	>
		<div class="relative h-12 w-0.5 overflow-hidden bg-border">
			<div class="absolute top-0 h-1/2 w-full animate-scroll-line bg-accent"></div>
		</div>
	</div>
</section>
