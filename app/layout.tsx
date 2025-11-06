import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts commented out for build - Vercel will handle Google Fonts correctly
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Contablix | Estudio contable online para emprendedores y e-commerce",
  description: "Impuestos, Monotributo, Responsables Inscriptos y empresas digitales. Contadores expertos en negocios online.",
  keywords: ["contador online", "estudio contable", "monotributo", "responsable inscripto", "ecommerce", "emprendedores digitales", "argentina"],
  openGraph: {
    title: "Contablix | Estudio contable del emprendedor digital",
    description: "Estrategia impositiva y claridad contable para escalar 100% online",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contablix | Estudio contable online",
    description: "Impuestos, Monotributo y empresas digitales",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Contablix",
              description: "Estudio contable online para emprendedores digitales",
              url: "https://contablix.com",
              logo: "https://contablix.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                areaServed: "AR",
                availableLanguage: "Spanish",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
