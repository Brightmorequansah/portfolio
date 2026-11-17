<script lang="ts">
	import { ArrowRight, CircleCheckBig, MessageCircle } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import ServiceVisual from './ServiceVisual.svelte';
	import { reveal } from '#lib/motion.js';
	import type { Service } from '#lib/data/services.js';

	let { service, index }: { service: Service; index: number } = $props();

	// every other service flips: visual on the left, text on the right
	const flipped = $derived(index % 2 === 1);
</script>

<article use:reveal={{ y: 40, duration: 0.8 }} class="group">
	<div class="grid items-center gap-8 lg:grid-flow-col-dense lg:grid-cols-12 lg:gap-12">
		<div class="space-y-8 lg:col-span-7 {flipped ? 'lg:col-start-6' : ''}">
			<div use:reveal={{ x: flipped ? 50 : -50, duration: 0.8 }}>
				<div class="mb-8 space-y-4">
					<div class="flex items-center gap-4">
						<div class="shrink-0 rounded-2xl bg-accent p-4 text-accent-foreground">
							<service.icon class="size-6" />
						</div>
						<div class="flex items-center gap-3">
							<div class="text-sm text-subtle">Service {String(index + 1).padStart(2, '0')}</div>
							<div class="flex items-center gap-1 rounded-full bg-surface-raised px-2 py-1 text-xs">
								<CircleCheckBig class="size-3" />
								<span>{service.status}</span>
							</div>
						</div>
					</div>
					<div>
						<h2 class="mb-2 text-3xl font-light tracking-tight md:text-4xl">{service.title}</h2>
						<p class="text-xl text-muted">{service.tagline}</p>
					</div>
					<p class="text-lg leading-relaxed text-soft">{service.description}</p>
				</div>

				<div class="mb-8 space-y-6">
					<h3 class="text-lg font-medium">Key Features</h3>
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

				<div class="mb-8 space-y-4">
					<h3 class="text-lg font-medium">Performance Metrics</h3>
					<div class="grid grid-cols-3 gap-6">
						{#each service.metrics as metric, i (metric.label)}
							<div use:reveal={{ delay: i * 0.1 }} class="text-center">
								<div class="text-xl font-light md:text-2xl">{metric.value}</div>
								<div class="mt-1 text-xs text-subtle">{metric.label}</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="rounded-xl bg-surface p-6">
					<div class="mb-6">
						<div class="text-2xl font-light">
							{service.price.from}
							<span class="text-sm text-subtle">/ {service.price.unit}</span>
						</div>
						<div class="mt-1 text-sm text-muted">{service.price.summary}</div>
					</div>
					<div class="mb-6">
						<h4 class="mb-3 text-sm font-medium">Available Plans</h4>
						<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
							{#each service.plans as plan (plan.name)}
								<div class="rounded-lg border border-border bg-background p-3">
									<div class="text-sm font-medium">{plan.name}</div>
									<div class="text-lg font-light">{plan.price}</div>
									<div class="mt-1 text-xs text-muted">{plan.specs}</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="flex flex-wrap gap-3">
						<Button href="/get-started">
							Get Started
							<ArrowRight class="transition-transform group-hover:translate-x-1" />
						</Button>
						<Button href="/#contact" variant="outline">
							<MessageCircle />
							Ask a Question
						</Button>
					</div>
				</div>
			</div>
		</div>

		<div class="lg:col-span-5 {flipped ? 'lg:col-start-1 lg:row-start-1' : ''}">
			<ServiceVisual {service} fromLeft={flipped} />
		</div>
	</div>
</article>
