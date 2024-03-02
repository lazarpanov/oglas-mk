<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Card from '../../components/Card.svelte';
	import type { Item } from '../../types';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { firebaseApp, firebaseAuth, db } from '../../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
	import { getAuth, getAdditionalUserInfo } from 'firebase/auth';

	let email = firebaseAuth.currentUser.email;
	let username = firebaseAuth.currentUser.displayName;

	let itemss: Item[];
	let loading = false;
	const colRef = collection(db, 'items');
	onSnapshot(colRef, (querySnapshot) => {
		let usernamee = firebaseAuth.currentUser.displayName;
		let bazata = [];
		querySnapshot.forEach((doc) => {
			let baza = { ...doc.data(), id: doc.id };
			bazata = [baza, ...bazata];
		});
		itemss = bazata.filter((item) => item.createdBy === usernamee);
		console.log(itemss);
		loading = true;
		//item = items.((item) => item.createdBy === username);
	});
	console.log(username);
</script>

{#if itemss}
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
		{#each itemss as item}
			<div style="width: 250px;" class="flex h-full flex-wrap items-start justify-start gap-3 px-4">
				<Card {item} />
			</div>
		{/each}
	</div>
{:else}
	<p>Loading...</p>
{/if}
