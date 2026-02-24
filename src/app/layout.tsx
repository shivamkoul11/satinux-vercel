import type { Metadata, Viewport } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";

const encodeSans = Encode_Sans({
  variable: "--font-encode-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HomeLayout – JioAICloud Prototype",
  description: "Interactive mobile prototype for the JioAICloud Home screen",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0e0503",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${encodeSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
