<script lang="ts">
	import { replaceState } from '$app/navigation';
	import Card from '../components/Card.svelte';
	import type { Item } from '../types';
	import { Link } from 'svelte-routing';

	const item: Item = {
		title: 'Bobr',
		price: 300,
		description: 'Wake up wake up its the first of the month',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
		//brisi posle
		id: '1'
	};
	const item2: Item = {
		title: 'Bobr',
		price: 300,
		description: 'Wake up wake up its the first of the month',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
		id: '2'
	};
	const item3: Item = {
		title: 'Bobr',
		price: 300,
		description:
			'WakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWakeWake up wake up its the first of the month',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
		id: '3'
	};

	const items = [item, item2, item3];
</script>

<div class="flex h-full w-full flex-wrap items-start justify-start gap-4 px-10">
	{#each items as item}
		<Card {item} />
	{/each}
</div>
