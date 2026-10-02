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
  description: "See how visible your business is to buyers in Google and AI search. Answer 17 quick questions and get your score in about 3 minutes.",
  keywords: "SEO, AI search, B2B SEO, website audit, SEO assessment, SEO scorecard",
  authors: [{ name: "Black And White Boy" }],
  openGraph: {
    title: "SEO Scorecard | Are Buyers Finding Your Competitors Instead of You?",
    description: "Take our free 3-minute assessment and see where your enquiries are leaking.",
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
