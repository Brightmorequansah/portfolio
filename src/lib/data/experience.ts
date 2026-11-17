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
		summary: 'Placeholder summary of the role and what you owned day to day.',
		details: [
			'Placeholder achievement with a measurable result',
			'Placeholder responsibility or initiative you led',
			'Placeholder tools or practices you introduced'
		]
	},
	{
		period: '2025 — Present',
		title: 'Full Stack Developer',
		org: 'The Peswa',
		summary: 'Placeholder summary of the role and the products you worked on.',
		details: [
			'Placeholder feature you designed and shipped',
			'Placeholder performance or quality improvement',
			'Placeholder collaboration with design or product'
		]
	},
	{
		period: '2021 — 2023',
		title: 'Freelance Developer',
		org: 'Self-employed',
		summary: 'Placeholder summary of the clients and kinds of projects you took on.',
		details: ['Placeholder client project', 'Placeholder outcome for a client']
	}
];

export const education: TimelineItem[] = [
	{
		period: '2021 — 2025',
		title: 'BSc Business Information Technology',
		org: 'Palm University College',
		summary: 'Placeholder focus areas of your degree.',
	},
];
