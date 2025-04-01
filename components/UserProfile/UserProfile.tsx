"use client";

import { useState, useEffect } from "react";
import { auth } from "@/services/firebase.config"; // Asegúrate de importar correctamente tu configuración de Firebase
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export function UserProfile() {
  const [user, setUser] = useState<{ name: string; email: string;photo?: string } | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {  logOut  } = useAuth();
  
  const handleLogout = async () => {
     try {
       await logOut();
       router.push("/"); // ✅ Redirige después de cerrar sesión
     } catch (error) {
       console.error("Error cerrando sesión:", error);
     }
   };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Usuario",
          email: currentUser.email || "Sin correo",
          photo: currentUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  
  

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
          {user?.photo ? (
            <Image 
              src={user.photo} 
              alt="Foto de perfil" 
              className="rounded-full"
              width={40}
              height={40}
            />
          ) : (
            "Perfil"
          )}
        </div>


        <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="sm:max-w-md flex flex-col items-center">
    <DialogTitle className="text-center">Información del Usuario</DialogTitle>
    <DialogDescription className="text-center">
      Aquí puedes ver tu información y cerrar sesión.
    </DialogDescription>

    {user ? (
      <div className="mt-4 space-y-4 flex flex-col items-center">
       
        {user.photo && (
          <Image
            src={user.photo}
            alt="Foto de perfil"
            className="rounded-full border-2 border-gray-300 shadow-md"
            width={100}
            height={100}
          />
        )}

      
        <p className="text-lg font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    ) : (
      <p className="text-red-500">No hay usuario autenticado.</p>
    )}

    <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 cursor-pointer" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  </DialogContent>
</Dialog>

    </>
  );
}
