<script lang="ts">
	import Container from '#lib/components/custom/Container.svelte';
	import ServiceBlock from './ServiceBlock.svelte';
	import { services } from '#lib/data/services.js';
</script>

<!-- overflow-x-clip: the slide-in offsets and corner badges must never make the page scroll sideways -->
<section id="services" class="scroll-mt-16 overflow-x-clip py-20 md:py-32">
	<Container class="max-w-7xl md:px-8 lg:px-12">
		<div class="space-y-32">
			{#each services as service, index (service.title)}
				<ServiceBlock {service} {index} />
			{/each}
		</div>
	</Container>
</section>
