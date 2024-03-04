
import { db } from '$lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot, Query, type DocumentData } from 'firebase/firestore';
import type { Item } from './types';

export const fetchItems = async (searchQuery: string = "") => {
    const colRef = collection(db, 'items');
    let q = query(colRef);
    if (searchQuery !== "") {
        q = query(colRef, where("title_lowercase", ">=", searchQuery.toLowerCase()), where("title_lowercase", "<=", searchQuery.toLowerCase() + "\uf8ff"));
    }
    console.log(q)
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
        //console.log(items);

        // Listen for real-time updates to the Firestore collection
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
    return items;
};
