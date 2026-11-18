<script lang="ts">
	import { ArrowRight, ArrowUpRight, CircleCheckBig, Lock } from '@lucide/svelte';
	import Badge from '#lib/components/custom/Badge.svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import Laptop from '#lib/components/custom/Laptop.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import { reveal } from '#lib/motion.js';
	import { featuredProjects, type Project } from '#lib/data/projects.js';
	import { techColor } from '#lib/data/tech.js';

	// every project's full write-up is its slide on /projects
	const detailsFor = (p: Project) => `/projects?project=${p.slug}`;
</script>

<section id="projects" class="scroll-mt-16 pt-14 pb-20 md:pt-20 md:pb-32">
	<Container>
		<SectionHeading class="mb-20 md:mb-24">Projects</SectionHeading>

		<div class="grid gap-24 md:gap-36">
			{#each featuredProjects as project (project.slug)}
				<article use:reveal={{ y: 40, duration: 0.8 }} class="group">
					<div class="grid items-center gap-8 md:grid-cols-12">
						<div class="relative md:col-span-7">
							<a
								href={detailsFor(project)}
								class="relative block"
								aria-label="More details about {project.title}"
							>
								{#if project.gallery?.length}
									<!-- a touch smaller than the /projects gallery (88%) -->
									<Laptop class="mx-auto md:w-[80%]">
										<img
											src={project.image}
											alt="{project.title} preview"
											loading="lazy"
											class="absolute inset-0 size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
										/>
									</Laptop>
								{:else}
									<div class="relative aspect-video overflow-hidden">
										<img
											src={project.image}
											alt="{project.title} preview"
											loading="lazy"
											class="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
										/>
									</div>
								{/if}
							</a>
						</div>

						<div class="space-y-4 md:col-span-5">
							<div use:reveal={{ delay: 0.2 }}>
								<h3 class="flex flex-wrap items-center gap-3 text-xl font-medium md:text-2xl">
									{project.title}
									{#if project.private}
										<span
											class="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-xs font-normal text-muted"
										>
											<Lock class="size-3" />
											In-house
										</span>
									{/if}
								</h3>
								<p class="mt-2 text-soft">{project.description}</p>

								<div class="mt-4 flex flex-wrap gap-2">
									{#each project.tech as tech (tech)}
										<Badge color={techColor(tech)}>{tech}</Badge>
									{/each}
								</div>

								<div class="mt-6 space-y-3">
									<h4 class="text-sm font-medium">Key Features</h4>
									<div class="space-y-2">
										{#each project.highlights as h, i (h)}
											<div
												use:reveal={{ x: -10, delay: 0.3 + i * 0.1 }}
												class="flex items-center text-sm text-muted"
											>
												<CircleCheckBig class="mr-2 size-4 shrink-0 text-foreground" />
												{h}
											</div>
										{/each}
									</div>
								</div>

								<!-- More Details → the project's slide; View Project → live site (public projects only) -->
								<div class="mt-6 flex flex-wrap gap-3">
									<Button href={detailsFor(project)}>
										More Details
										<ArrowRight class="transition-transform group-hover:translate-x-1" />
									</Button>
									{#if project.url}
										<Button href={project.url} external variant="outline">
											View Project
											<ArrowUpRight
												class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											/>
										</Button>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<!-- a plain text link, not a button -->
			<a
				href="/projects"
				class="group inline-flex items-center gap-1.5 text-sm font-medium underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground md:text-base"
			>
				View all projects
				<ArrowRight class="size-4 transition-transform group-hover:translate-x-1" />
			</a>
		</div>
	</Container>
</section>
