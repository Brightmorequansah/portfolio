<script lang="ts">
	import { ArrowUpRight, Calendar, Clock, Users } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import SocialIcon from '#lib/components/custom/SocialIcon.svelte';
	import { enter } from '#lib/motion.js';
	import type { Project } from '#lib/data/projects.js';

	let { project }: { project: Project } = $props();

	const eyebrow = 'text-xs font-medium tracking-wider text-subtle uppercase md:text-sm';
</script>

<div class="grid gap-6 lg:h-full lg:grid-cols-2 lg:items-center lg:gap-16">
	<!-- Image -->
	<div in:enter={{ x: 50, duration: 700, delay: 100 }} class="relative order-1 lg:order-2">
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative block aspect-video overflow-hidden"
			aria-label="Open {project.title}"
		>
			<img
				src={project.image}
				alt="{project.title} preview"
				class="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
			/>
		</a>
		<div
			in:enter={{ scale: 0.8, delay: 400 }}
			class="absolute -top-2 -right-2 rounded-full bg-background p-2 shadow-lg md:-top-4 md:-right-4 md:p-4"
		>
			<div class="text-sm font-light md:text-2xl">{project.year}</div>
		</div>
		<div
			in:enter={{ scale: 0.8, delay: 500 }}
			class="absolute -bottom-2 -left-2 rounded-lg bg-background p-2 shadow-lg md:-bottom-4 md:-left-4 md:p-3"
		>
			<div class="text-xs font-medium md:text-sm">{project.role}</div>
		</div>
	</div>

	<!-- Details -->
	<div
		in:enter={{ x: -50, duration: 700, delay: 100 }}
		class="order-2 space-y-3 md:space-y-6 lg:order-1 lg:space-y-8"
	>
		<div class="space-y-2 md:space-y-4">
			<div class="flex flex-wrap items-center gap-2 text-xs text-subtle md:gap-4 md:text-sm">
				<span class="flex items-center gap-1.5"><Calendar class="size-3.5" />{project.year}</span>
				<span class="flex items-center gap-1.5"><Clock class="size-3.5" />{project.duration}</span>
				<span class="flex items-center gap-1.5"><Users class="size-3.5" />{project.team}</span>
			</div>
			<div>
				<h1 class="mb-1 text-xl font-light tracking-tight md:mb-2 md:text-4xl lg:text-5xl">
					{project.title}
				</h1>
				<p class="text-base text-muted md:text-xl">{project.subtitle}</p>
			</div>
			<p class="line-clamp-3 text-sm leading-relaxed text-soft md:text-lg lg:line-clamp-none">
				{project.description}
			</p>
		</div>

		<div class="space-y-2">
			<h3 class={eyebrow}>Technologies</h3>
			<div class="flex flex-wrap gap-1.5 md:gap-3">
				{#each project.tech as tech, i (tech)}
					<span
						in:enter={{ scale: 0.8, delay: 300 + i * 60, duration: 400 }}
						class="rounded-full border border-foreground/30 px-2 py-1 text-xs md:px-3 md:text-sm"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<div class="space-y-2 md:space-y-4">
			<h3 class={eyebrow}>Key Features</h3>
			<div class="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-2">
				{#each project.features as feature, i (feature.title)}
					<div
						in:enter={{ y: 20, delay: 400 + i * 80 }}
						class="flex items-start gap-2 rounded-lg bg-surface p-2 md:gap-3 md:p-3"
					>
						<feature.icon class="mt-0.5 size-4 shrink-0 text-muted" />
						<div class="min-w-0">
							<h4 class="truncate text-xs font-medium md:text-sm">{feature.title}</h4>
							<p class="mt-1 line-clamp-2 text-xs text-muted lg:line-clamp-none">{feature.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-2 md:space-y-4">
			<h3 class={eyebrow}>Impact</h3>
			<div class="grid grid-cols-3 gap-2 md:gap-6">
				{#each project.impact as metric, i (metric.label)}
					<div in:enter={{ y: 20, delay: 600 + i * 80 }} class="text-center">
						<div class="text-base font-light md:text-2xl">{metric.value}</div>
						<div class="mt-1 text-xs text-subtle">{metric.label}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-2 pt-2 sm:flex-row md:gap-4 md:pt-4">
			<Button href={project.url} external size="lg">
				View Live Site
				<ArrowUpRight
					class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
				/>
			</Button>
			{#if project.source}
				<Button href={project.source} external variant="outline" size="lg">
					<SocialIcon name="github" />
					Source
				</Button>
			{/if}
		</div>
	</div>
</div>
