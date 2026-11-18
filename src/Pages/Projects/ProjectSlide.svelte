<!--
	One project on /projects, laid out like a quiet spec sheet:
	left = number, title, story, impact and facts · right = screenshot gallery · bottom = numbered features.
	Everything rises into place on mount with staggered `animate-fade-up` delays.
-->
<script lang="ts">
	import { ArrowUpRight, Lock, Globe } from '@lucide/svelte';
	import Badge from '#lib/components/custom/Badge.svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Laptop from '#lib/components/custom/Laptop.svelte';
	import SocialIcon from '#lib/components/custom/SocialIcon.svelte';
	import type { Project } from '#lib/data/projects.js';
	import { techColor } from '#lib/data/tech.js';

	let {
		project,
		index = 0,
		total = 1
	}: { project: Project; index?: number; total?: number } = $props();

	// real screenshots get a frame; the placeholder SVGs draw their own
	const framed = $derived(!!project.gallery?.length);
	const shots = $derived(
		project.gallery?.length ? project.gallery : [{ src: project.image, caption: '' }]
	);

	/** seconds each screen stays up before the gallery moves on */
	const SCREEN_SECONDS = 5;

	let active = $state(0);
	let hovering = $state(false); // pauses the autoplay (and its progress bar)

	const show = (i: number) => (active = i);
	// the active thumbnail's progress bar finishing is what advances the gallery
	const advance = () => (active = (active + 1) % shots.length);

	const pad = (n: number) => String(n).padStart(2, '0');
	const rise = (ms: number) => `animation-delay: ${ms}ms`;

	const facts = $derived([
		{ label: 'Role', value: project.role },
		{ label: 'Timeline', value: `${project.year} · ${project.duration}` },
		{ label: 'Team', value: project.team }
	]);

	const eyebrow = 'text-[11px] font-medium tracking-[0.18em] text-muted uppercase';
</script>

<div class="grid gap-8 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-16 xl:gap-x-20 short:lg:gap-y-5">
	<!-- ───────── Gallery ───────── -->
	<div
		class="order-1 min-w-0 lg:order-2 lg:col-span-7 lg:self-center"
		role="group"
		aria-label="{project.title} screenshots"
		onmouseenter={() => (hovering = true)}
		onmouseleave={() => (hovering = false)}
	>
		<div class="mx-auto w-full lg:w-[88%]">
			<div class="animate-fade-up" style={rise(200)}>
				<!-- links to the live site; private apps just show the screens -->
				<svelte:element
					this={project.url ? 'a' : 'div'}
					href={project.url}
					target={project.url ? '_blank' : undefined}
					rel={project.url ? 'noopener noreferrer' : undefined}
					class="group relative block"
					aria-label={project.url ? `Open ${project.title}` : undefined}
				>
					{#if framed}
						<!-- real screenshots sit on a laptop screen -->
						<Laptop>
							{@render screens('object-cover object-top')}
						</Laptop>
					{:else}
						<div class="relative aspect-video overflow-hidden">
							{@render screens('object-contain')}
						</div>
					{/if}
				</svelte:element>
			</div>

			<!-- every screen is stacked; the active one fades in.
			     'contain' shots keep their own shape, centred on their matte colour, and can
			     clip stray capture edges with `trim` (a clip-path inset) -->
			{#snippet screens(fit: string)}
				{#each shots as shot, i (shot.src)}
					<div
						aria-hidden={i !== active}
						style:background-color={shot.matte}
						class="absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out {i ===
						active
							? 'opacity-100'
							: 'opacity-0'}"
					>
						<img
							src={shot.src}
							alt={shot.caption || `${project.title} preview`}
							loading={i === 0 ? 'eager' : 'lazy'}
							decoding="async"
							style:clip-path={shot.trim ? `inset(${shot.trim})` : undefined}
							class="transition-[scale] duration-700 ease-out group-hover:scale-[1.02] {shot.fit ===
							'contain'
								? 'absolute inset-x-0 top-1/2 h-auto w-full -translate-y-1/2'
								: `absolute inset-0 size-full ${fit}`}"
						/>
					</div>
				{/each}
			{/snippet}

			{#if shots.length > 1}
				<div class="mt-6 animate-fade-up" style={rise(380)}>
					<div class="flex items-baseline justify-between gap-4 text-xs md:text-sm">
						<p class="truncate text-soft" aria-live="polite">{shots[active].caption}</p>
						<span class="shrink-0 text-muted tabular-nums">
							{pad(active + 1)} <span class="text-border">/</span>
							{pad(shots.length)}
						</span>
					</div>

					<!-- thumbnails: greyscale until active; a story-style bar under each tracks the autoplay -->
					<div class="mt-4 flex gap-2 md:gap-2.5">
						{#each shots as shot, i (shot.src)}
							<button
								type="button"
								onclick={() => show(i)}
								aria-label="Show screen {i + 1}: {shot.caption}"
								aria-pressed={i === active}
								class="group/thumb min-w-0 flex-1"
							>
								<span
									class="block aspect-16/10 overflow-hidden rounded-md bg-surface ring-1 transition-all duration-500 ease-out {i ===
									active
										? '-translate-y-1 shadow-lg shadow-foreground/10 ring-foreground/60'
										: 'opacity-55 ring-border grayscale group-hover/thumb:-translate-y-0.5 group-hover/thumb:opacity-100 group-hover/thumb:grayscale-0'}"
								>
									<img
										src={shot.src}
										alt=""
										loading="lazy"
										decoding="async"
										class="size-full object-cover object-top"
									/>
								</span>
								<span class="mt-2 block h-0.5 overflow-hidden rounded-full bg-border">
									{#if i === active}
										<!-- filling bar = time left on this screen; when it ends, move on -->
										<span
											class="block h-full origin-left rounded-full bg-foreground motion-safe:animate-progress motion-reduce:scale-x-100"
											style:--progress-duration="{SCREEN_SECONDS}s"
											style:animation-play-state={hovering ? 'paused' : 'running'}
											onanimationend={advance}
										></span>
									{:else}
										<span
											class="block h-full origin-left rounded-full bg-foreground/40 transition-transform duration-500 {i <
											active
												? 'scale-x-100'
												: 'scale-x-0'}"
										></span>
									{/if}
								</span>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- ───────── Story + facts ───────── -->
	<div class="order-2 min-w-0 lg:order-1 lg:col-span-5 lg:self-center">
		<div class="flex animate-fade-up items-center gap-3 {eyebrow}" style={rise(0)}>
			<span class="text-foreground tabular-nums">{pad(index + 1)}</span>
			<span class="h-px w-8 bg-border"></span>
			<span class="truncate">{project.subtitle}</span>
		</div>

		<h1
			class="mt-4 animate-fade-up text-4xl font-light tracking-tight md:text-5xl xl:text-6xl short:mt-2 short:xl:text-5xl"
			style={rise(80)}
		>
			{project.title}
		</h1>

		<p
			class="mt-5 animate-fade-up text-sm leading-relaxed font-normal text-foreground/85 md:text-[17px] short:mt-3 short:leading-normal"
			style={rise(160)}
		>
			{project.description}
		</p>

		<!-- impact: big numbers split by hairlines -->
		<div class="mt-8 grid grid-cols-3 divide-x divide-border short:mt-4">
			{#each project.impact as metric, i (metric.label)}
				<div class="animate-fade-up px-4 first:pl-0 last:pr-0" style={rise(240 + i * 70)}>
					<div class="text-2xl font-light tabular-nums md:text-3xl short:md:text-2xl">
						{metric.value}
					</div>
					<div class="mt-1 text-xs text-muted">{metric.label}</div>
				</div>
			{/each}
		</div>

		<!-- facts: a small two-column spec sheet -->
		<dl
			class="mt-8 grid animate-fade-up grid-cols-2 gap-x-6 gap-y-4 text-sm short:mt-4 short:gap-y-2"
			style={rise(420)}
		>
			{#each facts as fact (fact.label)}
				<div class="border-t border-border pt-3">
					<dt class={eyebrow}>{fact.label}</dt>
					<dd class="mt-1.5 font-normal">{fact.value}</dd>
				</div>
			{/each}
			<div class="border-t border-border pt-3">
				<dt class={eyebrow}>Access</dt>
				<dd class="mt-1.5 flex items-center gap-1.5 font-normal">
					{#if project.private}
						<Lock class="size-3.5 text-muted" /> Private · In-house
					{:else if project.url}
						<!-- the live link lives here instead of a big button, keeping the sheet compact -->
						<a
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group/live inline-flex items-center gap-1.5 underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
						>
							<Globe class="size-3.5 text-muted" />
							{new URL(project.url).hostname.replace(/^www\./, '')}
							<ArrowUpRight
								class="size-3.5 text-muted transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
							/>
						</a>
					{:else}
						<Globe class="size-3.5 text-muted" /> Public
					{/if}
				</dd>
			</div>
			<div class="col-span-2 border-t border-border pt-3">
				<dt class={eyebrow}>Stack</dt>
				<dd class="mt-2 short:mt-1.5">
					<ul class="flex flex-wrap gap-1.5">
						{#each project.tech as tech (tech)}
							<li><Badge color={techColor(tech)}>{tech}</Badge></li>
						{/each}
					</ul>
				</dd>
			</div>
		</dl>

		{#if project.source}
			<div class="mt-8 flex animate-fade-up flex-wrap gap-3 short:mt-5" style={rise(500)}>
				<Button href={project.source} external variant="outline">
					<SocialIcon name="github" />
					Source
				</Button>
			</div>
		{/if}
	</div>

	<!-- ───────── Features: numbered columns ───────── -->
	<div class="order-3 lg:col-span-12">
		<h2 class="mb-5 animate-fade-up {eyebrow} short:mb-2" style={rise(520)}>Key Features</h2>
		<ol class="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each project.features as feature, i (feature.title)}
				<li class="group animate-fade-up" style={rise(560 + i * 90)}>
					<div class="flex items-center gap-3 text-xs text-muted">
						<span class="tabular-nums transition-colors duration-300 group-hover:text-foreground">
							{pad(i + 1)}
						</span>
						<!-- hairline that fills in on hover -->
						<span class="relative h-px flex-1 overflow-hidden bg-border">
							<span
								class="absolute inset-y-0 left-0 w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full"
							></span>
						</span>
						<feature.icon
							class="size-3.5 transition-colors duration-300 group-hover:text-foreground"
						/>
					</div>
					<h3 class="mt-3 text-sm font-medium">{feature.title}</h3>
					<p
						class="mt-1 text-sm leading-relaxed text-soft transition-colors duration-300 group-hover:text-foreground short:leading-normal"
					>
						{feature.text}
					</p>
				</li>
			{/each}
		</ol>
	</div>
</div>
