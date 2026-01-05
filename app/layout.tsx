import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EXCERPT TECHNOLOGIES PRIVATE LIMITED - Software As A Service Provider | Best Software Solution Provider",
  description: "Welcome to Excerpt Technologies Private Limited. We specialize in Web Design & Development, E-commerce Solutions, Data Analytics, and BI Report Generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon - Excerpt Logo */}
        <link rel="icon" type="image/png" href="/image/excerptwww.png" />
        <link rel="apple-touch-icon" href="/image/excerptwww.png" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/home1/slider/s1.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/home1/slider/s2.webp" />
        <link rel="preload" as="image" href="/images/home1/slider/s3.webp" />
        
        {/* CSS Files */}
        <link rel="stylesheet" href="/css/common.css" />
        <link rel="stylesheet" href="/css/vendor/bootstrap.min.css" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        
        {/* Font Awesome */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
