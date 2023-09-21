import { get, ref, set, update, remove } from "firebase/database";
import { database } from "../firebase";

export const buildRef = (path) => ref(database, path);
export const fetchData = async (dbRef) => (await get(dbRef)).val() || null;
export const writeData = async (dbRef, data) => set(dbRef, data);
export const updateData = async (dbRef, data) => update(dbRef, data);
export const deleteData = async (dbRef) => {
  await remove(dbRef);
};
