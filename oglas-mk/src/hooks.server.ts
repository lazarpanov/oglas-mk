// import { goto } from '$app/navigation';
// import { firebaseAuth } from '$lib/firebase';
// import { redirect, type Handle } from '@sveltejs/kit';
// import { onAuthStateChanged } from 'firebase/auth';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const path = event.url.pathname;

// 	const user = await new Promise((resolve) => {
// 		onAuthStateChanged(firebaseAuth, (user) => resolve(user ? user : false));
// 	});

// 	if (user) {
//         console.log("priny",user)
// 		// event.locals.user = 
// 	}

// 	const whitelist = ['/', '/auth/log-in', '/auth/register'];

// 	if (!whitelist.includes(path)) {
// 		throw redirect(303, '/auth/log-in');
// 	}
// 	const response = await resolve(event);
// 	return response;
// };
