import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SapAin | Master the Art of AI Image & Video Generation",
  description: "Learn how to direct AI like a professional creator and transform ideas into stunning visuals and videos. Join the 2-day live masterclass by SapAin.",
  keywords: ["AI Image Generation", "AI Video Generation", "Midjourney", "Runway Gen-3", "Prompt Engineering", "Luma Dream Machine", "SapAin Masterclass"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${cormorantGaramond.variable} antialiased bg-[#000000] text-[#F2F2F2]`}
      >
        {children}
      </body>
    </html>
  );
}

