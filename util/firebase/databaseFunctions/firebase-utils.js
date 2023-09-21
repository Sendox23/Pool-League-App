import { get, ref, set, update } from 'firebase/database';
import { database } from '../firebase';

export const buildRef = (path) => ref(database, path);
export const fetchData = async (dbRef) => (await get(dbRef)).val() || null;
export const writeData = async (dbRef, data) => set(dbRef, data);
export const updateData = async (dbRef, data) => update(dbRef, data);