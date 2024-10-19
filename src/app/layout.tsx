"use client";
import React from "react";
import { Poppins } from "next/font/google";
import "../components/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Automation" />
        <meta name="author" content="Montech" />
        <link rel="author" href="https://automation.com" />
        <meta name="generator" content="Automation" />
        <meta name="keywords" content="Automation Web Application" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="dark" />
        <meta name="creator" content="Montech Studios" />
        <meta name="publisher" content="Montech Studios" />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
      </head>
      <body className={poppins.className}>
        <NextTopLoader
          color="#f08f1e"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #f08f1e,0 0 5px #f08f1e"
        />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
