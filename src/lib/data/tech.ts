// Brand colours for tech names used in projects (badges). Colours come from simple-icons.
import {
	siSvelte,
	siTypescript,
	siTailwindcss,
	siGraphql,
	siVercel,
	siReact,
	siNodedotjs,
	siPostgresql,
	siRedis,
	siExpo,
	siSupabase,
	siNextdotjs,
	siSanity,
	siPython,
	siDocker,
	siGithubactions,
	siStripe,
	siJavascript,
	siHtml5,
	siCss,
	siFigma,
	siCloudinary,
	siGit,
	siGithub,
	siApacheecharts
} from 'simple-icons';

/** tech name (as written in projects.ts) → brand hex without '#' */
const brandHex: Record<string, string> = {
	SvelteKit: siSvelte.hex,
	Svelte: siSvelte.hex,
	TypeScript: siTypescript.hex,
	'Tailwind CSS': siTailwindcss.hex,
	GraphQL: siGraphql.hex,
	// simple-icons lists Keycloak's grey wordmark; the logo mark itself is cyan
	Keycloak: '33C6E9',
	Vercel: siVercel.hex,
	React: siReact.hex,
	'Node.js': siNodedotjs.hex,
	PostgreSQL: siPostgresql.hex,
	Redis: siRedis.hex,
	Expo: siExpo.hex,
	Supabase: siSupabase.hex,
	'Next.js': siNextdotjs.hex,
	Sanity: siSanity.hex,
	Python: siPython.hex,
	Docker: siDocker.hex,
	'GitHub Actions': siGithubactions.hex,
	Stripe: siStripe.hex,
	JavaScript: siJavascript.hex,
	HTML: siHtml5.hex,
	CSS: siCss.hex,
	Figma: siFigma.hex,
	Cloudinary: siCloudinary.hex,
	Git: siGit.hex,
	GitHub: siGithub.hex,
	// not in simple-icons; Paystack's logo blue
	Paystack: '00C3F7',
	ECharts: siApacheecharts.hex
};

/** relative luminance (0 = black, 1 = white) of a hex colour */
function luminance(hex: string) {
	const [r, g, b] = [0, 2, 4].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * CSS colour for a tech badge, or undefined when we don't know the brand.
 * Near-black brands (Vercel, Next.js…) follow the theme's foreground so they stay visible in dark mode.
 */
export function techColor(name: string): string | undefined {
	const hex = brandHex[name];
	if (!hex) return undefined;
	return luminance(hex) < 0.03 ? 'var(--foreground)' : `#${hex}`;
}
