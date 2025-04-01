"use client"

//import { useRouter } from "next/navigation"; 
import {  Menu, Search } from "lucide-react"
import { Input } from "../ui/input"
//import { UserAuth } from "@/context/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { SidebarRoutes } from "../SidebarRoutes"
import { ModeToggle } from "../ToggleTheme"
import { UserProfile } from "../UserProfile";



export  function Navbar() {
    // const router = useRouter();
    //  const {  logOut  } = UserAuth();

    //  const handleLogout = async () => {
    //     try {
    //       await logOut();
    //       router.push("/sign-in"); // ✅ Redirige después de cerrar sesión
    //     } catch (error) {
    //       console.error("Error cerrando sesión:", error);
    //     }
    //   };

  return (
    <nav className="flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
        <div className="block xl:hidden">
            <Sheet>
                <SheetTrigger>
                    <Menu/>
                </SheetTrigger>
                <SheetContent side="left" className="">
                   <SidebarRoutes/>
                </SheetContent>
            </Sheet>
        </div>
        <div className="relative w-[300px]">
            <Input placeholder="Search..." className="rounded-lg w-full px-4 py-2 text-sm" />
            <Search strokeWidth={1} className="absolute top-2 right-2" />
        </div>
        <div className="flex gap-x-2 items-center">
            <ModeToggle />
           <div>
            <UserProfile/>
           
           </div>
        </div>
    </nav>
  )
}
