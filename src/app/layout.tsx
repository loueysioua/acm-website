import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "ACM INSAT Student Chapter - Empowering the Next Generation of Innovators",
  description:
    "Join the ACM INSAT Student Chapter - one of the largest computer science organizations dedicated to competitive programming, AI, web development, and cloud computing.",
  keywords: [
    "ACM",
    "INSAT",
    "competitive programming",
    "computer science",
    "AI",
    "web development",
    "cloud computing",
    "student chapter",
  ],
  authors: [{ name: "ACM INSAT Student Chapter" }],
  openGraph: {
    title: "ACM INSAT Student Chapter",
    description: "Empowering the Next Generation of Innovators",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
