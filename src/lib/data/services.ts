// What I offer. No prices: each service links to a real project that shows it in action.
import type { Component } from 'svelte';
import {
	Globe,
	AppWindow,
	CreditCard,
	Palette,
	Smartphone,
	Search,
	Gauge,
	Mail,
	Lock,
	Database,
	LayoutDashboard,
	Users,
	ShoppingCart,
	ShieldCheck,
	PackageSearch,
	Receipt,
	PenTool,
	LayoutGrid,
	MousePointerClick
} from '@lucide/svelte';

export type Service = {
	icon: Component;
	title: string;
	tagline: string;
	description: string;
	status: string;
	features: { icon: Component; title: string; text: string }[];
	/** tech names; shown as brand-coloured badges (see src/lib/data/tech.ts) */
	tools: string[];
	/** slug of a project in projects.ts that shows this service in action */
	project: string;
};

export const servicesHero = {
	lead: 'Services',
	title: 'What I Do',
	text: 'I design and build websites, full web applications and payment flows, from the first sketch to a live product people use.'
};

export const services: Service[] = [
	{
		icon: Globe,
		title: 'Build Websites',
		tagline: 'Fast, responsive sites that tell your story',
		description:
			'From a single landing page to a full brand site, I build websites that load fast, look right on every screen and make it easy for visitors to find what they came for.',
		status: 'Available now',
		features: [
			{ icon: Smartphone, title: 'Responsive', text: 'Built for phones, tablets and desktops.' },
			{ icon: Search, title: 'SEO Ready', text: 'Clean metadata, sitemaps and fast pages.' },
			{ icon: Gauge, title: 'Fast & Accessible', text: 'Optimised assets and solid markup.' },
			{
				icon: Mail,
				title: 'Contact Forms',
				text: 'Enquiries straight to your inbox, with auto-replies.'
			}
		],
		tools: ['Next.js', 'SvelteKit', 'React', 'Tailwind CSS'],
		project: 'peswa-podcast'
	},
	{
		icon: AppWindow,
		title: 'Full Web Applications',
		tagline: 'Complete products with users, data and dashboards',
		description:
			'Fully functional web apps built front to back: sign-in and user roles, databases and APIs, dashboards and admin tools, tested and deployed so your team can rely on them every day.',
		status: 'Available now',
		features: [
			{
				icon: Lock,
				title: 'Auth & Roles',
				text: 'Secure sign-in with the right access for each user.'
			},
			{ icon: Database, title: 'Data & APIs', text: 'Databases, REST and GraphQL, fully typed.' },
			{
				icon: LayoutDashboard,
				title: 'Dashboards',
				text: 'Charts and stats that show what matters.'
			},
			{ icon: Users, title: 'Admin Tools', text: 'Manage content, users and orders in one place.' }
		],
		tools: ['SvelteKit', 'React', 'TypeScript', 'Supabase', 'GraphQL'],
		project: 'axlearn'
	},
	{
		icon: CreditCard,
		title: 'Payment Integrations',
		tagline: 'Secure checkouts your customers trust',
		description:
			'I connect your site or app to payment providers like Paystack, with a smooth checkout, every payment verified on the server, and orders your customers can track from purchase to delivery.',
		status: 'Available now',
		features: [
			{
				icon: ShoppingCart,
				title: 'Checkout Flows',
				text: 'Cart, delivery options and coupons.'
			},
			{
				icon: ShieldCheck,
				title: 'Verified Payments',
				text: 'Every payment confirmed on the server.'
			},
			{
				icon: PackageSearch,
				title: 'Order Tracking',
				text: 'Customers follow orders by reference.'
			},
			{ icon: Receipt, title: 'Confirmations', text: 'Clear receipts and email updates.' }
		],
		tools: ['Paystack', 'Supabase', 'SvelteKit'],
		project: 'peswa-shop'
	},
	{
		icon: Palette,
		title: 'Web Design',
		tagline: 'Interfaces that look good and work well',
		description:
			'Starting from user research, I design clean, usable interfaces in Figma, from wireframes to polished screens, and build them exactly as designed so nothing gets lost in hand-off.',
		status: 'Available now',
		features: [
			{ icon: Users, title: 'User Research', text: 'Understand who it is for before designing.' },
			{ icon: LayoutGrid, title: 'Wireframes', text: 'Structure and flows before visuals.' },
			{ icon: PenTool, title: 'UI Design', text: 'Polished screens and reusable components.' },
			{
				icon: MousePointerClick,
				title: 'Design to Code',
				text: 'Built pixel for pixel, with real interactions.'
			}
		],
		tools: ['Figma', 'Tailwind CSS'],
		project: 'peswa-shop'
	}
];

export const customCta = {
	title: 'Need Something Custom?',
	text: "Have an idea that doesn't fit neatly into one of these? Tell me about it and we'll work out the best way to build it."
};
