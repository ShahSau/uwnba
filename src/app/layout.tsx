import type { Metadata } from "next";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "@fontsource-variable/noto-sans-bengali";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unsung Women Nation Builders Awards",
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