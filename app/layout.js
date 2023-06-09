"use client";
import Navbar from "./components/navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AuthContextProvider from "../auth-context";
import "./prism.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthContextProvider>
          <div className="min-h-screen flex ">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
