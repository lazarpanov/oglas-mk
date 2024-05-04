<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Card from '../../components/Card.svelte';
	import type { Item } from '../../types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { firebaseApp, firebaseAuth, db } from '../../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
	import { getAuth, getAdditionalUserInfo } from 'firebase/auth';
	import { page } from '$app/stores';

	let raboti = $page.data.user.displayName;

	export let data;
	$: items = data.items;
</script>

<AppBar>
	<!-- <div class="user-info flex w-full gap-4">
		<Avatar initials={raboti.charAt(0) + raboti.charAt(raboti.lastIndexOf(' ') + 1)} width="w-12" />
		<div class="flex flex-col">
			<div><strong>Name:</strong> {raboti}</div>
			<div><strong>Email:</strong> {$page.data.user.email}</div>
		</div>
	</div> -->
		<dl class="list-dl">
				<div>
					<Avatar initials={raboti.charAt(0) + raboti.charAt(raboti.lastIndexOf(' ') + 1)} width="w-12" />
					<span class="flex-auto">
						<dt class="font-bold">Name: {raboti}</dt>
						<dd class="text-sm opacity-50">Email: {$page.data.user.email}</dd>
					</span>
				</div>
		</dl>
	
</AppBar>

<div style="width:fit-content;" class="flex my-3 h-full flex-wrap items-start justify-start">
	{#each items as item}
		<div style="width: 250px;" class="flex h-full flex-wrap items-start justify-start gap-3 px-4">
			<Card {item} />
		</div>
	{/each}
</div>
