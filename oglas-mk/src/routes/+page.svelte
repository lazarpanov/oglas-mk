<script lang="ts">
	import { replaceState } from '$app/navigation';
	import Card from '../components/Card.svelte';
	import type { Item } from '../types';
	import { Link } from 'svelte-routing';
	import { firebaseApp, firebaseAuth, db } from '../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';

	export let data;
	$: items = data.items;
</script>

<div class="flex h-full w-full flex-wrap items-start justify-start gap-4 px-10">
	{#each items as item}
		<Card {item} />
	{/each}
</div>
