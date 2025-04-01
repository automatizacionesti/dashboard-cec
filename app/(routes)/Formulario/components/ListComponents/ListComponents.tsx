"use client";

import { useEffect, useState } from "react";
import { db } from "@/services/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FormCreateCustomers } from "../FormCreateCustomers/FormCreateCustomers"; // Ajusta la ruta según corresponda

interface Material {
  id: string;
  empresa: string;
  fecha: Date;
  material: string;
  precio: string;
}

export function ListComponents() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "precios_materiales"));
        const materialsData: Material[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          empresa: doc.data().empresa || "Desconocido",
          fecha: doc.data().fecha?.toDate() || new Date(),
          material: doc.data().material || "No especificado",
          precio: doc.data().precio || "0",
        }));
        setMaterials(materialsData);
      } catch (error) {
        console.error("Error obteniendo materiales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Función que se ejecuta al hacer clic en el botón de editar
  const handleEditClick = (data: Material) => {
    console.log("Editar registro:", data);
    setSelectedMaterial(data);
    setOpenDialog(true);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <>
      <DataTable columns={getColumns(handleEditClick)} data={materials} />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Material</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedMaterial && (
            <FormCreateCustomers
              initialData={selectedMaterial}
              setOpenModalCreate={setOpenDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
