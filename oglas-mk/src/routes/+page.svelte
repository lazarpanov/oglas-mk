<script lang="ts">
	import { replaceState } from '$app/navigation';
	import Card from '../components/Card.svelte';
	import type { Item } from '../types';
	import { Link } from 'svelte-routing';
	import { firebaseApp, firebaseAuth, db } from '../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { itemsStore } from '../stores';
	import { page } from '$app/stores';
	
	export let data;
	onMount(async () => {
		await data.items.then((res) => {
			itemsStore.set(res);
		})
	})
</script>

<div class="flex h-full w-full flex-wrap items-start justify-start gap-4 px-10">
	{#each $itemsStore as item}
		<Card {item} />
	{/each}
</div>
