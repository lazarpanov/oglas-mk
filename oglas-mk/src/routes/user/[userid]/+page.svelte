<!-- <script lang="ts">
	import { replaceState } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import {
		TreeView,
		TreeViewItem,
		RecursiveTreeView,
		type TreeViewNode
	} from '@skeletonlabs/skeleton';
	import Card from '../../../components/Card.svelte';
	import type { Item } from '../../../types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Link } from 'svelte-routing';

	const item: Item = {
		title: 'Bobr',
		price: 300,
		description: 'Wake up wake up its the first of the month',
		seller: 'gobr Kuki',
		createdAt: '20-12-2013',
		//brisi posle
		id: '1'
	};
	const item2: Item = {
		title: 'Bobr',
		price: 300,
		description: 'Wake up wake up its the first of the month',
		seller: 'dobr Kuki',
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
	const item4: Item = {
		title: 'hate them with perfect hated',
		price: 300,
		description: 'dasd',
		seller: 'Bobr Kuki',
		createdAt: '20-12-2013',
		id: '3'
	};
	let User = {
		Name: 'JAS JAS JAS',
		Username: 'JAS JAS JAS JAS',
		Email: 'majka@ti.com'
	};

	const items = [item, item2, item3, item4];
	function getLastPartOfURL() {
		const url = window.location.href;
		const parts = url.split('/');
		return decodeURIComponent(parts[parts.length - 1]);
	}

	let lastPartOfURL = '';
	onMount(() => {
		// Set the last part of the URL to the store
		lastPartOfURL = getLastPartOfURL();
	});
</script>

<AppBar padding="p-8"
	><div class="user-info flex w-full gap-4">
		<Avatar
			initials={item.seller.charAt(0) + item.seller.charAt(item.seller.lastIndexOf(' ') + 1)}
			width="w-12"
		/>
		<div class="flex flex-col">
			<div><strong>Name:</strong> {User.Name}</div>
			<div><strong>Email:</strong> {User.Email}</div>
		</div>
	</div>
</AppBar>

<div style="width:fit-content;" class="flex h-full flex-wrap items-start justify-start">
	{#each items as item}
		{#if item.seller == lastPartOfURL}
			<div style="width: 250px;" class="flex h-full flex-wrap items-start justify-start gap-3 px-4">
				<Card {item} />
			</div>
		{/if}
	{/each}
</div> -->
