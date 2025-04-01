"use client"

import { Separator } from "../ui/separator";
import { SidebarItem } from "../SidebarItem";
import { dataGeneralSidebar, dataSupportSidebar, dataToolSidebar } from "./SidebarRoutes.data";

export  function SidebarRoutes() {
  return (
    <div className="flex flex-col justify-between h-full">
        <div className="">
            <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">GENERAL</p>
                {dataGeneralSidebar.map((item)=>(
                    <SidebarItem key={item.label} item={item} />
                ))}
            </div>
            <Separator/>
            <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">TOOLS</p>
                   {dataToolSidebar.map((item)=>(
                    <SidebarItem key={item.label} item={item} />
                   ))}
            </div>
            <Separator/>
            <div className="p-2 md:p-6">
                <p className="text-slate-500 mb-2">SOPORTE</p>
                   {dataSupportSidebar.map((item)=>(
                    <SidebarItem key={item.label} item={item} />
                   ))}
            </div>
    
        </div>
        <div className="text-center p-6">
            <Separator/>
                   <footer className="mt-3 p-3 text-center">
                        &copy; 2025 Tracking Materials. All rights reserved.💚
                   </footer>
        </div>

    </div>
  )
}
