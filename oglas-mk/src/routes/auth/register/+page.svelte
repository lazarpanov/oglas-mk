<script lang='ts'>
import { AppBar } from '@skeletonlabs/skeleton';
</script>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <div class="w-full h-full flex items-center justify-center">
        
        <form class="flex flex-col gap-4 p-8 space-y-4 shadow-2xl">
            <h3 class="h3">Register H3</h3>
            <div class="flex flex-col gap-4 justify-center">

                <label class="label" style="padding-top: 10px;">
                    <span>Email</span>
                    <!-- (input here) -->
                    <input class="input px-2" title="email" type="text" placeholder="Email"/>
                </label>
            <label class="label">
                <span>Username</span>
                <!-- (input here) -->
                <input class="input px-2" title="username" type="text" placeholder="Username" />
            </label>
            <label class="label">
                <span>Password</span>
                <!-- (input here) -->
                <input class="input px-2" title="password" type="text" placeholder="Password" />
            </label>
            <label class="label">
                <span>Confirm password</span>
                <!-- (input here) -->
                <input class="input px-2" title="confirmPassword" type="text" placeholder="Repeat password" />
            </label>
            <button type="button" class="btn variant-filled">Button</button>
        </div>
    </form>
    </div>
<style>

</style>