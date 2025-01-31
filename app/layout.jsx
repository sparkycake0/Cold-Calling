import { Inter } from "next/font/google";
import "./globals.css";
const geistMono = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cold Calling",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} bg-neutral-900`}>{children}</body>
    </html>
  );
}
