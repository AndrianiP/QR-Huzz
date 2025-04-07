import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "QR Huzz by Andriani",
  keywords: [
    "QR Code Generator",
    "QR Code",
    "Free QR Code",
    "QR Code Maker",
    "QR Code Creator",
    "QR Code Generator Online",
    "QR Code Generator Free",
    "QR Code Generator for Free",
    "QR Huzz",
    "Andriani",
  ],
  authors: [{ name: "Andriani" }],
  creator: "Andriani",
  publisher: "Andriani",
  description:
    "Created by Andriani, QR Huzz is a free QR code generator with no ads that allows you to create custom QR codes for any URL.",
  icons: [{ rel: "icon", url: "/qrcode-logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
