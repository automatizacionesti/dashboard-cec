"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { authProvider } from "@/services/firebase.config";
import { User, AuthContextType } from "./AuthContext.type"; // Asegúrate de importar tu interfaz

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "Sin correo",
          photo: firebaseUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signInWithGoogle = async () => {
    try {
      await authProvider("google");
      router.push("/Dashboard");
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signInGoogle: signInWithGoogle, logOut: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
