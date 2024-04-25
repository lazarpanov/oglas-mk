import { goto } from '$app/navigation';
import { firebaseAuth } from '$lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot, Query, type DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { redirect, type Handle } from '@sveltejs/kit';
import { onAuthStateChanged } from 'firebase/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;

	const user = await new Promise((resolve) => {
		onAuthStateChanged(firebaseAuth, (user) => resolve(user ? user : false));
	});

	if (user) {
		// console.log("priny", user.displayName)
		event.locals.user = { displayName: user.displayName, email: user.email, uid: user.uid }
		// console.log(event.locals.user)
	}

	const whitelist = ['/', '/auth/log-in', '/auth/register'];
	if (!whitelist.includes(path) && !user) {
		throw redirect(303, '/auth/log-in');
	}


	const response = await resolve(event);
	return response;

};
