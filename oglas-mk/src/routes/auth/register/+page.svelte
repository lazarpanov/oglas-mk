<script lang="ts">
	import { goto } from '$app/navigation';
  
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';
  
	let email: string;
	let password: string;
  
	let success: boolean | undefined = undefined;
	
	const register = () => {
	  createUserWithEmailAndPassword(firebaseAuth, email, password)
		.then(() => {
		  goto('/auth/log-in');
		})
		.catch((error) => {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log(errorCode, errorMessage);
  
		  success = false;
		});
	};
  </script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex h-full w-full items-start justify-center px-4 pt-12">
	<form class="flex w-[400px] flex-col space-y-4 rounded-xl p-8 shadow-2xl" on:submit|preventDefault={register}>
		{#if !success && success !== undefined}
		<div class="p-8 text-red-500 bg-red-100">There was an error registering. Please try again.</div>
	  {/if}
		<h3 class="h3 font-bold">Register</h3>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Email</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="email"
					type="text"
					placeholder="Email"
					required
					bind:value={email}
				/>
			</label>
			<label class="label">
				<span>Username</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" title="username" type="text" placeholder="Username" />
			</label>
			<label class="label">
				<span>Password</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="password"
					type="text"
					placeholder="Password"
					required
					bind:value={password}
				/>
			</label>
			<label class="label">
				<span>Confirm password</span>
				<!-- (input here) -->
				<input
					class="input px-2 py-1"
					title="confirmPassword"
					type="text"
					placeholder="Confirm password"
				/>
			</label>
			<div class="text-primary-700 mt-2 text-sm">
				Already have an account, <a href="/auth/log-in" class="underline">log in here!</a>
			</div>
			<button type="submit" class="btn variant-filled mt-5">Register</button>
		</div>
	</form>
</div>

<style>
</style>
