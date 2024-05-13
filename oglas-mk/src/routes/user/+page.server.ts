import type { Item } from "../../types";
import { firebaseApp, firebaseAuth, db } from '../../lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import type { PageLoad } from "../$types";
import { page, navigating, updated } from '$app/stores';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { items: await fetchItems() }
};
const fetchItems = async () => {
    if (!firebaseAuth.currentUser) {
        console.error('User is not authenticated');
        return [];
    }
    const currentUserUid = firebaseAuth.currentUser.uid;
   // console.log(firebaseAuth.currentUser.displayName)
    const colRef = collection(db, 'items');
    const q = query(colRef, where("createdBy", "==", firebaseAuth.currentUser.displayName));
    let items: Item[] = [];
    try {
        // Fetch initial data from the Firestore collection
        const querySnapshot = await getDocs(q);

        // Iterate over the documents and populate the items array
        querySnapshot.forEach((doc) => {
            // Assuming each document has the structure of an Item
            const itemData = doc.data() as Item;
            const itemWithId: Item = {
                ...itemData,
                id: doc.id
            }
           // console.log(itemWithId.id)
            items.push(itemWithId);
        });

        // Log items
        //console.log(items);

        // Listen for real-time updates to the Firestore collection
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
    //console.log(items)
    return items;
};

