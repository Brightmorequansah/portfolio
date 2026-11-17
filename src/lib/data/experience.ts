// ✏️ Replace with your own work history and education.

export type TimelineItem = {
	period: string;
	title: string;
	org: string;
	summary: string;
	details: string[];
};

export const experience: TimelineItem[] = [
	{
		period: '2025 — Present',
		title: 'Senior Frontend Engineer',
		org: 'Company One',
		summary: 'Placeholder summary of the role and what you owned day to day.',
		details: [
			'Placeholder achievement with a measurable result',
			'Placeholder responsibility or initiative you led',
			'Placeholder tools or practices you introduced'
		]
	},
	{
		period: '2023 — 2025',
		title: 'Full Stack Developer',
		org: 'Company Two',
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
		period: '2019 — 2023',
		title: 'BSc Your Degree',
		org: 'Your University',
		summary: 'Placeholder focus areas of your degree.',
		details: ['Course one', 'Course two', 'Course three', 'Course four']
	},
	{
		period: '2016 — 2019',
		title: 'Secondary School',
		org: 'Your School',
		summary: 'Placeholder subjects or achievements.',
		details: ['Subject one', 'Subject two', 'Subject three']
	}
];
