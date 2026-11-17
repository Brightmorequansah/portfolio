<script lang="ts">
	import type { Field } from '#lib/data/requirements.js';

	let { field, sectionId }: { field: Field; sectionId: string } = $props();

	const id = $derived(`${sectionId}-${field.name}`);
	const input =
		'w-full rounded-lg border border-border bg-surface px-4 py-3 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-accent focus:outline-none';
	const required = $derived('required' in field && field.required);
</script>

{#snippet label(forId?: string)}
	{#if forId}
		<label for={forId} class="block text-sm font-medium">
			{field.label}{#if required}<span class="ml-1" aria-hidden="true">*</span>{/if}
		</label>
	{:else}
		<legend class="mb-3 block text-sm font-medium">
			{field.label}{#if required}<span class="ml-1" aria-hidden="true">*</span>{/if}
		</legend>
	{/if}
{/snippet}

{#if field.type === 'textarea'}
	<div class="space-y-2">
		{@render label(id)}
		<textarea
			{id}
			name={field.name}
			rows="4"
			{required}
			placeholder={field.placeholder}
			class="{input} resize-none"></textarea>
	</div>
{:else if field.type === 'select'}
	<div class="space-y-2">
		{@render label(id)}
		<select {id} name={field.name} {required} class={input}>
			<option value="" disabled selected>Select an option</option>
			{#each field.options as option (option)}
				<option>{option}</option>
			{/each}
		</select>
	</div>
{:else if field.type === 'radio'}
	<fieldset>
		{@render label()}
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			{#each field.options as option (option)}
				<label
					class="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm transition-all duration-300 hover:border-subtle has-checked:border-accent has-checked:bg-background has-focus-visible:ring-2 has-focus-visible:ring-accent"
				>
					<input type="radio" name={field.name} value={option} {required} class="peer sr-only" />
					<span
						class="flex size-4 items-center justify-center rounded-full border border-subtle peer-checked:border-accent after:size-2 after:scale-0 after:rounded-full after:bg-accent after:transition-transform peer-checked:after:scale-100"
					></span>
					{option}
				</label>
			{/each}
		</div>
	</fieldset>
{:else if field.type === 'checkbox'}
	<fieldset>
		{@render label()}
		<div class="flex flex-wrap gap-2">
			{#each field.options as option (option)}
				<label
					class="cursor-pointer rounded-full border border-border px-4 py-2 text-sm transition-all duration-300 hover:border-subtle has-checked:border-accent has-checked:bg-accent has-checked:text-accent-foreground has-focus-visible:ring-2 has-focus-visible:ring-accent has-focus-visible:ring-offset-2"
				>
					<input type="checkbox" name={field.name} value={option} class="sr-only" />
					{option}
				</label>
			{/each}
		</div>
	</fieldset>
{:else}
	<div class="space-y-2">
		{@render label(id)}
		<input
			{id}
			name={field.name}
			type={field.type}
			{required}
			placeholder={field.placeholder}
			class={input}
		/>
	</div>
{/if}
