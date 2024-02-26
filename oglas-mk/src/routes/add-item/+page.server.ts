import { db } from '$lib/firebase';
import type { Actions } from '@sveltejs/kit';
import { addDoc, doc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, getMetadata } from 'firebase/storage';
import { url } from 'inspector';

export const actions: Actions = {
	default: async ({ cookies, request, locals }) => {
		const storage = getStorage();

		const formData = await request.formData();

		const title = formData.get('title') as string;
		const price = formData.get('price') as string;
		const desc = formData.get('description') as string;
		const files = formData.getAll('file') as File[];
		const imageUrls: { name: string, url: string }[] = [];
		const createdBy = locals.user.displayName;
		console.log(createdBy);


		// files.forEach(async (file) => {
		// 	const storageRef = ref(storage, file.name);

		// 	await uploadBytes(storageRef, file).then(async (snapshot) => {
		// 		console.log('Uploaded a blob or file!');
		// 		// console.log(snapshot)
		// 		await getDownloadURL(storageRef).then(async (url) => {
		// 			console.log(url);
		// 			imageUrls[url] = true;
		// 		});
		// 	});
		// });
		await Promise.all(files.map(async (file) => {
			const storageRef = ref(storage, file.name);

			const snapshot = await uploadBytes(storageRef, file);
			// console.log('Uploaded a blob or file!');

			const url = await getDownloadURL(storageRef);
			// console.log(url);
			const metadata = await getMetadata(storageRef)
			imageUrls.push({ name: metadata.name, url });
		}));

		// console.log(title, price, desc, imageUrls);
		await addDoc(collection(db, 'items'), {
			title: title,
			price: price,
			description: desc,
			imageUrls: imageUrls,
			createdBy: createdBy
		});
	}
} satisfies Actions;
