<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex h-full w-full items-start justify-center px-4 pt-12">
	<form class="flex w-[400px] flex-col space-y-4 rounded-xl p-8 shadow-2xl">
		<h3 class="h3 font-bold">Create a new item</h3>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Title</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" title="title" type="text" placeholder="Title" />
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
					<input type="text" placeholder="Price" class="input px-2 py-1" />
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
				<textarea class="textarea px-2 py-1" rows="4" placeholder="Description" />
			</label>

			<FileDropzone name="files" class="mb-3 mt-3" />
			<button type="button" class="btn variant-filled">Register item</button>
		</div>
	</form>
</div>

<style>
</style>
