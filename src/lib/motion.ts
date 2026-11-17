import type { Action } from 'svelte/action';

export const EASE = 'cubic-bezier(0.25, 0.1, 0.35, 1)';

export type RevealOptions = {
	/** start offset in px (animates to 0) */
	x?: number;
	y?: number;
	/** start scale (animates to 1) */
	scale?: number;
	/** seconds */
	delay?: number;
	/** seconds */
	duration?: number;
	/** animate width from 0 → this value instead of transform (e.g. underline bars) */
	width?: string;
};

export function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

/**
 * Scroll-reveal: element starts hidden/offset and animates to rest once it enters the viewport
 * (100px inside the edge). Plays once.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const { x = 0, scale, delay = 0, duration = 0.5, width } = options;
	const y = options.y ?? (x || scale !== undefined || width ? 0 : 20);

	if (prefersReducedMotion()) return;

	const transform = `translate3d(${x}px, ${y}px, 0)${scale !== undefined ? ` scale(${scale})` : ''}`;
	const props = width ? 'width, opacity' : 'transform, opacity';

	node.style.opacity = '0';
	if (width) node.style.width = '0px';
	else node.style.transform = transform;

	const show = () => {
		node.style.transition = `${props
			.split(', ')
			.map((p) => `${p} ${duration}s ${EASE} ${delay}s`)
			.join(', ')}`;
		node.style.opacity = '';
		if (width) node.style.width = width;
		else node.style.transform = '';
	};

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				show();
				observer.disconnect();
			}
		},
		{ rootMargin: '-100px 0px' }
	);
	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
};

/** Svelte transition: fade + slide from an offset, used when slides/items re-key. */
export function enter(
	_node: Element,
	{
		x = 0,
		y = 0,
		scale = 1,
		delay = 0,
		duration = 500
	}: { x?: number; y?: number; scale?: number; delay?: number; duration?: number } = {}
) {
	if (prefersReducedMotion()) return { duration: 0 };
	return {
		delay,
		duration,
		easing: (t: number) => 1 - Math.pow(1 - t, 3),
		css: (t: number, u: number) =>
			`opacity:${t};transform:translate3d(${u * x}px, ${u * y}px, 0) scale(${scale + (1 - scale) * t})`
	};
}
