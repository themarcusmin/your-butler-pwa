import {
  VITE_API_FIREBASE_APIKEY,
  VITE_API_FIREBASE_APP_ID,
  VITE_API_FIREBASE_AUTH_DOMAIN,
  VITE_API_FIREBASE_MESSAGING_SENDER_ID,
  VITE_API_FIREBASE_PROJECT_ID,
  VITE_API_FIREBASE_STORAGE_BUCKET
} from "@/config/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: VITE_API_FIREBASE_APIKEY,
  authDomain: VITE_API_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_API_FIREBASE_PROJECT_ID,
  storageBucket: VITE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_API_FIREBASE_APP_ID
}

export const firebaseApp = initializeApp(firebaseConfig)

import { GoogleAuthProvider } from "firebase/auth"

export const googleAuthProvider = new GoogleAuthProvider()
