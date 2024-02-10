<script>
	import '../app.pcss';
	import { AppShell, AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import {page} from "$app/stores"
	const blackList = ['/auth']
	console.log($page.url.pathname)

	$:showFragments = $page.url.pathname === '/'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<p class="text-2xl font-bold text-primary-600">Oglasium</p>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
		</svelte:fragment>
		<svelte:fragment slot='pageHeader'>
			{#if showFragments}
			Search
			{/if}
		</svelte:fragment>
	<slot />


</AppShell>
