<script lang="ts">
	import { Lightbulb, Code, Sparkles } from '@lucide/svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import CornerBrackets from '#lib/components/custom/CornerBrackets.svelte';
	import Timeline from './Timeline.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';
	import { experience, education } from '#lib/data/experience.js';

	const approachIcons = [Lightbulb, Code, Sparkles];
</script>

<section id="about" class="scroll-mt-16 bg-surface py-20 md:py-32">
	<Container>
		<SectionHeading>About Me</SectionHeading>

		<div class="grid items-start gap-12 md:grid-cols-12">
			<div class="md:col-span-7 lg:col-span-8">
				<div class="relative">
					<CornerBrackets />
					<div class="pt-6 pl-6">
						<h3 class="mb-6 text-2xl font-light">{profile.about.greeting}</h3>
						<div class="space-y-4 text-lg leading-relaxed">
							{#each profile.about.paragraphs as p (p)}
								<p>{p}</p>
							{/each}
						</div>

						<div class="mt-8 border-t border-border pt-8">
							<h4 class="mb-6 text-lg font-medium">My approach</h4>
							<div class="grid gap-6 sm:grid-cols-3">
								{#each profile.about.approach as item, i (item.title)}
									{@const Icon = approachIcons[i % approachIcons.length]}
									<div use:reveal={{ delay: i * 0.1 }} class="group">
										<div
											class="rounded-lg border border-transparent p-4 transition-all duration-300 group-hover:border-border"
										>
											<div class="mb-3 flex items-center justify-between">
												<div
													class="text-3xl font-light text-subtle transition-colors group-hover:text-foreground"
												>
													{String(i + 1).padStart(2, '0')}
												</div>
												<Icon
													class="size-5 text-subtle transition-colors group-hover:text-foreground"
												/>
											</div>
											<h5 class="mb-1 font-medium">{item.title}</h5>
											<p class="text-sm text-muted">{item.text}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="space-y-8 md:col-span-5 lg:col-span-4">
				<Timeline heading="Experience" items={experience} />
				<Timeline heading="Education" items={education} toggleLabel="Show courses" />
			</div>
		</div>
	</Container>
</section>
