import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
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
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yi49m6m9ug");
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#000000] text-[#F2F2F2] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}


