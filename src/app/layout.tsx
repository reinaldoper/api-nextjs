"use client";
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="fixed top-0 left-0 bg-slate-800 shadow-md w-full h-16 text-slate-100 z-10">
          <nav className="flex justify-between items-center h-full w-full px-6">
            <div className="text-lg font-semibold">
              {isLoggedIn ? (
                <a href="/" className="hover:text-blue-600 transition-colors">Logout</a>
              ) : (
                <a href="/register" className="hover:text-blue-600 transition-colors">Register</a>
              )}
            </div>
            <div className="space-x-6 text-lg">
              {isLoggedIn && (
                <>
                  <a href="/sport" className="hover:text-blue-600 transition-colors">Sport</a>
                  <a href="/athlete" className="hover:text-blue-600 transition-colors">Athlete</a>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
