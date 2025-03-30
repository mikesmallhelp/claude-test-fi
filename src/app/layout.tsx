import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/lib/FormContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lomakesovellus",
  description: "Monivaiheinen lomakesovellus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FormProvider>
          <div className="container mx-auto max-w-2xl py-6 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Lomakesovellus</h1>
            {children}
          </div>
        </FormProvider>
      </body>
    </html>
  );
}
