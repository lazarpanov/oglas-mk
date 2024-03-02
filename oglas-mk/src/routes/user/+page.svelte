<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Card from '../../components/Card.svelte';
	import type { Item } from '../../types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { firebaseApp, firebaseAuth, db } from '../../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
	import { getAuth, getAdditionalUserInfo } from 'firebase/auth';
	import { page } from '$app/stores';

	let email = firebaseAuth.currentUser.email;
	let username = firebaseAuth.currentUser.displayName;
	$page.data.user.displayName;
	console.log($page.data.user.displayName);
	console.log(username);
	export let data;
	$: items = data.items;
</script>

<AppBar padding="p-8"
	><div class="user-info flex w-full gap-4">
		<Avatar
			initials={username.charAt(0) + username.charAt(username.lastIndexOf(' ') + 1)}
			width="w-12"
		/>
		<div class="flex flex-col">
			<div><strong>Name:</strong> {username}</div>
			<div><strong>Email:</strong> {email}</div>
		</div>
	</div>
</AppBar>

<div style="width:fit-content;" class="flex h-full flex-wrap items-start justify-start">
	{#each items as item}
		{#if item.createdBy === $page.data.user.displayName}
			<div style="width: 250px;" class="flex h-full flex-wrap items-start justify-start gap-3 px-4">
				<Card {item} />
			</div>
		{/if}
	{/each}
</div>
