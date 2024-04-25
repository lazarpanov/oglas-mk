import type { Item } from "../../../types";
import { firebaseApp, firebaseAuth, db } from '../../../lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot,doc,getDoc } from 'firebase/firestore';
import type { PageLoad } from "../../$types";
import { page, navigating, updated } from '$app/stores';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const itemId = params.itemid;
    return { item: await fetchItemById(itemId) }
};

//const itemId = "usCDKTHKfWKDWwQdRbGR";

const fetchItemById = async (itemId:string) => {
    if (!firebaseAuth.currentUser) {
        console.error('User is not authenticated');
        return null;
    }

    try {
        const docRef = doc(db, 'items', itemId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const itemData = docSnapshot.data() as Item;
            const itemWithId: Item = {
                ...itemData,
                id: docSnapshot.id
            };
            console.log(itemWithId)
            return itemWithId;
        } else {
            console.error('Item not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching item: ', error);
        return null;
    }
};


