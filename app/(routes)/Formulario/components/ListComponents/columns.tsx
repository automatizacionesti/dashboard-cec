"use client";

import { useState } from "react";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
//import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"; // Asegúrate de contar con estos componentes en tu proyecto
import { FormCreateCustomers } from "../FormCreateCustomers/FormCreateCustomers";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase.config";
//import { updateData } from "@/services/firebaseService";

// Definir el tipo de datos de la tabla
interface Material {
  id: string;
  empresa: string;
  fecha: Date;
  material: string;
  precio: string;
}

// Componente para la celda de acciones, ahora recibe una función onEditClick

const ActionCell = ({
  row,
  onEditClick,
}: {
  row: { original: Material };
  onEditClick: (data: Material) => void;
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Estado para abrir/cerrar el diálogo de confirmación

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "precios_materiales", row.original.id));
      setOpenConfirmDialog(false); // Cierra el diálogo después de eliminar
      window.location.reload(); // Recarga la página después de eliminar
    } catch (error) {
      console.error("Error eliminando registro:", error);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Botón de Editar */}
      <Button
        onClick={() => onEditClick(row.original)}
        variant="ghost"
        className="flex justify-center items-center w-8 h-8 p-0 cursor-pointer"
      >
        <Pencil className="w-4 h-4 text-blue-500 fill-current" />
      </Button>

      {/* Botón de Eliminar */}
      <Button
        variant="ghost"
        className="flex justify-center items-center w-8 h-8 p-0 cursor-pointer"
        onClick={() => setOpenConfirmDialog(true)}
      >
        <Trash className="w-4 h-4 text-red-500 fill-current" />
      </Button>

      {/* Diálogo de Confirmación */}
      <Dialog open={openConfirmDialog} onOpenChange={setOpenConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar este registro?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar el material <b>{row.original.material}</b>?</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenConfirmDialog(false)} className="cursor-pointer">Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Función que retorna las columnas de la tabla, pasando la función onEditClick
export const getColumns = (
  onEditClick: (data: Material) => void
): ColumnDef<Material>[] => [
  {
    accessorKey: "material",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Materiales
        <ArrowUpDown className="w-4 h-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: "empresa",
    header: "Empresa",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => {
      const fecha = row.original.fecha;
      return (
        <span>
          {fecha ? new Date(fecha).toLocaleDateString("es-ES") : "Sin fecha"}
        </span>
      );
    },
  },
  {
    accessorKey: "precio",
    header: "Precio",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <ActionCell row={row} onEditClick={onEditClick} />
    ),
  },
];

// Componente principal que renderiza la tabla y gestiona el dialogo de edición
export default function MaterialsTable({ data }: { data: Material[] }) {
  // Estados para controlar la apertura del dialogo y los datos seleccionados para editar
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState<Material | null>(null);

  // Función que se dispara al presionar el botón de editar en la tabla
  const handleEditClick = (data: Material) => {
    setSelectedData(data); // Guardamos los datos a editar
    setOpenDialog(true);   // Abrimos el dialogo
  };

  // Obtenemos las columnas pasando la función de edición
  const columns = getColumns(handleEditClick);

  return (
    <div>
      {/* Aquí iría el componente de tabla, por ejemplo utilizando TanStack Table o similar */}
      {/* Ejemplo: <Table columns={columns} data={data} /> */}

      {/* Dialogo que se abre para editar */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Registro</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedData && (
            <FormCreateCustomers
              initialData={selectedData}
              setOpenModalCreate={setOpenDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
