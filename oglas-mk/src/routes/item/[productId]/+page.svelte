<script>
	let product = {
		id: 1,
		seller: 'Bobr Kuki',
		name: 'Example Product',
		price: 29.99,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		images: ['product-image1.jpg', 'product-image2.jpg', 'product-image3.jpg'],
		selectedImage: 0
	};
	const bobr = 'https://img-9gag-fun.9cache.com/photo/aGEQMDZ_460s.jpg';
	function Buyitem() {
		// Implement add to cart functionality
		console.log('Product added to cart:', product);
	}
	import { Avatar } from '@skeletonlabs/skeleton';
	// function selectImage(index: String) {
	// 	product.selectedImage = index;
	// }
</script>

<div class="product-container">
	<div class="product-images">
		<img src={bobr} alt="" />
	</div>

	<div class="product-details">
		<div class="flex items-center justify-start space-x-4 p-1">
			<Avatar
				initials={product.seller.charAt(0) +
					product.seller.charAt(product.seller.lastIndexOf(' ') + 1)}
				width="w-8"
			/>
			<h1>{product.seller}</h1>
		</div>
		<div>
			<h2>{product.name}</h2>
			<p class="price">${product.price.toFixed(2)}</p>
			<p>{product.description}</p>
			<button on:click={Buyitem}>BUY</button>
		</div>
	</div>
</div>

<style>
	.product-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20px;
		padding: 20px;
	}

	.product-images {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 300px;
	}

	.product-images img {
		max-width: 100%;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
	}

	.product-details {
		flex: 1;
		max-width: 400px;
	}

	.product-details h1 {
		font-size: 1.5rem;
		margin-bottom: 10px;
	}

	.product-details p.price {
		font-size: 1.2rem;
		color: #888;
		margin-bottom: 10px;
	}

	.product-details p {
		margin-bottom: 20px;
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
