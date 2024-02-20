/** @type {import('./$types').LayoutLoad} */

import { firebaseApp, firebaseAuth } from '$lib/firebase';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';

export async function load({ url }) {
 if (browser) {
  try {
   firebaseApp();
  } catch (ex) {
   console.error(ex);
  }
 }
}