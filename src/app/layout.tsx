import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-bengali";
import "./globals.css";

export const metadata: Metadata = {
  title: "আনসাং উইমেন নেশন বিল্ডার্স অ্যাওয়ার্ডস",
  description:
    "জাতি গড়ার অচেনা নারী যোদ্ধাদের জানাই আহ্বান — Unsung Women Nation Builders Awards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}