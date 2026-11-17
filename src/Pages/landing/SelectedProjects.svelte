<script lang="ts">
	import { ArrowRight, ArrowUpRight, CircleCheckBig } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import { reveal } from '#lib/motion.js';
	import { featuredProjects } from '#lib/data/projects.js';
</script>

<section id="projects" class="scroll-mt-16 py-20 md:py-32">
	<Container>
		<SectionHeading>Selected Projects</SectionHeading>

		<div class="grid gap-24">
			{#each featuredProjects as project (project.slug)}
				<article use:reveal={{ y: 40, duration: 0.8 }} class="group">
					<div class="grid items-center gap-8 md:grid-cols-12">
						<div class="relative md:col-span-7">
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								class="relative block aspect-video overflow-hidden"
								aria-label="Open {project.title}"
							>
								<img
									src={project.image}
									alt="{project.title} preview"
									loading="lazy"
									class="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
								/>
							</a>
						</div>

						<div class="space-y-4 md:col-span-5">
							<div use:reveal={{ delay: 0.2 }}>
								<h3 class="text-2xl font-medium">{project.title}</h3>
								<p class="mt-2 text-soft">{project.description}</p>

								<div class="mt-4 flex flex-wrap gap-2">
									{#each project.tech as tech (tech)}
										<span class="inline-block rounded-full bg-surface-raised px-3 py-1 text-xs"
											>{tech}</span
										>
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

								<div class="mt-6">
									<Button href={project.url} external variant="outline">
										View Project
										<ArrowUpRight
											class="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										/>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<Button href="/projects" variant="outline">
				View All Projects
				<ArrowRight class="transition-transform group-hover:translate-x-1" />
			</Button>
		</div>
	</Container>
</section>
