"use client"

//import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { format, parseISO } from "date-fns";
//import { es } from "date-fns/locale";
import { useForm } from "react-hook-form"
import { saveData, updateData } from "../../../../../services/firebaseService";
import { z } from "zod"

//import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  //FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
//   } from "@/components/ui/popover"
//   import DatePicker from "react-datepicker";
  

import { Input } from "@/components/ui/input"
import { FormCreateCustomersProps } from "./FormCreateCustomers.type"
import {   Check } from "lucide-react"
import { toast } from "sonner";

const formSchema = z.object({
  fecha: z.date({
    required_error: "A date of birth is required.",
  }).nullable(),
  empresa: z.string().min(2).max(50),
  material: z.string().min(2),
  precio: z.string().min(2),

  

})

export  function FormCreateCustomers(props: FormCreateCustomersProps) {
     const { setOpenModalCreate, initialData} = props
     
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fecha: initialData?.fecha ?? null,
          empresa: initialData?.empresa ?? "",
          material: initialData?.material ?? "",
          precio: initialData?.precio ?? "",
        },
      })
     
        const { isValid } = form.formState

      // 2. Define a submit handler.
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          if (initialData?.id) {
            // Si tiene un ID, es una edición
            await updateData(initialData.id, values);
          } else {
            // Si no tiene ID, es un nuevo registro
            await saveData(values);
          }
    
          toast.success("Operación exitosa!", {
            className: "bg-green-200 text-green-900",
            description: "Los datos se guardaron correctamente.",
            duration: 6000,
            icon: <Check className="text-green-700" />,
          });
    
          
          form.reset(); 
          window.location.reload();
          setOpenModalCreate(false);
        } catch (error) {
          console.error("Error al guardar en Firebase:", error);
          toast.error("Error al guardar!");
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Registro</FormLabel>
             
                  <Input
                    placeholder="Selecciona una fecha"
                    type="date"
                    className="w-auto pl-3 text-left text-sm font-normal"
                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""} // Convierte la fecha a formato adecuado para el input
                    onChange={(e) => field.onChange(e.target.value ? parseISO(e.target.value) : null)} // Convierte la fecha seleccionada en Date
                  />



              {/* <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                     {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="center">
                  {/* <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date: Date) => {
                      const currentYear = new Date().getFullYear();
                      const startYear = new Date(currentYear, 0, 1); // 1 de enero del año actual
                      const endYear = new Date(currentYear, 11, 31, 23, 59, 59); // 31 de diciembre del año actual, hasta el último momento
                      return date < startYear || date > endYear;
                    }}
                    locale={es}
                    
                  /> 

                <DatePicker
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          dateFormat="PPP"
                          locale={es}
                          className="w-full p-2 rounded-md"
                        />

                </PopoverContent>
              </Popover> */}



             <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la empresa</FormLabel>
                    <Input placeholder="empresa..." type="text"
                    className="pl-3 text-left text-sm font-normal"
                    {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del material</FormLabel>
                  <Input
                    placeholder="material..."
                    type="text"
                    className="pl-3 text-left text-sm font-normal"
                    {...field}
                    />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del material</FormLabel>
                    <Input placeholder="precio..." type="number"
                    className="pl-3 text-left text-sm font-normal"
                    {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button type="submit" disabled={!isValid} className="cursor-pointer">Guardar</Button>
          </form>
        </Form>
      )
}
