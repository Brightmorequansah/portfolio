<script lang="ts">
	import { reveal } from '#lib/motion.js';
	import type { Service } from '#lib/data/services.js';

	let { service, fromLeft = false }: { service: Service; fromLeft?: boolean } = $props();

	// fixed scatter positions for the small floating icons
	const spots = [
		'top:20%;left:15%',
		'top:60%;right:20%',
		'bottom:30%;left:25%',
		'top:40%;right:15%'
	];
</script>

<div use:reveal={{ x: fromLeft ? -50 : 50, duration: 0.8 }} class="relative">
	<div
		class="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-linear-to-br from-surface to-surface-raised shadow-2xl"
	>
		<div class="absolute inset-0 flex items-center justify-center text-border">
			<service.icon class="size-32" strokeWidth={1} />
		</div>

		{#each service.visual.icons as Icon, i (i)}
			<div
				use:reveal={{ scale: 0, delay: 0.4 + i * 0.15, duration: 0.5 }}
				class="absolute text-subtle"
				style={spots[i % spots.length]}
			>
				<Icon class="size-6" />
			</div>
		{/each}

		<div class="absolute top-4 left-4">
			<div class="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
				{service.status}
			</div>
		</div>

		<div class="absolute right-6 bottom-6 left-6">
			<div class="rounded-lg border border-border/50 bg-background/90 p-4 backdrop-blur-sm">
				<div class="flex items-center justify-between">
					<div>
						<div class="text-sm text-muted">{service.visual.label}</div>
						<div class="text-xl font-light">{service.visual.value}</div>
					</div>
					<div class="text-xs text-subtle">{service.price.summary}</div>
				</div>
			</div>
		</div>
	</div>

	<div
		use:reveal={{ scale: 0.8, delay: 0.5 }}
		class="absolute -top-4 -right-4 rounded-full border border-border bg-background p-3 shadow-lg"
	>
		<div class="text-sm font-medium">{service.visual.badge}</div>
	</div>
</div>
