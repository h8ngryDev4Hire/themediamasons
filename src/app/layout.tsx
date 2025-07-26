'use client'

import type { Metadata } from "next";
import { bangers, oswald, raleway } from "../lib/fonts";
import "./globals.css";
import dynamic from "next/dynamic";
import Navigator from "../components/common/navigator/navigator";
import Footer from "../components/footer/footer";
import ModalProvider from "../components/modals/ModalProvider";

// Import Stagewise Toolbar dynamically to avoid SSR issues
const StagewiseToolbar = dynamic(
  () => import("@stagewise/toolbar-next").then((mod) => mod.StagewiseToolbar),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="root-html" lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        id="root-body"
        className={`${bangers.className} ${oswald.className} ${raleway.className} antialiased bg-black text-white min-h-screen flex flex-col`}
      >
        <Navigator floating={true} />
        
        <main id="page-content" className="flex-grow relative z-10">
          {children}
        </main>
        
        <Footer />
        
        {/* Modal system */}
        <div id="modal-system">
          <ModalProvider />
        </div>
        
        {/* Stagewise Toolbar - only loads in development */}
        {process.env.NODE_ENV === "development" && (
          <div id="stagewise-toolbar">
            <StagewiseToolbar 
              config={{
                plugins: [],
              }}
            />
          </div>
        )}
      </body>
    </html>
  );
}
