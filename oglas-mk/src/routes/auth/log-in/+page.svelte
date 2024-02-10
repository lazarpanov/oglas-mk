<script lang="ts">
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex h-full w-full items-start justify-center px-4 pt-12">
	<form class="flex flex-col space-y-4 rounded-xl p-8 shadow-2xl w-[400px]">
		<h3 class="h3 font-bold">Log in</h3>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Email</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" title="email" type="text" placeholder="Email" />
			</label>
			<label class="label">
				<span>Password</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" title="password" type="text" placeholder="Password" />
			</label>
			<div class="text-primary-700 mt-2 text-sm">
				If you don't have an account, <a href="/auth/register" class="underline">register here!</a>
			</div>
			<button type="button" class="btn variant-filled mt-5">Log in!</button>
		</div>
	</form>
</div>

<style>
</style>
