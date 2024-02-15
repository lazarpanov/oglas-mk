<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Item } from '../types';
	import { Link } from 'svelte-routing';
	const bobr = 'https://img-9gag-fun.9cache.com/photo/aGEQMDZ_460s.jpg';

	export let item: Item = {
		title: '',
		price: 0,
		description: '',
		createdAt: '',
		seller: '',
		id: ''
	};
	console.log(item);
</script>

<a class="card variant-primary card-hover w-64 overflow-hidden" href="/item/{item.id}">
	<header>
		<img class="w-64" src={bobr} alt="Post" />
	</header>
	<div class="space-y-4 p-4">
		<h3 class="h3" data-toc-ignore>{item.title}</h3>
	</div>
	<hr class="opacity-50" />
	<footer class="flex items-center justify-start space-x-4 p-4">
		<Avatar
			initials={item.seller.charAt(0) + item.seller.charAt(item.seller.lastIndexOf(' ') + 1)}
			width="w-8"
		/>
		<div class="flex flex-auto items-center justify-between">
			<h6 class="font-bold" data-toc-ignore>{item.seller}</h6>
			<small>On {item.createdAt}</small>
		</div>
	</footer>
</a>
