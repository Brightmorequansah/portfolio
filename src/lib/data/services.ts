// ✏️ Replace with the services you offer, your prices and plans.
import type { Component } from 'svelte';
import {
	Globe,
	Server,
	Palette,
	Wrench,
	Zap,
	ShieldCheck,
	Headphones,
	Search,
	Cloud,
	HardDrive,
	Gauge,
	Lock,
	Layers,
	Smartphone,
	Code,
	Rocket,
	Monitor,
	Settings,
	Database,
	Clock
} from '@lucide/svelte';

export type Service = {
	icon: Component;
	title: string;
	tagline: string;
	description: string;
	status: string;
	features: { icon: Component; title: string; text: string }[];
	metrics: { value: string; label: string }[];
	price: { from: string; unit: string; summary: string };
	plans: { name: string; price: string; specs: string }[];
	visual: { icons: Component[]; label: string; value: string; badge: string };
};

export const servicesHero = {
	lead: 'Services',
	title: 'Built For You',
	text: 'Placeholder intro to your services. One or two sentences on who you help and what they get when they work with you.'
};

export const services: Service[] = [
	{
		icon: Globe,
		title: 'Website Design & Build',
		tagline: 'Custom sites that convert',
		description:
			'Placeholder description of your flagship service. Explain the process, what is included and the type of client it suits best.',
		status: 'Available now',
		features: [
			{ icon: Palette, title: 'Custom Design', text: 'Placeholder: tailored to your brand.' },
			{ icon: Smartphone, title: 'Responsive', text: 'Placeholder: looks great on every device.' },
			{
				icon: Search,
				title: 'SEO Foundations',
				text: 'Placeholder: metadata, sitemaps and speed.'
			},
			{ icon: Headphones, title: 'Launch Support', text: 'Placeholder: help after go-live.' }
		],
		metrics: [
			{ value: '<2s', label: 'Load Time' },
			{ value: '95+', label: 'Lighthouse' },
			{ value: '4 wks', label: 'Typical Build' }
		],
		price: { from: '$1,500', unit: 'project', summary: 'Design • Build • Launch' },
		plans: [
			{ name: 'Starter', price: '$1,500', specs: 'Up to 5 pages' },
			{ name: 'Business', price: '$3,000', specs: 'Up to 12 pages + CMS' },
			{ name: 'Custom', price: 'Quote', specs: 'Bespoke features' }
		],
		visual: {
			icons: [Monitor, Palette, Code, Rocket],
			label: 'Starting from',
			value: '$1,500',
			badge: '$1.5k+'
		}
	},
	{
		icon: Server,
		title: 'Managed Hosting',
		tagline: 'Fast, secure, looked after',
		description:
			'Placeholder description of a hosting or maintenance service. Cover uptime, backups and what you handle so the client does not have to.',
		status: 'Available now',
		features: [
			{ icon: Zap, title: 'Fast Servers', text: 'Placeholder: SSD storage and a global CDN.' },
			{ icon: ShieldCheck, title: 'Security Updates', text: 'Placeholder: patched automatically.' },
			{ icon: Lock, title: 'Free SSL', text: 'Placeholder: HTTPS on every site.' },
			{
				icon: HardDrive,
				title: 'Daily Backups',
				text: 'Placeholder: restore any day in one click.'
			}
		],
		metrics: [
			{ value: '99.9%', label: 'Uptime' },
			{ value: '24h', label: 'Backups' },
			{ value: '10GB', label: 'Storage' }
		],
		price: { from: '$15', unit: 'month', summary: '10GB Storage • Free SSL' },
		plans: [
			{ name: 'Basic', price: '$15/mo', specs: '1 site • 10GB' },
			{ name: 'Pro', price: '$30/mo', specs: '5 sites • 50GB' },
			{ name: 'Agency', price: '$60/mo', specs: 'Unlimited sites' }
		],
		visual: {
			icons: [Cloud, Database, Gauge, ShieldCheck],
			label: 'Plans from',
			value: '$15/mo',
			badge: '$15+'
		}
	},
	{
		icon: Wrench,
		title: 'Care & Maintenance',
		tagline: 'Peace of mind, every month',
		description:
			'Placeholder description of an ongoing retainer: content edits, monitoring, small improvements and a guaranteed response time.',
		status: 'Limited slots',
		features: [
			{
				icon: Clock,
				title: 'Fast Response',
				text: 'Placeholder: replies within one business day.'
			},
			{ icon: Settings, title: 'Updates', text: 'Placeholder: plugins, packages and fixes.' },
			{ icon: Gauge, title: 'Monitoring', text: 'Placeholder: uptime and performance alerts.' },
			{ icon: Layers, title: 'Small Changes', text: 'Placeholder: content and layout tweaks.' }
		],
		metrics: [
			{ value: '1 day', label: 'Response' },
			{ value: '5 hrs', label: 'Monthly Time' },
			{ value: '100%', label: 'Covered' }
		],
		price: { from: '$200', unit: 'month', summary: '5 hours • Priority support' },
		plans: [
			{ name: 'Lite', price: '$200/mo', specs: '5 hours' },
			{ name: 'Plus', price: '$400/mo', specs: '12 hours' },
			{ name: 'Partner', price: '$800/mo', specs: '30 hours' }
		],
		visual: {
			icons: [Settings, Clock, Gauge, Headphones],
			label: 'Retainers from',
			value: '$200/mo',
			badge: '$200+'
		}
	}
];

export const customCta = {
	title: 'Need Something Custom?',
	text: 'Placeholder: mention bespoke development, integrations or consulting — anything that does not fit the packages above.'
};
