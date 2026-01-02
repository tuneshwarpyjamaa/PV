import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Views - Insights on Indian Politics by Amish B Harsoor",
  description: "Personal blog featuring in-depth analysis and commentary on Indian politics, technology, governance, and policy by Amish B Harsoor.",
  keywords: ["Indian Politics", "Political Analysis", "Governance", "Policy", "Technology", "Amish B Harsoor"],
  authors: [{ name: "Amish B Harsoor" }],
  openGraph: {
    title: "Views by Amish B Harsoor",
    description: "Insights and analysis on Indian politics, technology, and governance",
    siteName: "Views",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Views by Amish B Harsoor",
    description: "Insights and analysis on Indian politics, technology, and governance",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
