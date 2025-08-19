// Firebase initialization and auth helpers
// Uses your provided Firebase project values

import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getFirestore, addDoc, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBbD9E4SM3hfKYXdA2azdFoYIX9VD8KzBk',
  authDomain: 'netflix-website-2641b.firebaseapp.com',
  projectId: 'netflix-website-2641b',
  storageBucket: 'netflix-website-2641b.firebasestorage.app',
  messagingSenderId: '791004418310',
  appId: '1:791004418310:web:cd556273b375a8e6688e87'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export async function signup(name, email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const user = credential.user
  if (name) {
    await updateProfile(user, { displayName: name })
  }
  try {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: name || '',
      email,
      authProvider: 'local'
    })
  } catch {}
  return user
}

export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function logout() {
  await signOut(auth)
}