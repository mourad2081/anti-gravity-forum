import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pentixapharm // Anti-Gravity & Advanced Propulsion",
  description: "Enterprise-grade research forum for theoretical anti-gravity, metrics, and biotech-integrated propulsion systems.",
  openGraph: {
    title: "Pentixapharm // Anti-Gravity Forum",
    description: "Theoretical propulsion research and verification nexus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Enterprise SEO: JSON-LD for Organization and Discussion Forum */}
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pentixapharm Advanced Propulsion Labs",
            "alternateName": "Pentixapharm Division X",
            "url": "https://antigravity.pentixapharm.com",
            "logo": "https://antigravity.pentixapharm.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-GRAVITY",
              "contactType": "research support"
            }
          })}
        </Script>
      </body>
    </html>
  );
}
