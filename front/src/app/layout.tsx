import "./globals.css";
import { Layout } from "@/app/components/Home";

import { GeistSans } from "geist/font/sans";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Layout />
      </body>
    </html>
  );
}
