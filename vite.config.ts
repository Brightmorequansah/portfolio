import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Pre-bundle these on dev-server start. Otherwise Vite only discovers them when you first
	// navigate to a page that uses them (e.g. /projects → Home), re-bundles, and force-reloads the
	// browser mid-navigation, which briefly shows the old and new page together.
	optimizeDeps: {
		include: ['@lucide/svelte', 'simple-icons', 'three']
	},
	plugins: [
		tailwindcss(),
		// converts imported images at build time, e.g. './shot.png?w=1920&format=webp' → an optimised WebP URL
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// deployed on Vercel: https://svelte.dev/docs/kit/adapter-vercel
			// Pinned so the serverless runtime doesn't depend on whichever Node builds it
			// (the adapter rejects odd versions like Node 25).
			adapter: adapter({ runtime: 'nodejs24.x' })
		})
	]
});
