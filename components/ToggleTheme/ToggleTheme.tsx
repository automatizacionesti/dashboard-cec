"use client"

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setDarkMode((prev) => !prev)}
      className="relative w-10 h-10 flex items-center justify-center"
    >
      {darkMode ? (
        <Sun className="h-5 w-5 transition-all text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 transition-all text-blue-900 fill-current" />
      )}
    </Button>
  );
}


// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
