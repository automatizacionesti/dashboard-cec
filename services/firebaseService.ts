import { db } from "./firebase.config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"; // Agregado getDoc para validar

// Guardar un nuevo documento
export const saveData = async (data: any) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Los datos no pueden estar vacíos");
    }

    const docRef = await addDoc(collection(db, "precios_materiales"), data);
    console.log("Documento guardado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error guardando documento:", error);
    throw new Error("No se pudo guardar el documento");
  }
};

// Actualizar un documento existente
export const updateData = async (id: string, updatedData: any) => {
  try {
    if (!id) throw new Error("Se requiere un ID válido");
    if (!updatedData || Object.keys(updatedData).length === 0) {
      throw new Error("Los datos a actualizar no pueden estar vacíos");
    }

    const docRef = doc(db, "precios_materiales", id);
    
    // Verificar si el documento existe antes de actualizar
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("El documento no existe");
    }

    await updateDoc(docRef, updatedData);
    console.log(`Documento con ID ${id} actualizado correctamente`);
  } catch (error) {
    console.error("Error actualizando documento:", error);
    throw new Error("No se pudo actualizar el documento");
  }
};
