import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RulloLabs | AI & SaaS Factory",
  description: "Next Generation AI solutions and automated SaaS platforms by RulloLabs.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen selection:bg-purple-500/20`}>
        {children}
      </body>
    </html>
  );
}
