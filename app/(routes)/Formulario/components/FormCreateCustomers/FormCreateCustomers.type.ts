import { Dispatch, SetStateAction } from "react"

interface Customer {
    id: string;
    empresa: string;
    fecha: Date | null;
    material: string;
    precio: string;
  }

export type FormCreateCustomersProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
    initialData?: Customer; 
}