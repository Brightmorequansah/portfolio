// ✏️ Replace everything in this file with your own details.

export const profile = {
	name: 'Brightmore Quansah',
	initials: 'MM',
	role: 'Creative Developer',
	tagline:
		'Designing and building calm, considered digital products. Placeholder tagline — swap in a line about what you do and where you work.',
	location: 'Accra, Ghana',
	email: 'brightmoreq123@gmail.com',
	whatsapp: 'https://wa.me/0000000000',
	fileShare: 'https://drive.google.com/',
	socials: {
		github: 'https://github.com/your-username',
		linkedin: 'https://www.linkedin.com/in/your-username/'
	},
	about: {
		greeting: 'Hi, nice to meet you',
		paragraphs: [
			'This is placeholder bio copy. Use this first paragraph to introduce yourself: what you build, how long you have been doing it and the kind of problems you enjoy solving.',
			'Use the second paragraph for the teams and clients you have worked with and the strengths you bring to a project — the things people come back to you for.',
			'Close with something human: a hobby, an interest, or what you get up to away from the keyboard.'
		],
		approach: [
			{ title: 'Clarity', text: 'Placeholder: one line on keeping things clear and simple.' },
			{ title: 'Craft', text: 'Placeholder: one line on building things properly.' },
			{ title: 'Care', text: 'Placeholder: one line on the details people feel.' }
		]
	},
	contact: {
		heading: "Let's work together",
		text: 'Placeholder: a short invitation to get in touch about projects, roles or collaborations. Mention how quickly you usually reply.'
	},
	stackIntro:
		'Placeholder: a sentence about the tools you reach for most and how you use them together.'
};

export const homeSections = [
	{ label: 'About', href: '/#about' },
	{ label: 'Projects', href: '/#projects' },
	{ label: 'Tech Stack', href: '/#stack' },
	{ label: 'Contact', href: '/#contact' }
];

export const navLinks = [
	{ label: 'Home', href: '/', children: homeSections },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Services', href: '/services' },
	{ label: 'Get Started', href: '/get-started' }
];
