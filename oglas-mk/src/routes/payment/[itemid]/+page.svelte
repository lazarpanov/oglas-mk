<script lang="ts">
	import { db } from '$lib/firebase.js';
	import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

	export let data;
	$: item = data.item;
	//console.log(item);

	let cardHolder = '';
	let cardNumber = '';
	let expiry = '';
	let cvv = 0;

	async function buyItem(itemId: string) {
		if (cardHolder == '' || cardNumber == '' || expiry == '' || cvv == 0) {
			return;
		}
		try {
			const itemRef = doc(db, 'items', itemId);

			await updateDoc(itemRef, { status: 'paid' });
			window.location.href = '/';
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex h-full w-full items-start justify-center px-4 pt-12">
	<form class="flex w-[400px] flex-col space-y-4 rounded-xl p-8 shadow-2xl">
		<div class="flex items-center justify-center gap-4">
			<h3 class="h3 font-bold">Payment Details</h3>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7 dark:fill-white"
				viewBox="0 -960 960 960"
				><path
					d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z"
				/></svg
			>
		</div>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Card Holder</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="cardHolder"
					type="text"
					placeholder="Barry Allen"
					bind:value={cardHolder}
				/>
			</label>
			<label class="label">
				<span>Card Number</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="cardNumber"
					type="text"
					placeholder="1234 5678 435678"
					bind:value={cardNumber}
				/>
			</label>
			<div class="flex gap-4">
				<label class="label">
					<span>Expiry</span>
					<!-- (input here) -->
					<input
						class="input px-2 py-1"
						title="expiry"
						type="text"
						placeholder="MM/YYYY"
						bind:value={expiry}
					/>
				</label>
				<label class="label">
					<span>CVV/CVC</span>
					<!-- (input here) -->
					<input
						class="input px-2 py-1"
						title="cvv"
						type="number"
						placeholder="***"
						bind:value={cvv}
					/>
				</label>
			</div>
			<button type="button" class="btn variant-filled mt-5" on:click={() => buyItem(item.id)}
				>Pay {item.price} $</button
			>
		</div>
	</form>
</div>

<style>
</style>
