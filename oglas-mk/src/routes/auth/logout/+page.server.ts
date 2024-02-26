import { redirect } from '@sveltejs/kit';
import { getAuth, signOut } from "firebase/auth";
import type { Actions, PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {};
export const actions: Actions = {
	default: async ({ cookies, locals }) => {
        // console.log("test")
		const token = cookies.get('bearerToken');
		if (!token) {
			console.log('Nobody is logged in!');
			redirect(303, '/');
		}
		cookies.delete('bearerToken', { path: '/' });
        locals.user = null;
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("uspeshno")
          }).catch((error) => {
            // An error happened.
            console.log("neuspeshno")
          });
        // console.log(locals.user)
		redirect(303, '/auth/log-in');
	}
} satisfies Actions;
