"use client"
import React from 'react'

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table'

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

 } from '@/components/ui/table'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>){
    const [ sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state:{
            sorting,
            columnFilters,
        }
    })

    if(!isMounted){
        return null
    }
    return (
        <div className="p-4 mt-4 rounded-lg shadow-md bg-background">
            <div className='flex items-center mb-2'>
                <Input 
                placeholder='filtro de materiales...'
                value={(table.getColumn('material')?.getFilterValue() as string)??''}
                onChange={(e) => table.getColumn('material')?.setFilterValue(e.target.value)}
                />
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>   
                                    )  
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ?(
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() &&'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ): (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No hay resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button variant="outline" size="sm" onClick={()=> table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={()=> table.nextPage()} disabled={!table.getCanNextPage()}>
                    Despues
                </Button>
            </div>
        </div>
    )
}
