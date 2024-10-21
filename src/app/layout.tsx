"use client";
import React from "react";
import { Poppins } from "next/font/google";
import "../components/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { ReactQueryProvider } from "@/providers/react-query";
import { ReduxProvider } from "@/providers/redux";

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
        <title>Crms</title>
        <meta name="application-name" content="Crms" />
        <meta name="author" content="kevin Kalisa" />
        <link rel="author" href="https://crms.com" />
        <meta name="generator" content="Crms" />
        <meta name="keywords" content="Crms Web Application" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="dark" />
        <meta name="creator" content="Kevin Kalisa" />
        <meta name="publisher" content="Kevin Kalisa" />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
      </head>
      <body className={poppins.className}>
        <ReduxProvider>
          <ReactQueryProvider>
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
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
