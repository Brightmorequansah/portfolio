// ✏️ Replace with your own projects. Screenshots live in src/lib/assets/projects/<slug> and are imported below.
import type { Component } from 'svelte';
import {
	Gauge,
	Layers,
	Lock,
	Smartphone,
	Search,
	Zap,
	Database,
	Palette,
	BookOpen,
	GraduationCap,
	Bell,
	ShieldCheck,
	ShoppingBag,
	CreditCard,
	PackageSearch,
	LayoutDashboard,
	Rss,
	Headphones,
	Mail
} from '@lucide/svelte';

import axDashboard from '../assets/projects/axlearn/dashboard.webp';
import axCoursePlayer from '../assets/projects/axlearn/course-player.webp';
import axLearnerDashboard from '../assets/projects/axlearn/learner-dashboard.png?format=webp';
import axLogin from '../assets/projects/axlearn/login.webp';
import axCourses from '../assets/projects/axlearn/my-courses.png?format=webp';
import axCourseBuilder from '../assets/projects/axlearn/course-builder.webp';
import axProjectDetail from '../assets/projects/axlearn/project-detail.webp';
import axAlerts from '../assets/projects/axlearn/alerts.webp';

// your PNG screenshots, converted to 1920px WebP at build time (see vite.config.ts)
import pwHero from '../assets/projects/peswa-shop/01-hero.png?w=1920&format=webp';
import pwProduct from '../assets/projects/peswa-shop/04-add-to-cart.png?w=1920&format=webp';
import pwCheckout from '../assets/projects/peswa-shop/06-checkout.png?w=1920&format=webp';
import pwSuccess from '../assets/projects/peswa-shop/07-success.png?w=1920&format=webp';
import pwWaitlist from '../assets/projects/peswa-shop/09-waitlist.png?w=1920&format=webp';
import pwAdminDashboard from '../assets/projects/peswa-shop/admin-01-dashboard.png?w=1920&format=webp';
import pwAdminProducts from '../assets/projects/peswa-shop/admin-02-products.png?w=1920&format=webp';
import pwAdminAddProduct from '../assets/projects/peswa-shop/admin-03-add-product.png?w=1920&format=webp';
import pwAdminProductView from '../assets/projects/peswa-shop/admin-05-product-view.png?w=1920&format=webp';

import psHero from '../assets/projects/peswa-site/01-home-hero.png?w=1920&format=webp';
import psHost from '../assets/projects/peswa-site/03-host.png?w=1920&format=webp';
import psAbout from '../assets/projects/peswa-site/06-about.png?w=1920&format=webp';
import psEpisodes from '../assets/projects/peswa-site/07-episodes.png?w=1920&format=webp';
import psContact from '../assets/projects/peswa-site/08-contact.png?w=1920&format=webp';

export type Project = {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	/** cover image (landing page + first gallery frame) */
	image: string;
	/** extra screens shown as a switchable gallery on /projects */
	gallery?: {
		src: string;
		caption: string;
		/** 'contain' shows the whole image (for shots that aren't 16:10) instead of filling the screen */
		fit?: 'contain';
		/** colour behind a 'contain' shot; use the screenshot's own edge colour so it blends in */
		matte?: string;
		/** CSS inset() to clip stray capture edges, e.g. '0 0.2% 0.2% 0' (top right bottom left) */
		trim?: string;
	}[];
	/** live site; leave out for private / in-house apps */
	url?: string;
	/** in-house app that isn't publicly accessible: no live link, labelled "In-house" */
	private?: boolean;
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
	/** shown in the "Projects" section on the landing page */
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
		slug: 'axlearn',
		title: 'Axlearn',
		subtitle: 'Learning Management Platform',
		description:
			'An internal learning platform for Axon Information Systems that onboards interns and upskills teams. I built large parts of the frontend, from the course builder and guided learn page to the dashboards and live notifications.',
		image: axDashboard,
		gallery: [
			{ src: axLogin, caption: 'Sign-in screen with the Axon brand story' },
			{ src: axDashboard, caption: 'Admin dashboard: users, courses, enrolments and completion' },
			{
				src: axLearnerDashboard,
				caption: 'Learner dashboard: progress, quiz results, activity and achievements',
				// the user's own 16:9 capture: shown whole on its page-grey edge colour
				fit: 'contain',
				matte: '#f3f3f3',
				trim: '0 0.1% 0 0' // 1px window edge on the right
			},
			{
				src: axCoursePlayer,
				caption: 'Learn page with ordered lessons, progress and an AI assistant'
			},
			{
				src: axCourses,
				caption: 'My Courses: progress, enrolment status and one-click start or retake',
				// the user's own 16:9 capture: shown whole on its page-grey edge colour
				fit: 'contain',
				matte: '#f3f3f3',
				trim: '0 0.2% 0.25% 0' // 3px / 2px window edge on the right and bottom
			},
			{
				src: axCourseBuilder,
				caption: 'Four-step course builder: details, modules, audience, publish'
			},
			{
				src: axProjectDetail,
				caption: 'Projects that bundle courses, quizzes, deliverables and reviews'
			},
			{ src: axAlerts, caption: 'Alerts inbox with drafts, scheduled sends and read states' }
		],
		private: true,
		year: '2026',
		duration: 'Ongoing',
		team: 'Team of 5',
		role: 'Frontend Engineer',
		tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
		highlights: [
			'Course builder for modules, lessons, audiences and scheduled publishing',
			'Guided learn page with locked lesson order and an AI tutor panel',
			'Live notifications with a bell inbox and scheduled alerts'
		],
		features: [
			{
				icon: BookOpen,
				title: 'Course Builder',
				text: 'Step-by-step wizard for modules, lessons, audiences and publishing.'
			},
			{
				icon: GraduationCap,
				title: 'Guided Learning',
				text: 'Lessons unlock in order, with progress tracking and an AI tutor.'
			},
			{
				icon: Bell,
				title: 'Live Alerts',
				text: 'Server-sent notifications, a bell inbox and scheduled alerts.'
			},
			{
				icon: ShieldCheck,
				title: 'Role-based Access',
				text: 'Keycloak sign-in with admin, supervisor and learner workspaces.'
			}
		],
		impact: [
			{ value: '3', label: 'User Roles' },
			{ value: '9', label: 'Feature Modules' },
			{ value: '55+', label: 'Screens' }
		],
		featured: true
	},
	{
		slug: 'peswa-shop',
		title: 'Peswa Shop',
		subtitle: 'E-commerce Store & Admin',
		description:
			'The online store for The Peswa, a Ghanaian streetwear brand. I built it end to end: storefront, cart, Paystack checkout, order tracking, a pre-launch waitlist and the admin console.',
		image: pwHero,
		gallery: [
			{ src: pwHero, caption: 'Storefront hero: "Wear The Story."' },
			{ src: pwWaitlist, caption: 'Pre-launch waitlist with a live countdown to the drop' },
			{ src: pwProduct, caption: 'Product page: gallery, colour and size variants, add to cart' },
			{ src: pwCheckout, caption: 'Checkout with Ghana regions, shipping options and coupons' },
			{ src: pwSuccess, caption: 'Order confirmation with a reference for tracking' },
			{
				src: pwAdminDashboard,
				caption: 'Admin console: fulfilment, sales and inventory at a glance'
			},
			{ src: pwAdminProducts, caption: 'Product catalogue with stock levels and units sold' },
			{
				src: pwAdminAddProduct,
				caption: 'Product editor: pricing, discounts, sizes, colours, scheduling'
			},
			{ src: pwAdminProductView, caption: 'Product detail panel with variants and stock' }
		],
		url: 'https://peswa-shop.vercel.app',
		year: '2026',
		duration: 'Ongoing',
		team: 'Team of 2',
		role: 'Full-Stack Developer',
		tech: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Paystack'],
		highlights: [
			'Storefront with product variants, cart and wishlist',
			'Paystack checkout with server-side payment verification',
			'Admin console for products, orders, customers and analytics'
		],
		features: [
			{
				icon: ShoppingBag,
				title: 'Storefront',
				text: 'Category filters, product galleries, colour and size variants, wishlist.'
			},
			{
				icon: CreditCard,
				title: 'Paystack Checkout',
				text: 'Ghana regions, shipping options, coupons and verified payments.'
			},
			{
				icon: PackageSearch,
				title: 'Order Tracking',
				text: 'Track any order by reference and email, or from your account.'
			},
			{
				icon: LayoutDashboard,
				title: 'Admin Console',
				text: 'Products, orders, customers, ECharts analytics and the waitlist.'
			}
		],
		impact: [
			{ value: '28', label: 'Pages' },
			{ value: '8', label: 'Admin Sections' },
			{ value: '2', label: 'Delivery Regions' }
		],
		featured: true
	},
	{
		slug: 'peswa-podcast',
		title: 'The Peswa Podcast',
		subtitle: 'Podcast Website',
		description:
			'The website for The Peswa Podcast, the voice of African entrepreneurship. Episodes sync from its RSS feed into a searchable library, with listen links and a guest contact form.',
		image: psHero,
		gallery: [
			{ src: psHero, caption: 'Home hero: "The Peswa Podcast"' },
			{ src: psHost, caption: 'Meet the host' },
			{ src: psEpisodes, caption: 'Episode library with search and topic filters' },
			{ src: psAbout, caption: 'About the show' },
			{ src: psContact, caption: 'Contact form for guests and partners, with auto-reply' }
		],
		url: 'https://www.thepeswa.com',
		year: '2025',
		duration: 'Ongoing',
		team: 'Team of 2',
		role: 'Frontend Developer',
		tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
		highlights: [
			'Episodes synced automatically from the podcast RSS feed',
			'Searchable episode library with topic filters',
			'Contact form with EmailJS auto-replies'
		],
		features: [
			{
				icon: Rss,
				title: 'Live Episode Feed',
				text: "New episodes sync automatically from the show's RSS feed."
			},
			{
				icon: Search,
				title: 'Episode Library',
				text: 'Search every episode by guest or topic, with category filters.'
			},
			{
				icon: Headphones,
				title: 'Listen Anywhere',
				text: 'One-tap links to Spotify, Apple Podcasts and YouTube.'
			},
			{
				icon: Mail,
				title: 'Guest Enquiries',
				text: 'Contact form for guests and partners, with EmailJS auto-replies.'
			}
		],
		impact: [
			{ value: '89', label: 'Episodes' },
			{ value: '3', label: 'Platforms' },
			{ value: '5', label: 'Pages' }
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
