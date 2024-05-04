<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Item } from '../types';

	export let item: Item;

	//console.log(item);
</script>
<a class="card variant-primary card-hover size-64 overflow-hidden" href="/item/{item.id}">
	<header>
		<img class="w-64 h-32" src={item.imageUrls.at(0).url} alt="Post" />
	</header>
	<div class="space-y-4 p-4">
		<h3 class="h3" data-toc-ignore>{item.title}</h3>
	</div>
	<hr class="opacity-50" />
	<footer class="flex items-center justify-start space-x-4 p-4">
		<Avatar
			initials={item.createdBy.charAt(0) +
				item.createdBy.charAt(item.createdBy.lastIndexOf(' ') + 1)}
			width="w-8"
		/>
		<div class="flex flex-auto items-center justify-between">
			<h6 class="font-bold" data-toc-ignore>{item.createdBy}</h6>
			<small>On {item.createdAt}</small>
		</div>
	</footer>
</a>