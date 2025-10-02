 

import type { Metadata } from "next";
import { bangers, oswald, raleway } from "../lib/fonts";
import "./globals.css";
import Script from "next/script";
import Navigator from "../components/common/navigator/navigator";
import Footer from "../components/footer/footer";
import ModalProvider from "../components/modals/ModalProvider";

import StagewiseDevToolbar from "../components/StagewiseDevToolbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://themediamasons.com"),
  title: "The Media Masons",
  description:
    "Professional web development and digital solutions for businesses. I build custom websites and web applications that drive growth.",
  openGraph: {
    title: "The Media Masons",
    description:
      "Professional web development and digital solutions for businesses. I build custom websites and web applications that drive growth.",
    url: "https://themediamasons.com",
    siteName: "The Media Masons",
    images: [
      { url: "/opengraph.png", width: 1200, height: 630, alt: "The Media Masons" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Media Masons",
    description:
      "Professional web development and digital solutions for businesses. I build custom websites and web applications that drive growth.",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="root-html" lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L8M6Z41GM3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L8M6Z41GM3');
        `}</Script>
      </head>
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
        {process.env.NODE_ENV === "development" && <StagewiseDevToolbar />}
      </body>
    </html>
  );
}
