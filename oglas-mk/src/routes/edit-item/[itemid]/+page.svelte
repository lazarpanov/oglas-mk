<script lang="ts">
	import { onMount } from 'svelte';
	import type { Item } from '../../../types';
	import { enhance } from '$app/forms';
	import Dropzone from 'svelte-file-dropzone';
	import { firebaseApp, firebaseAuth, db, storage } from '../../../lib/firebase';
	import { doc, updateDoc, deleteField, deleteDoc } from 'firebase/firestore';
	import { getDownloadURL, getStorage, ref, uploadBytes, getMetadata } from 'firebase/storage';
	//import { load } from './+page.server';
	export async function loadPage({ params }) {
		return { params };
	}

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	function handleRemoveFile(e, index) {
		files.accepted.splice(index, 1);
		files.accepted = [...files.accepted];
	}

	export let data;
	$: items = data.item;

	async function editItem(itemId: string) {
		try {
			const itemRef = doc(db, 'items', itemId);

			// Use updateDoc to update specific fields in the document
			await updateDoc(itemRef, {
				title: items.title,
				price: items.price,
				description: items.description

				// Add other fields as needed
			});
			const updatedImageUrls = [];

			await Promise.all(
				files.accepted.map(async (file) => {
					const storageRef = ref(storage, file.name);
					const snapshot = await uploadBytes(storageRef, file);
					const url = await getDownloadURL(storageRef);
					const metadata = await getMetadata(storageRef);
					updatedImageUrls.push({ name: metadata.name, url });
				})
			);

			// Use updateDoc to update the document with the new imageUrls array
			await updateDoc(itemRef, { imageUrls: updatedImageUrls });
			window.location.href = '/';
		} catch (error) {
			// Handle errors
			console.error('Error editing item:', error);
			// Optionally, show an error message to the user
		}
	}
	async function deleteItem(itemId: string) {
		try {
			const itemRef = doc(db, 'items', itemId);

			await deleteDoc(itemRef);
			window.location.href = '/';
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex h-full w-full items-start justify-center px-4 pt-12">
	<form class="flex w-[400px] flex-col space-y-4 rounded-xl p-8 shadow-2xl">
		<h3 class="h3 font-bold">Edit item</h3>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Title</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="title"
					type="text"
					bind:value={items.title}
					placeholder="Title"
				/>
			</label>
			<label class="label">
				<span>Price</span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 -960 960 960"
							width="24"
							class="fill-white"
							><path
								d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"
							/></svg
						>
					</div>
					<input type="text" bind:value={items.price} placeholder="Price" class="input px-2 py-1" />
					<select>
						<option>MKD</option>
						<option>EUR</option>
						<option>USD</option>
					</select>
				</div>
			</label>
			<label class="label">
				<span>Description</span>
				<!-- (input here) -->
				<textarea
					class="textarea px-2 py-1"
					rows="4"
					bind:value={items.description}
					placeholder="Description"
				/>
			</label>

			<Dropzone
				on:drop={handleFilesSelect}
				accept="image/jpeg, image/png, image/heif"
				containerClasses="!rounded-lg !p-3 dark:!border-primary-600 dark:!bg-surface-600"
			/>
			<div style="margin: 5px;">
				{#each files.accepted as item, index}
					<div>
						<span>{item.name}</span>
						<button type="button" on:click={(e) => handleRemoveFile(e, index)}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								height="14"
								viewBox="0 -960 960 960"
								width="14"
								class="fill-primary-600"
								><path
									d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
								/></svg
							></button
						>
					</div>
				{/each}
			</div>
			<button type="button" class="btn variant-filled" on:click={() => editItem(items.id)}
				>Edit item</button
			>
			<button type="button" class="btn variant-filled" on:click={() => deleteItem(items.id)}
				>Delete item</button
			>
		</div>
	</form>
</div>

<style>
</style>
