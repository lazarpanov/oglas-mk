<script lang="ts">
	import '../app.pcss';
	import {
		AppShell,
		AppBar,
		LightSwitch,
		type PopupSettings,
		ListBox,
		ListBoxItem,
		popup
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { fetchItems } from '../service';
	import { itemsStore } from '../stores';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	$: showFragments = $page.url.pathname === '/';
	// console.log($page.data.user)

	// import { writable } from 'svelte/store';

	// export let searchTerm = writable('test');
	let searchQuery = '';

	const handleSearch = async () => {
		await fetchItems(searchQuery, comboboxValue).then((result) => {
			itemsStore.set(result);
		});
	};
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead"
				><a href="http://localhost:5173/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="32"
						viewBox="0 -960 960 960"
						width="32"
						class="fill-primary-600"
					>
						<path
							d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"
						/>
					</svg>
				</a>
			</svelte:fragment>
			<p class="text-primary-600 text-2xl font-bold">Oglasium</p>
			<svelte:fragment slot="trail">
				<div class="flex items-center gap-4">
					{#if $page.data.user}
						<a href="/user/">
							<div class="text-primary-600 font-bold">{$page.data.user.displayName}</div>
						</a>
						<form method="post" action="/auth/logout">
							<button type="submit" class="btn variant-filled-primary">Log out!</button>
						</form>
					{:else}
						<form action="/auth/login">
							<button type="submit" class="btn variant-filled-primary">Log In!</button>
						</form>
					{/if}

					<LightSwitch />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		{#if showFragments}
			<div class="flex items-center justify-center gap-1">
				{#if $page.data.user}
					<form action="/add-item">
						<button type="submit" class="btn-icon variant-filled-primary mb-4 mt-4 h-8"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="fill-white"
								height="24"
								viewBox="0 -960 960 960"
								width="24"
								><path
									d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
								/></svg
							></button
						>
					</form>
				{/if}
				<input
					class="input mb-4 mt-4 h-8 w-3/12"
					bind:value={searchQuery}
					type="search"
					name="demo"
					placeholder="Search..."
				/>
				<button on:click={handleSearch} class="btn-icon variant-filled-primary mb-4 mt-4 h-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fill-white"
						height="24"
						viewBox="0 -960 960 960"
						width="24"
						><path
							d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
						/></svg
					>
				</button>
				<!-- <button class="btn-icon variant-filled-primary mb-4 mt-4 h-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e8eaed"
						><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg
					>
				</button> -->
				<button
					style="width: min-content;"
					class="btn variant-filled-primary w-48 justify-between"
					use:popup={popupCombobox}
				>
					<span class="capitalize">{comboboxValue ?? 'Category'}</span>
					<span>↓</span>
				</button>
				<div
					class="card max-h-[160px] w-48 overflow-auto py-2 shadow-xl"
					data-popup="popupCombobox"
				>
					<ListBox rounded="rounded-none">
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Category"
							>Category</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Motors">Motors</ListBoxItem
						>
						<ListBoxItem
							bind:group={comboboxValue}
							name="medium"
							value="Clothing, Shoes & Accessories">Clothing, Shoes & Accessories</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Sporting Goods"
							>Sporting Goods</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Toys & Hobbies"
							>Toys & Hobbies</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Home & Garden"
							>Home & Garden</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Jewelry & Watches"
							>Jewelry & Watches</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Health & Beauty"
							>Health & Beauty</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Business & Industrial"
							>Business & Industrial</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Pet Supplies"
							>Pet Supplies</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Baby Essentials"
							>Baby Essentials</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Electronics"
							>Electronics</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Collectibles & Art"
							>Collectibles & Art</ListBoxItem
						>
						<ListBoxItem bind:group={comboboxValue} name="medium" value="Books, Movies & Music"
							>Books, Movies & Music</ListBoxItem
						>
					</ListBox>
					<div class="arrow bg-surface-100-800-token" />
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>

<style>
	input {
		text-align: center;
	}
</style>
