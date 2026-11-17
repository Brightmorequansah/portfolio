// ✏️ Replace with your own projects. Put screenshots in /static/projects and point `image` at them.
import type { Component } from 'svelte';
import { Gauge, Layers, Lock, Smartphone, Search, Zap, Database, Palette } from '@lucide/svelte';

export type Project = {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	url: string;
	source?: string;
	year: string;
	duration: string;
	team: string;
	role: string;
	tech: string[];
	/** short bullet list used on the landing page */
	highlights: string[];
	/** richer feature tiles used on /projects */
	features: { icon: Component; title: string; text: string }[];
	impact: { value: string; label: string }[];
	/** shown in "Selected Projects" on the landing page */
	featured?: boolean;
};

const defaultFeatures = [
	{
		icon: Smartphone,
		title: 'Responsive',
		text: 'Placeholder: works beautifully on every screen size.'
	},
	{ icon: Zap, title: 'Fast', text: 'Placeholder: optimised assets and instant navigation.' },
	{ icon: Lock, title: 'Secure', text: 'Placeholder: authentication and safe payments.' },
	{ icon: Search, title: 'SEO Ready', text: 'Placeholder: structured data and clean metadata.' }
];

export const projects: Project[] = [
	{
		slug: 'project-one',
		title: 'Project One',
		subtitle: 'E-commerce Platform',
		description:
			'Placeholder description. Two or three sentences on the problem, what you built and the result. Keep it focused on outcomes.',
		image: '/projects/project-1.svg',
		url: 'https://example.com',
		source: 'https://github.com/your-username/project-one',
		year: '2025',
		duration: '3 months',
		team: 'Solo project',
		role: 'Full-Stack Developer',
		tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Stripe'],
		highlights: [
			'Placeholder key feature one',
			'Placeholder key feature two',
			'Placeholder key feature three'
		],
		features: defaultFeatures,
		impact: [
			{ value: '1.1s', label: 'Load Time' },
			{ value: '+35%', label: 'Conversion' },
			{ value: '99/100', label: 'Lighthouse' }
		],
		featured: true
	},
	{
		slug: 'project-two',
		title: 'Project Two',
		subtitle: 'SaaS Dashboard',
		description:
			'Placeholder description of a dashboard product: who uses it, what it helps them do and the hardest technical problem you solved.',
		image: '/projects/project-2.svg',
		url: 'https://example.com',
		year: '2025',
		duration: '5 months',
		team: 'Team of 4',
		role: 'Frontend Lead',
		tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
		highlights: [
			'Placeholder real-time charts',
			'Placeholder role-based access',
			'Placeholder audit trail'
		],
		features: [
			{ icon: Gauge, title: 'Real-time', text: 'Placeholder: live data with streaming updates.' },
			{ icon: Layers, title: 'Modular', text: 'Placeholder: composable widgets and layouts.' },
			{ icon: Lock, title: 'Permissions', text: 'Placeholder: granular roles and access control.' },
			{ icon: Database, title: 'Scalable', text: 'Placeholder: handles millions of rows.' }
		],
		impact: [
			{ value: '12k', label: 'Daily Users' },
			{ value: '-40%', label: 'Support Tickets' },
			{ value: '99.9%', label: 'Uptime' }
		],
		featured: true
	},
	{
		slug: 'project-three',
		title: 'Project Three',
		subtitle: 'Mobile Companion App',
		description:
			'Placeholder description of a mobile app. Mention the platform, the core flow and how it connects to the rest of the product.',
		image: '/projects/project-3.svg',
		url: 'https://example.com',
		source: 'https://github.com/your-username/project-three',
		year: '2024',
		duration: '4 months',
		team: 'Team of 2',
		role: 'Mobile Developer',
		tech: ['Expo', 'TypeScript', 'Supabase'],
		highlights: [
			'Placeholder offline mode',
			'Placeholder push notifications',
			'Placeholder biometric login'
		],
		features: defaultFeatures,
		impact: [
			{ value: '4.8★', label: 'App Rating' },
			{ value: '20k', label: 'Downloads' },
			{ value: '60fps', label: 'Animations' }
		],
		featured: true
	},
	{
		slug: 'project-four',
		title: 'Project Four',
		subtitle: 'Brand & Marketing Site',
		description:
			'Placeholder description of a marketing site: the brand, the storytelling and the CMS that lets the client update it themselves.',
		image: '/projects/project-4.svg',
		url: 'https://example.com',
		year: '2024',
		duration: '6 weeks',
		team: 'Solo project',
		role: 'Designer & Developer',
		tech: ['Next.js', 'Tailwind CSS', 'Sanity'],
		highlights: [
			'Placeholder editorial layouts',
			'Placeholder CMS workflow',
			'Placeholder motion design'
		],
		features: [
			{ icon: Palette, title: 'Brand-led', text: 'Placeholder: bespoke art direction.' },
			...defaultFeatures.slice(1)
		],
		impact: [
			{ value: '2x', label: 'Enquiries' },
			{ value: '0.9s', label: 'Load Time' },
			{ value: '100', label: 'SEO Score' }
		]
	},
	{
		slug: 'project-five',
		title: 'Project Five',
		subtitle: 'Open-source Tool',
		description:
			'Placeholder description of an open-source library or CLI: what it automates, who uses it and how the community has grown.',
		image: '/projects/project-5.svg',
		url: 'https://example.com',
		source: 'https://github.com/your-username/project-five',
		year: '2023',
		duration: 'Ongoing',
		team: 'Open source',
		role: 'Maintainer',
		tech: ['Python', 'Docker', 'GitHub Actions'],
		highlights: [
			'Placeholder plugin system',
			'Placeholder CI integration',
			'Placeholder docs site'
		],
		features: defaultFeatures,
		impact: [
			{ value: '1.5k', label: 'GitHub Stars' },
			{ value: '40+', label: 'Contributors' },
			{ value: '10k', label: 'Weekly Installs' }
		]
	}
];

export const featuredProjects = projects.filter((p) => p.featured);
