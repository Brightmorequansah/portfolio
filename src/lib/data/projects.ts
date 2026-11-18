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
	ShieldCheck
} from '@lucide/svelte';

import axDashboard from '../assets/projects/axlearn/dashboard.webp';
import axCoursePlayer from '../assets/projects/axlearn/course-player.webp';
import axLearnerDashboard from '../assets/projects/axlearn/learner-dashboard.png';
import axLogin from '../assets/projects/axlearn/login.webp';
import axCourses from '../assets/projects/axlearn/my-courses.png';
import axCourseBuilder from '../assets/projects/axlearn/course-builder.webp';
import axProjectDetail from '../assets/projects/axlearn/project-detail.webp';
import axAlerts from '../assets/projects/axlearn/alerts.webp';

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
		team: 'Team of 3',
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
