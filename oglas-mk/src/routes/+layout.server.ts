/** @type {import('./$types').LayoutLoad} */

import { firebaseApp, firebaseAuth } from '$lib/firebase';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';
import type { Actions } from '@sveltejs/kit';

export async function load({ url, locals }) {
 if (browser) {
  try {
   firebaseApp();
  } catch (ex) {
   console.error(ex);
  }
 }
 return {user : locals.user}
}