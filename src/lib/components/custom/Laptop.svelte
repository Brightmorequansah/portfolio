<!--
	Solid laptop mockup (front view) that frames whatever is passed in as children.
	Lid = solid metal shell → black glass bezel with camera notch → 16:10 screen.
	Base = deck with thumb notch + tapered underside. Colours come from the device-* tokens in layout.css.
	Content should fill the screen, e.g. <img class="absolute inset-0 size-full object-cover object-top">.
	Everything is sized in container units (cqw) so proportions hold at any width.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		aspect = '16 / 10',
		class: className = ''
	}: { children: Snippet; aspect?: string; class?: string } = $props();
</script>

<div class="@container relative w-full {className}">
	<!-- lid: solid shell with a hairline highlight on its edge -->
	<div
		class="relative mx-auto w-[84%] rounded-t-[2.2cqw] rounded-b-[0.4cqw] bg-device-shell p-[0.35cqw] shadow-[inset_0_0_0_0.12cqw_var(--device-lid)]"
	>
		<!-- black glass bezel -->
		<div
			class="relative rounded-t-[1.9cqw] rounded-b-[0.25cqw] bg-device-bezel px-[1cqw] pt-[1.1cqw] pb-[1.2cqw]"
		>
			<!-- screen -->
			<div
				class="relative overflow-hidden rounded-[0.35cqw] bg-device-bezel"
				style:aspect-ratio={aspect}
			>
				{@render children()}
			</div>

			<!-- camera notch -->
			<div
				aria-hidden="true"
				class="absolute top-0 left-1/2 flex h-[1.6cqw] w-[9.5cqw] -translate-x-1/2 items-center justify-center rounded-b-[0.7cqw] bg-device-bezel"
			>
				<span class="size-[0.45cqw] rounded-full bg-device-shell"></span>
			</div>
		</div>
	</div>

	<!-- base -->
	<div aria-hidden="true">
		<!-- deck: a solid slab with a lit top edge and a thumb notch -->
		<div
			class="relative h-[1.5cqw] w-full rounded-t-[0.3cqw] rounded-b-[0.2cqw] bg-linear-to-b from-device-body-highlight via-device-body to-device-body-shade"
		>
			<span
				class="absolute top-0 left-1/2 h-[0.55cqw] w-[13cqw] -translate-x-1/2 rounded-b-[0.6cqw] bg-device-groove"
			></span>
		</div>
		<!-- tapered underside -->
		<div
			class="mx-auto h-[0.8cqw] w-[97%] rounded-br-[3cqw_0.8cqw] rounded-bl-[3cqw_0.8cqw] bg-device-body-shade"
		></div>
	</div>

	<!-- soft contact shadow -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-[6%] bottom-[-1.6cqw] h-[2.2cqw] rounded-[50%] bg-foreground/20 blur-xl"
	></div>
</div>
