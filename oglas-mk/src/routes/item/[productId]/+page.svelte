<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { firebaseApp, firebaseAuth, db } from '../../../lib/firebase';
	import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
	import type { Item } from '../../../types';
	import { load } from '../../+page';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getApps, initializeApp } from 'firebase/app';
	import { page } from '$app/stores';

	let items: Item[];
	let item: Item;
	let id: string;

	onMount(() => {
		let url = window.location.href; // Get the current URL
		id = url.split('/').pop(); // Extract the last part of the URL
	});
	const colRef = collection(db, 'items');

	onSnapshot(colRef, (querySnapshot) => {
		let bazata = [];
		querySnapshot.forEach((doc) => {
			let baza = { ...doc.data(), id: doc.id };
			bazata = [baza, ...bazata];
		});
		items = bazata;
		item = items.find((item) => item.id === id);
	});

	let elemCarousel: HTMLDivElement;

	function carouselLeft(): void {
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	function carouselRight(): void {
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}
	function carouselThumbnail(index: number) {
	elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
}
</script>

{#if item}
	<div class="product-container">
		<div class="product-images">
			<div class="card grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
				<!-- Button: Left -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselLeft}>
					{`<`}
					<i class="fa-solid fa-arrow-left" />
				</button>
				<!-- Full Images -->
				<div
					bind:this={elemCarousel}
					class="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
				>
					{#each item.imageUrls as unsplashId}
						<img
							class="rounded-container-token w-[1024px] snap-center"
							src={unsplashId.url}
							alt={unsplashId.url}
							loading="lazy"
						/>
					{/each}
				</div>
				<!-- Button: Right -->
				<button type="button" class="btn-icon variant-filled" on:click={carouselRight}>
					{`>`}
					<i class="fa-solid fa-arrow-right" />
				</button>
			</div>
			<div class="card grid grid-cols-3 items-center gap-4 p-4">
				{#each item.imageUrls as unsplashId, i}
						
							<img
								class="w-32 h-16"
								src="{unsplashId.url}"
								alt={unsplashId.url}
								loading="lazy"
								on:click={() => carouselThumbnail(i)}
								style="cursor:pointer;"
							/>
			
				{/each}
			</div>
		</div>

		<div class="product-details">
			<div class="flex items-center justify-start space-x-4 p-1">
				<Avatar
					initials={item.createdBy.charAt(0) +
						item.createdBy.charAt(item.createdBy.lastIndexOf(' ') + 1)}
					width="w-8"
				/>
				<h1>{item.createdBy}</h1>
			</div>
			<div>
				<h2>{item.title}</h2>
				<p class="price">${item.price}</p>
				<p>{item.description}</p>
				<form action="/payment/{item.id}">
					<button type="submit" class="btn variant-filled-primary mb-4 mt-4 h-8">
						<svg xmlns="http://www.w3.org/2000/svg" class="fill-white" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg></button>
				</form>
				{#if item.createdBy === $page.data.user?.displayName}
					<a href="http://localhost:5173/edit-item/{item.id}">EDIT ITEM</a>
				{/if}
			</div>
		</div>
	</div>


	
{:else}
	<p>Loading...</p>
{/if}

<style>
	.product-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-height: 300px;
		gap: 20px;
		padding: 20px;
	}

	.product-images {
		gap: 40px;
		max-width: 400px;
		max-height: fit-content;
	}

	.product-details {
		flex: 1;
		max-width: 400px;
	}

	.product-details h1 {
		font-size: 1.5rem;
		margin-bottom: 25px;
		margin-top: 20px;
	}
	.product-details h2 {
		font-size: 1.5rem;
		margin-bottom: 10px;
	}
	.product-details p.price {
		font-size: 1.2rem;
		color: #05ffc9;
		margin-bottom: 10px;
	}

	.product-details p {
		margin-bottom: 20px;
		font-size: 2rem;
		overflow-wrap: break-word; /* Add this line */
	}

	button {
		padding: 10px 20px;
		font-size: 1rem;
		background-color: #007bff;
		color: #fff;
		border: none;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.product-container {
			flex-direction: column;
			align-items: center;
		}

		.product-images {
			max-width: none;
		}

		.product-details {
			max-width: none;
		}
	}
</style>
