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
		<div style="min-width: 600px; min-height:500px; max-width:600px; max-height:500px">
			<div
				style="min-width: 600px; min-height:500px; max-width:600px; max-height:500px"
				class="card grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4"
			>
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
							class="rounded-container-token min-w-full snap-center"
							style="height: 400px;"
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

			<h2>{item.title}</h2>
			<h3>{item.category}</h3>
			<p class="price">${item.price}</p>
			<p class="font-bold" style=" word-wrap: break-word;">{item.description}</p>
			<form action="/payment/{item.id}" class="mr-2" style="display:inline-block;">
				<button type="submit" class="btn variant-filled-secondary mb-4 mt-4 h-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-white"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
						><path
							d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"
						/></svg
					></button
				>
			</form>
			{#if item.createdBy === $page.data.user?.displayName}
				<form action="/edit-item/{item.id}" style="display: inline-block">
					<button type="submit" class="btn variant-filled-warning mb-4 mt-4 h-8">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="fill-white"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							><path
								d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
							/></svg
						></button
					>
				</form>
			{/if}
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
		color: red;
		margin-bottom: 10px;
	}

	@media (max-width: 768px) {
		.product-container {
			flex-direction: column;
			align-items: center;
		}

		.product-details {
			max-width: none;
		}
	}
</style>
