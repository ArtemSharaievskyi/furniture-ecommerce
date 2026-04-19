import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const headingFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
