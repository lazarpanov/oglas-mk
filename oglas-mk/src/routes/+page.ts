import type { Item } from "../types";
import { firebaseApp, firebaseAuth, db } from '../lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    return { items: await fetchItems() }
};

const fetchItems = async () => {
    const colRef = collection(db, 'items');
    const q = query(colRef);
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
            console.log(itemWithId.id)
            items.push(itemWithId);
        });

        // Log items
        console.log(items);

        // Listen for real-time updates to the Firestore collection
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
    return items;
};

