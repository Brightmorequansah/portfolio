// ✏️ Replace with your own work history and education.

export type TimelineItem = {
	period: string;
	title: string;
	org: string;
	summary: string;
	/** optional bullet list shown behind a "Show details" toggle — leave out to hide the toggle */
	details?: string[];
};

export const experience: TimelineItem[] = [
	{
		period: '2025 — Present',
		title: 'Junior Frontend Engineer',
		org: 'Axon Information Systems',
		summary:
			'Working with frontend and backend engineers to ship user-facing features, tested and deployed.',
		details: [
			'Shipped user-facing features end to end, from UI build to API integration and release',
			'Built reusable, responsive UI components that keep screens consistent and speed up new feature work',
			'Integrated REST APIs with typed TypeScript models, plus clear loading, empty and error states'
		]
	},
	{
		period: '2025 — 2026',
		title: 'Full Stack Developer — Freelance',
		org: 'The Peswa',
		summary:
			'Designed and built The Peswa’s brand website and online shop end to end, from frontend to backend.',
		details: [
			'Built the brand website to present the business, its story and offerings on every screen size',
			'Developed the e-commerce shop with a product catalogue, cart and checkout flow',
			'Handled both frontend and backend, plus deployment and ongoing updates after launch'
		]
	},
	{
		period: '2023 — 2024',
		title: 'Software Developer — Intern',
		org: 'Axon Information Systems',
		summary:
			'Built a strong foundation in JavaScript, React and web design while learning to work in a development team.',
		details: [
			'Learnt and practised modern JavaScript and React through hands-on tasks',
			'Built an expense tracker app with React to apply components, state and forms',
			'Studied core web design and development concepts, from layout to responsive UI',
			'Learnt how to work effectively in a development team and collaborate on shared projects'
		]
	}
];

export const education: TimelineItem[] = [
	{
		period: '2021 — 2025',
		title: 'BSc Business Information Technology',
		org: 'Palm University College',
		summary: 'Placeholder focus areas of your degree.'
	}
];
