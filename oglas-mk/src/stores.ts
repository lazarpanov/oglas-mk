import { writable } from "svelte/store";
import type { Item } from "./types";

const initialItems : Item[] = [];
export const itemsStore = writable(initialItems);