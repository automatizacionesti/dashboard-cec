import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import {Noto_Sans_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const noto = Noto_Sans_Display({subsets: ["latin"]});


export const metadata: Metadata = {
  title: "Tracking Materials | Socya",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      {/* No asignar clases dinámicas al <html> para evitar mismatches */}
      <body className={noto.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}


