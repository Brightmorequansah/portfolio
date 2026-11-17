<script lang="ts">
	import { ArrowRight, Sparkles, Mail, MessageCircle, FolderUp } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import CornerBrackets from '#lib/components/custom/CornerBrackets.svelte';
	import { reveal } from '#lib/motion.js';
	import { intro } from '#lib/data/requirements.js';
	import { profile } from '#lib/data/profile.js';

	const direct = [
		{ icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
		{ icon: MessageCircle, label: 'WhatsApp chat', href: profile.whatsapp },
		{ icon: FolderUp, label: 'Share files', href: profile.fileShare }
	];
</script>

<Container class="mb-16 max-w-5xl">
	<div use:reveal={{ duration: 0.8 }} class="relative">
		<CornerBrackets size="lg" />

		<div class="relative z-10 p-6 md:p-10">
			<div class="mb-6 flex items-center gap-2">
				<Sparkles class="size-4" />
				<span class="text-sm font-medium tracking-wide uppercase">{intro.eyebrow}</span>
			</div>

			<h1 class="mb-6 text-5xl font-light tracking-tighter md:text-6xl lg:text-7xl">
				{intro.title}
				<span class="mt-2 block font-normal">{intro.titleEmphasis}</span>
			</h1>

			<p class="mb-8 max-w-3xl text-lg text-soft md:text-xl">{intro.text}</p>

			<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each intro.valueProps as prop, i (prop.title)}
					<div use:reveal={{ delay: 0.2 + i * 0.1 }} class="flex items-start gap-3">
						<div
							class="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
						>
							<prop.icon class="size-5" />
						</div>
						<div>
							<h3 class="mb-1 font-medium">{prop.title}</h3>
							<p class="text-sm text-muted">{prop.text}</p>
						</div>
					</div>
				{/each}
			</div>

			<div
				use:reveal={{ y: 0, delay: 0.5, duration: 0.8 }}
				class="rounded-xl border border-border bg-linear-to-br from-surface to-background p-8"
			>
				<h3 class="mb-4 text-lg font-medium">{intro.contactCard.title}</h3>
				<p class="mb-6 text-sm text-muted">{intro.contactCard.text}</p>

				<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div>
						<p class="mb-3 text-sm font-medium">{intro.contactCard.formLabel}</p>
						<Button href="#requirements">
							Start the form
							<ArrowRight class="transition-transform group-hover:translate-x-1" />
						</Button>
						<p class="mt-2 text-xs text-subtle">{intro.contactCard.formNote}</p>
					</div>
					<div class="space-y-3">
						<p class="text-sm font-medium">{intro.contactCard.directLabel}</p>
						<div class="space-y-2">
							{#each direct as link (link.label)}
								<a
									href={link.href}
									target={link.href.startsWith('http') ? '_blank' : undefined}
									rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
									class="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
								>
									<link.icon class="size-4 transition-transform group-hover:scale-110" />
									<span>{link.label}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>

				<div class="rounded-lg bg-foreground/5 p-4">
					<p class="text-xs text-muted">
						<strong class="font-medium text-foreground">Tip:</strong>
						{intro.contactCard.tip}
					</p>
				</div>
			</div>
		</div>
	</div>
</Container>
