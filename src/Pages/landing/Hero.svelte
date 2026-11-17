<script lang="ts">
	import { ArrowRight, Code } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';
</script>

<section id="home" class="relative flex min-h-[calc(100vh-4rem)] scroll-mt-16 items-center">
	<Container>
		<div class="mx-auto max-w-3xl text-center">
			<div use:reveal={{ scale: 0.8, duration: 0.8 }} class="mb-8 inline-block">
				<div
					class="group relative mx-auto flex size-24 items-center justify-center overflow-hidden rounded-full border border-border"
				>
					<span
						class="relative z-10 text-3xl font-light transition-transform duration-300 group-hover:scale-0"
					>
						{profile.initials}
					</span>
					<div class="absolute inset-0 bg-linear-to-br from-foreground/10 to-transparent"></div>
					<div
						class="absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
					>
						<Code class="size-8" />
					</div>
				</div>
			</div>

			<h1
				use:reveal={{ duration: 0.8, delay: 0.2 }}
				class="mb-6 text-4xl font-light tracking-tighter md:text-6xl lg:text-7xl"
			>
				<span class="font-normal">{profile.name}</span>
				<br />
				<span class="relative inline-block">
					{profile.role}
					<span
						use:reveal={{ width: '100%', duration: 0.8, delay: 0.9 }}
						class="absolute -bottom-2 left-0 h-0.5 w-full bg-accent"
					></span>
				</span>
			</h1>

			<div use:reveal={{ duration: 0.8, delay: 0.4 }} class="flex flex-col items-center gap-8">
				<p class="mx-auto max-w-xl text-soft md:text-lg">{profile.tagline}</p>
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
		class="absolute bottom-12 left-1/2 hidden -translate-x-1/2 md:block"
		aria-hidden="true"
	>
		<div class="flex flex-col items-center">
			<span class="mb-2 text-sm text-subtle">Scroll</span>
			<div class="relative h-12 w-0.5 overflow-hidden bg-border">
				<div class="absolute top-0 h-1/2 w-full animate-scroll-line bg-accent"></div>
			</div>
		</div>
	</div>
</section>
