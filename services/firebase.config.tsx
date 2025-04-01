// firebase.config.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase desde .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// firebaseService.ts
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Exportar función para iniciar sesión con Google

export const authProvider = async (provider: string) => {
 
    const providerSelected = 
    provider === "google" ? googleProvider : facebookProvider;

    try {
        const result = await signInWithPopup(auth, providerSelected);
        console.log(result.user);
    } catch (error) {
        console.error("Error iniciando sesión con Google:", error);
    }
};



