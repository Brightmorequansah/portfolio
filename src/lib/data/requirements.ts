// ✏️ Edit the Get Started intro and the requirements form sections/fields here.
import type { Component } from 'svelte';
import {
	User,
	Briefcase,
	Palette,
	FileText,
	Settings,
	Calendar,
	Sparkles,
	Zap,
	Headphones
} from '@lucide/svelte';

export type Field =
	| {
			type: 'text' | 'email' | 'tel' | 'url';
			name: string;
			label: string;
			required?: boolean;
			placeholder?: string;
	  }
	| { type: 'textarea'; name: string; label: string; required?: boolean; placeholder?: string }
	| { type: 'select'; name: string; label: string; required?: boolean; options: string[] }
	| { type: 'radio'; name: string; label: string; required?: boolean; options: string[] }
	| { type: 'checkbox'; name: string; label: string; options: string[] };

export type FormSection = {
	id: string;
	icon: Component;
	title: string;
	subtitle: string;
	fields: Field[];
};

export const intro = {
	eyebrow: "Let's build something",
	title: 'Your New Website',
	titleEmphasis: 'Starts Here',
	text: 'Placeholder: explain that the form below helps you understand the project. It takes about ten minutes and every answer helps you quote accurately.',
	valueProps: [
		{ icon: Sparkles, title: 'Tailored Design', text: 'Placeholder: made for your brand' },
		{ icon: Zap, title: 'Performance First', text: 'Placeholder: fast and SEO ready' },
		{ icon: Headphones, title: 'Ongoing Support', text: 'Placeholder: here after launch' }
	],
	contactCard: {
		title: 'Prefer to talk first?',
		text: 'Placeholder: say that quick questions are welcome before filling out the full form.',
		formLabel: 'Fill out the full requirements',
		formNote: 'Placeholder: takes about 10 minutes.',
		directLabel: 'Or reach out directly',
		tip: 'Placeholder tip: gather your logo, brand colours and a few websites you like before you start.'
	}
};

export const formSections: FormSection[] = [
	{
		id: 'contact',
		icon: User,
		title: 'About You',
		subtitle: 'How can I reach you?',
		fields: [
			{
				type: 'text',
				name: 'fullName',
				label: 'Full Name',
				required: true,
				placeholder: 'Jane Doe'
			},
			{
				type: 'email',
				name: 'email',
				label: 'Email Address',
				required: true,
				placeholder: 'jane@example.com'
			},
			{
				type: 'tel',
				name: 'phone',
				label: 'Phone / WhatsApp',
				required: true,
				placeholder: '+00 000 000 0000'
			},
			{
				type: 'text',
				name: 'role',
				label: 'Your Role (Optional)',
				placeholder: 'Founder, Marketing Lead…'
			}
		]
	},
	{
		id: 'business',
		icon: Briefcase,
		title: 'Business Overview',
		subtitle: 'Tell me about your vision',
		fields: [
			{ type: 'text', name: 'businessName', label: 'Business Name', required: true },
			{
				type: 'url',
				name: 'currentSite',
				label: 'Current Website (if any)',
				placeholder: 'https://'
			},
			{
				type: 'textarea',
				name: 'businessDescription',
				label: 'What does your business do?',
				required: true
			},
			{ type: 'textarea', name: 'audience', label: 'Who are your customers?' }
		]
	},
	{
		id: 'branding',
		icon: Palette,
		title: 'Branding & Design',
		subtitle: 'Capture the look and feel',
		fields: [
			{
				type: 'radio',
				name: 'hasBranding',
				label: 'Do you have a logo and brand guidelines?',
				options: ['Yes', 'Partly', 'Not yet']
			},
			{
				type: 'checkbox',
				name: 'style',
				label: 'Which styles appeal to you?',
				options: ['Minimal', 'Bold', 'Playful', 'Corporate', 'Elegant', 'Editorial']
			},
			{
				type: 'textarea',
				name: 'inspiration',
				label: 'Websites you like (links + what you like about them)'
			}
		]
	},
	{
		id: 'pages',
		icon: FileText,
		title: 'Pages & Content',
		subtitle: 'Structuring your website',
		fields: [
			{
				type: 'checkbox',
				name: 'pages',
				label: 'Which pages do you need?',
				options: ['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact', 'Shop', 'FAQ']
			},
			{
				type: 'radio',
				name: 'content',
				label: 'Is your content ready?',
				options: ['Ready', 'In progress', 'Need help']
			}
		]
	},
	{
		id: 'features',
		icon: Settings,
		title: 'Features & Functionality',
		subtitle: 'Making your website work for you',
		fields: [
			{
				type: 'checkbox',
				name: 'features',
				label: 'Features you need',
				options: [
					'Contact form',
					'Booking',
					'Payments',
					'Newsletter',
					'CMS',
					'Multi-language',
					'Analytics',
					'Live chat'
				]
			},
			{ type: 'textarea', name: 'featureNotes', label: 'Anything else it should do?' }
		]
	},
	{
		id: 'timeline',
		icon: Calendar,
		title: 'Timeline & Budget',
		subtitle: 'When do we begin?',
		fields: [
			{
				type: 'select',
				name: 'timeline',
				label: 'Ideal launch date',
				required: true,
				options: ['ASAP', '1 month', '2–3 months', 'Flexible']
			},
			{
				type: 'select',
				name: 'budget',
				label: 'Budget range',
				required: true,
				options: ['Under $1,500', '$1,500 – $3,000', '$3,000 – $6,000', '$6,000+']
			},
			{
				type: 'radio',
				name: 'support',
				label: 'Ongoing support after launch?',
				options: ['Yes please', 'Maybe', 'No thanks']
			}
		]
	}
];

export const submitPanel = {
	title: 'Ready to begin?',
	text: "Placeholder: I'll review your answers and reply within two business days.",
	button: 'Submit Requirements',
	successTitle: 'Thanks — requirements received',
	successText: "Placeholder: I'll be in touch shortly with next steps."
};
