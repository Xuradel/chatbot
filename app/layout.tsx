import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./Providers";
import Navbar from "./components/navbar/Navbar";
import { DarkModeProvider } from "./hooks/DarkModeProvider";
import Chat from "./components/chat/Chat";

export const metadata: Metadata = {
  title: "Smart Tek",
  description: "¡Somos los primeros en brindarte lo mejor de tecnología!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DarkModeProvider>
            <Navbar />
            <Chat />
            {children}
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
