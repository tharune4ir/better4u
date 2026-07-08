import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LockScreen from "@/components/LockScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://better4u.life"),
  title: "better4u",
  description: "Better-for-you versions of everyday food and drinks, crafted with real ingredients and a lot less sugar.",
  manifest: "/manifest.json",
  openGraph: {
    title: "better4u",
    description: "Better-for-you versions of everyday food and drinks, crafted with real ingredients and a lot less sugar.",
    images: [
      {
        url: "/logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "better4u Logo",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icons/icon-192.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F6F2]">
        <LockScreen>{children}</LockScreen>
      </body>
    </html>
  );
}
