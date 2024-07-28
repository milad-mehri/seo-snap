import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SEO Snap",
  description: "Test your website for free now!",
  keywords: ["SEO", "360 Photo", "Panorama", "World Map"],
  openGraph: {
    images: '/image.png',
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-STVE6GRH4C"
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-STVE6GRH4C');`}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
