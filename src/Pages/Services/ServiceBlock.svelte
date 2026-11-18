<!--
	One service, text only, split across two columns on desktop:
	left = number, title, tagline, description, tools · right = what you get + a real project as proof.
-->
<script lang="ts">
	import { ArrowRight, ArrowUpRight, CircleCheckBig, MessageCircle } from '@lucide/svelte';
	import Badge from '#lib/components/custom/Badge.svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import { reveal } from '#lib/motion.js';
	import { projects } from '#lib/data/projects.js';
	import { techColor } from '#lib/data/tech.js';
	import type { Service } from '#lib/data/services.js';

	let { service, index }: { service: Service; index: number } = $props();

	// the real project that shows this service in action
	const project = $derived(projects.find((p) => p.slug === service.project));
</script>

<article
	use:reveal={{ y: 40, duration: 0.8 }}
	class="grid gap-10 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16"
>
	<!-- story -->
	<div use:reveal={{ x: -40, duration: 0.8 }} class="space-y-6 lg:col-span-5">
		<div class="flex items-center gap-3">
			<div class="text-sm text-subtle tabular-nums">
				Service {String(index + 1).padStart(2, '0')}
			</div>
			<div class="flex items-center gap-1 rounded-full bg-surface-raised px-2 py-1 text-xs">
				<CircleCheckBig class="size-3" />
				<span>{service.status}</span>
			</div>
		</div>
		<div>
			<h2 class="mb-2 text-2xl font-light tracking-tight md:text-4xl">{service.title}</h2>
			<p class="text-lg text-muted md:text-xl">{service.tagline}</p>
		</div>
		<p class="text-base leading-relaxed text-soft md:text-lg">{service.description}</p>

		<div class="space-y-3 pt-2">
			<h3 class="text-sm font-medium tracking-wider text-subtle uppercase">Tools I Use</h3>
			<div class="flex flex-wrap gap-2">
				{#each service.tools as tool, i (tool)}
					<span use:reveal={{ delay: i * 0.05 }}>
						<Badge color={techColor(tool)}>{tool}</Badge>
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- details -->
	<div use:reveal={{ x: 40, duration: 0.8 }} class="space-y-8 lg:col-span-7">
		<div class="space-y-4">
			<h3 class="text-base font-medium md:text-lg">What You Get</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each service.features as feature, i (feature.title)}
					<div
						use:reveal={{ delay: i * 0.1 }}
						class="flex items-start gap-3 rounded-lg bg-surface p-4 transition-colors hover:bg-surface-raised"
					>
						<feature.icon class="mt-1 size-4 shrink-0 text-muted" />
						<div class="min-w-0">
							<h4 class="mb-1 text-sm font-medium">{feature.title}</h4>
							<p class="text-xs text-muted">{feature.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- proof: a real project instead of a price list -->
		<div class="rounded-xl bg-surface p-6">
			{#if project}
				<a
					href="/projects?project={project.slug}"
					class="group/proof mb-6 flex items-center gap-4 rounded-lg border border-border bg-background p-3 transition-colors hover:border-foreground/40"
				>
					<img
						src={project.image}
						alt=""
						loading="lazy"
						class="aspect-16/10 w-24 shrink-0 rounded-md object-cover object-top"
					/>
					<div class="min-w-0 flex-1">
						<div class="text-xs tracking-wider text-subtle uppercase">See it in action</div>
						<div class="truncate font-medium">{project.title}</div>
						<div class="truncate text-sm text-muted">{project.subtitle}</div>
					</div>
					<ArrowUpRight
						class="size-4 shrink-0 text-muted transition-transform group-hover/proof:translate-x-0.5 group-hover/proof:-translate-y-0.5"
					/>
				</a>
			{/if}
			<div class="flex flex-wrap gap-3">
				<Button href="/get-started">
					Start a Project
					<ArrowRight class="transition-transform group-hover:translate-x-1" />
				</Button>
				<Button href="/#contact" variant="outline">
					<MessageCircle />
					Ask a Question
				</Button>
			</div>
		</div>
	</div>
</article>
