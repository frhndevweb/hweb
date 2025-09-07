import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, remove, onValue, off } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACmK4HXW-DQEB-G94-PUFKL60b0xq1pL8",
  authDomain: "hweb-eb26b.firebaseapp.com",
  databaseURL: "https://hweb-eb26b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hweb-eb26b",
  storageBucket: "hweb-eb26b.firebasestorage.app",
  messagingSenderId: "298100139949",
  appId: "1:298100139949:web:6cbc848c9f3b3cb2d26324",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

// Firebase helper functions
export const createData = async (path: string, data: any) => {
  const listRef = ref(database, path);
  const newRef = push(listRef);
  await set(newRef, { ...data, id: newRef.key });
  return newRef.key;
};

export const updateData = async (path: string, id: string, data: any) => {
  const itemRef = ref(database, `${path}/${id}`);
  await set(itemRef, { ...data, id });
};

export const deleteData = async (path: string, id: string) => {
  const itemRef = ref(database, `${path}/${id}`);
  await remove(itemRef);
};

export const subscribeToData = (path: string, callback: (data: any) => void) => {
  const listRef = ref(database, path);
  onValue(listRef, (snapshot) => {
    const data = snapshot.val();
    const items = data ? Object.values(data) : [];
    callback(items);
  });
  return () => off(listRef);
};

// Authentication helpers
export const loginAdmin = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
  return await signOut(auth);
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
