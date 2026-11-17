<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Mail, CircleCheckBig } from '@lucide/svelte';
	import Button from '#lib/components/custom/Button.svelte';
	import Container from '#lib/components/custom/Container.svelte';
	import SectionHeading from '#lib/components/custom/SectionHeading.svelte';
	import CornerBrackets from '#lib/components/custom/CornerBrackets.svelte';
	import SocialIcon from '#lib/components/custom/SocialIcon.svelte';
	import { reveal } from '#lib/motion.js';
	import { profile } from '#lib/data/profile.js';

	let sent = $state(false);

	const input =
		'w-full rounded-lg border border-border bg-background px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none';

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		// ✏️ Hook this up to your form service / API endpoint.
		sent = true;
	}
</script>

<section id="contact" class="scroll-mt-16 py-20 md:py-32">
	<Container>
		<SectionHeading>Get In Touch</SectionHeading>

		<div class="mx-auto max-w-5xl">
			<div class="grid items-center gap-12 md:grid-cols-2">
				<div use:reveal={{ x: -20, duration: 0.8 }} class="relative">
					<CornerBrackets size="sm" />
					<div class="p-6">
						<h3 class="mb-6 text-2xl font-light">{profile.contact.heading}</h3>
						<p class="mb-8 text-soft">{profile.contact.text}</p>
						<div class="space-y-6">
							<a
								href="mailto:{profile.email}"
								class="group flex items-center text-lg transition-colors hover:text-subtle"
							>
								<span
									class="mr-4 flex size-10 items-center justify-center rounded-full bg-surface-raised transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
								>
									<Mail class="size-4" />
								</span>
								{profile.email}
							</a>
							<div class="flex gap-4">
								<Button
									href={profile.socials.github}
									external
									variant="outline"
									size="icon"
									aria-label="GitHub"
								>
									<SocialIcon name="github" />
								</Button>
								<Button
									href={profile.socials.linkedin}
									external
									variant="outline"
									size="icon"
									aria-label="LinkedIn"
								>
									<SocialIcon name="linkedin" />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div use:reveal={{ x: 20, duration: 0.8 }}>
					<div class="rounded-xl border border-border bg-surface p-8">
						{#if sent}
							<div in:fade class="flex flex-col items-center py-12 text-center">
								<CircleCheckBig class="mb-4 size-10" />
								<h4 class="mb-2 text-xl font-light">Message sent</h4>
								<p class="text-sm text-muted">
									Thanks for reaching out — I'll get back to you soon.
								</p>
							</div>
						{:else}
							<h4 class="mb-6 text-xl font-light">Send me a message</h4>
							<form class="space-y-6" {onsubmit}>
								<div class="space-y-2">
									<label for="name" class="text-sm font-medium">Name</label>
									<input
										id="name"
										name="name"
										required
										autocomplete="name"
										placeholder="Your name"
										class={input}
									/>
								</div>
								<div class="space-y-2">
									<label for="email" class="text-sm font-medium">Email</label>
									<input
										id="email"
										name="email"
										type="email"
										required
										autocomplete="email"
										placeholder="you@example.com"
										class={input}
									/>
								</div>
								<div class="space-y-2">
									<label for="message" class="text-sm font-medium">Message</label>
									<textarea
										id="message"
										name="message"
										required
										rows="4"
										placeholder="Tell me about your project…"
										class="{input} resize-none"></textarea>
								</div>
								<button
									type="submit"
									class="w-full rounded-lg bg-accent py-3 text-accent-foreground transition-all hover:opacity-85"
								>
									Send Message
								</button>
							</form>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Container>
</section>
