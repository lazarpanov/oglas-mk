<script lang="ts">
	import { goto } from '$app/navigation';
  
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase';

	export let formData;
  
	let email: string = 'testtest@testtest.com';
	let password: string = 'testing123';
  
	let success: boolean | undefined = undefined;
	
	const login = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((result) => {
		console.log(result);
        goto('/');
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
	<form class="flex flex-col space-y-4 rounded-xl p-8 shadow-2xl w-[400px]" method="post"
	>
		<h3 class="h3 font-bold">Log in</h3>
		<div class="flex flex-col justify-center gap-4">
			<label class="label" style="padding-top: 10px;">
				<span>Email</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" name="email" type="text" placeholder="Email" required
				bind:value={email}/>
			</label>
			<label class="label">
				<span>Password</span>
				<!-- (input here) -->
				<input class="input px-2 py-1" name="password" type="password" placeholder="Password" required
				bind:value={password}/>
			</label>
			<div class="text-primary-700 mt-2 text-sm">
				If you don't have an account, <a href="/auth/register" class="underline">register here!</a>
			</div>
			<button type="submit" class="btn variant-filled mt-5">Log in!</button>
		</div>
	</form>
</div>

<style>
</style>
