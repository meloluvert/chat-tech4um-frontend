import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/AuthContext";
import {ChatProvider} from "@/contexts/ChatContext"
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech4um",
  description: "Onde a tecnologia...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
      <ThemeProvider >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="max-w-7xl mx-auto p-6 flex flex-col items-center justify-center">
        <ToastContainer position="top-right" autoClose={3000} />

  

          <Header/>
          <ChatProvider>
          {children}
          </ChatProvider>
        </div>
      </body>
      </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
