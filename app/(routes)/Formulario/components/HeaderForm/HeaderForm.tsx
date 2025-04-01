"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {useState} from 'react'
import { FormCreateCustomers } from "../FormCreateCustomers"

export  function HeaderForm() {
    const [openModalCreate, setOpenModalCreate] = useState(false)

  return (
        <div className="flex justify-between items-center">
        <h2 className="text-2xl">Lista precios materiales</h2>


        <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
        <DialogTrigger asChild>
        <button className="text-white dark:text-black bg-primary px-4 py-2 rounded-md hover:bg-primary/90 cursor-pointer">
          Crear nuevo precio
        </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Crear nuevo precio</DialogTitle>
                <DialogDescription>Agregar un nuevo precio de material</DialogDescription>
            </DialogHeader> 

            <FormCreateCustomers setOpenModalCreate={setOpenModalCreate} />
        </DialogContent>
        </Dialog>
    </div>
  )
}
     
  

