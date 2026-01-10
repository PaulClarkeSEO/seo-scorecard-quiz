import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SEO Scorecard Quiz | Black And White Boy",
  description: "Discover how well your business is optimised for local search. Answer 22 quick questions and get a personalised SEO report with actionable insights.",
  keywords: "SEO, local SEO, Google My Business, website audit, SEO assessment, SEO quiz",
  authors: [{ name: "Black And White Boy" }],
  openGraph: {
    title: "SEO Scorecard Quiz | Are You Ready To Dominate Local Search?",
    description: "Take our free 5-minute SEO assessment and discover how to improve your local search rankings.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
