<script lang="ts">
	import Container from '#lib/components/custom/Container.svelte';
	import SocialIcon from '#lib/components/custom/SocialIcon.svelte';
	import Logo from './Logo.svelte';
	import { profile, navLinks, homeSections } from '#lib/data/profile.js';

	const links = [
		{ label: 'Home', href: '/' },
		...homeSections,
		...navLinks.filter((l) => l.href !== '/')
	];
	const year = new Date().getFullYear();
</script>

<footer class="bg-inverse py-8 text-inverse-muted">
	<Container>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div class="space-y-4">
				<Logo class="text-inverse-foreground" />
				<p class="text-sm">© {year} {profile.name}. All rights reserved.</p>
			</div>

			<div>
				<p class="mb-4 text-sm font-medium text-inverse-foreground">Navigation</p>
				<div class="grid grid-cols-2 gap-2">
					{#each links as link (link.href)}
						<a href={link.href} class="text-sm transition-colors hover:text-inverse-foreground"
							>{link.label}</a
						>
					{/each}
				</div>
			</div>

			<div>
				<p class="mb-4 text-sm font-medium text-inverse-foreground">Contact</p>
				<div class="space-y-2">
					<a
						href="mailto:{profile.email}"
						class="block text-sm transition-colors hover:text-inverse-foreground"
					>
						{profile.email}
					</a>
					<p class="text-sm">{profile.location}</p>
					<div class="mt-4 flex gap-2">
						{#each [['github', 'GitHub'], ['linkedin', 'LinkedIn']] as const as [key, label] (key)}
							<a
								href={profile.socials[key]}
								target="_blank"
								rel="noopener noreferrer"
								class="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
								aria-label={label}
							>
								<SocialIcon name={key} />
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</Container>
</footer>
