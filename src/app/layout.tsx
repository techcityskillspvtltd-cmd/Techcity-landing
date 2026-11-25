import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PartnerDialog } from "@/components/partner-dialog";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${site.name} | ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "education",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
  other: {
    "contact:email": site.email,
    "contact:phone_number": site.phone,
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}${site.logo}`,
      slogan: site.tagline,
      description: site.longDescription,
      email: site.email,
      telephone: site.phoneE164,
      founder: site.founders.map((name) => ({ "@type": "Person", name })),
      areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email: site.email,
        telephone: site.phoneE164,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      sameAs: site.products.map((p) => p.url),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <PartnerDialog />
      </body>
    </html>
  );
}
