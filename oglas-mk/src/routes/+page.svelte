<script lang="ts">
	import Card from '../components/Card.svelte';
	import type { Item } from '../types';

	const item: Item = {
		title: 'Bobr',
		price: 300,
		description: 'Wake up wake up its the first of the month',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
        initials: 'SM'
	};
    const item3:Item={
		title: 'Bobr',
		price: 300,
		description: 'WakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWake up wake up its the first of the month',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
        initials: 'SM'
    };

	const items = [item3,item, item, item, item, item];
</script>

<div class="flex h-full w-full items-start justify-start gap-2 flex-wrap px-2">
	
    {#each items as item}
		<Card {item} />
    {/each}
	
</div>
