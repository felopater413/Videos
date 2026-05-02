import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: "Felopater Studio | Video Production",
  description:
    "فيلوباتير نادي رمسيس - استوديو مونتاج وإنتاج بصري احترافي لصناع المحتوى والشركات.",
  openGraph: {
    title: "Felopater Studio | Video Production",
    description: "استوديو مونتاج احترافي لخدمات يوتيوب، شورتس، إعلانات، وتصحيح ألوان.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
