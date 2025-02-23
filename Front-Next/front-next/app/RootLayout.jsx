"use client";

import { AuthProvider } from "@/context/Authcontext";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Help from "@/components/Help/Help";
import "@/app/globals.css";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  const isAuthOrManagement =
    pathname.startsWith("/login") ||
    pathname.startsWith("/Login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgetPassword") ||
    pathname.startsWith("/resetPassword") ||
    pathname.startsWith("/RegisterValidate") ||
    pathname.startsWith("/ResetValidate") ||
    pathname.startsWith("/management");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {!isAuthOrManagement && <Navbar />}

            <main className="flex-1 container mx-auto p-6">{children}</main>

            {!isAuthOrManagement && <Help />}
            {!isAuthOrManagement && (
              <div className="flex flex-col main-color">
                <Footer />
              </div>
            )}

            <Toaster />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
