import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-auto';
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

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
