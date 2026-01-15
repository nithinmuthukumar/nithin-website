import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nithin Muthukumar - Magic: The Gathering Blog",
  description: "Magic: The Gathering blog featuring deck techs, meta analysis, and brewing insights",
  openGraph: {
    title: "Nithin Muthukumar - Magic: The Gathering Blog",
    description: "Magic: The Gathering blog featuring deck techs, meta analysis, and brewing insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Navigation />
        {children}
        <footer className="border-t border-border mt-auto py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nithin Muthukumar. All rights reserved.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
