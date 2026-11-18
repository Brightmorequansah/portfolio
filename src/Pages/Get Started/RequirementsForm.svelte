<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { ChevronDown, ArrowRight, CircleCheckBig } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import FormField from './FormField.svelte';
	import { reveal } from '#lib/motion.js';
	import { formSections, submitPanel } from '#lib/data/requirements.js';

	let openId = $state<string | null>(formSections[0].id);
	let submitted = $state(false);
	let form = $state<HTMLFormElement>();

	const toggle = (id: string) => (openId = openId === id ? null : id);

	/** Collapsed sections stay in the DOM (inert) so every answer is kept and validated. */
	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		const invalid = form?.querySelector<HTMLElement>(':invalid:not(fieldset)');
		if (invalid) {
			const section = invalid.closest<HTMLElement>('[data-section]')?.dataset.section;
			if (section) openId = section;
			await tick();
			setTimeout(() => {
				invalid.focus();
				(invalid as HTMLInputElement).reportValidity?.();
			}, 350);
			return;
		}
		// ✏️ Send `new FormData(form)` to your API / form service here.
		submitted = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<Container class="max-w-5xl">
	{#if submitted}
		<div in:fade class="rounded-2xl border border-accent p-12 text-center">
			<CircleCheckBig class="mx-auto mb-6 size-12" />
			<h2 class="mb-2 text-2xl font-light tracking-tight md:text-3xl">
				{submitPanel.successTitle}
			</h2>
			<p class="text-muted">{submitPanel.successText}</p>
		</div>
	{:else}
		<form id="requirements" bind:this={form} class="scroll-mt-24 space-y-8" novalidate {onsubmit}>
			{#each formSections as section, i (section.id)}
				{@const open = openId === section.id}
				<div
					use:reveal={{ delay: i * 0.05 }}
					data-section={section.id}
					class="group relative overflow-hidden rounded-2xl border bg-background transition-colors duration-300 {open
						? 'border-accent'
						: 'border-border hover:border-subtle'}"
				>
					<button
						type="button"
						class="flex w-full items-center justify-between bg-linear-to-r from-surface to-background px-6 py-6 text-left transition-all duration-300 hover:from-surface-raised md:px-8"
						aria-expanded={open}
						aria-controls="panel-{section.id}"
						onclick={() => toggle(section.id)}
					>
						<div class="flex items-center gap-4">
							<div
								class="flex size-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 {open
									? 'bg-accent text-accent-foreground'
									: 'bg-surface-raised group-hover:bg-accent group-hover:text-accent-foreground'}"
							>
								<section.icon class="size-5" />
							</div>
							<div>
								<h3 class="text-lg font-light md:text-xl">{section.title}</h3>
								<p class="mt-0.5 text-sm text-muted">{section.subtitle}</p>
							</div>
						</div>
						<div
							class="flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 {open
								? 'rotate-180 bg-accent text-accent-foreground'
								: 'bg-surface-raised group-hover:bg-accent group-hover:text-accent-foreground'}"
						>
							<ChevronDown class="size-4" />
						</div>
					</button>

					<!-- grid-rows 0fr → 1fr animates height while keeping inputs mounted (answers persist) -->
					<div
						id="panel-{section.id}"
						inert={!open}
						class="grid transition-all duration-500 ease-out {open
							? 'grid-rows-[1fr] opacity-100'
							: 'grid-rows-[0fr] opacity-0'}"
					>
						<div class="overflow-hidden">
							<div class="space-y-6 p-6 md:p-8">
								{#each section.fields as field (field.name)}
									<FormField {field} sectionId={section.id} />
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}

			<div use:reveal class="pt-8">
				<div class="relative overflow-hidden rounded-2xl bg-linear-to-br from-accent to-subtle p-1">
					<div class="rounded-2xl bg-background p-8">
						<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
							<div>
								<h3 class="mb-2 text-xl font-light md:text-2xl">{submitPanel.title}</h3>
								<p class="text-muted">{submitPanel.text}</p>
							</div>
							<Button type="submit" size="lg">
								{submitPanel.button}
								<ArrowRight class="transition-transform group-hover:translate-x-1" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	{/if}
</Container>
