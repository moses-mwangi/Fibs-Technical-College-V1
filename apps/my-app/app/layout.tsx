import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";

declare module "*.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIBS Technical College - Admin Dashboard",
  description: "Multi-branch college management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
