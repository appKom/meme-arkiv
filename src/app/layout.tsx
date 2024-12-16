import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ThemeProvider } from "@/components/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Meme Arkiv",
  description: "Arkiv av memes fra memeogvinogklinoggrin2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-slate-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200 `}
      >
        <ReactQueryProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </ReactQueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
