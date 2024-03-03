import type { Item } from "../types";
import { firebaseApp, firebaseAuth, db } from '../lib/firebase';
import { collection, query, where, getDocs, onSnapshot, QuerySnapshot, Query, type DocumentData } from 'firebase/firestore';
import type { PageLoad } from "./$types";
import { fetchItems } from "../service";

export const load: PageLoad = async () => {
    return { items: fetchItems() }
};