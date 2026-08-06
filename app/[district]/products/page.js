import ProductsPage from "@/app/components/ProductsPage";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://globalbiomedicals.in/${district}/products`;

  return {
    title: `Laboratory Equipment, Biomedical Products & Medical Devices in ${city} | Global Biomedical`,

    description:
      `Explore Global Biomedical's complete range of laboratory equipment, biomedical instruments, electrolyte analyzers, blood gas analyzers, laboratory reagents, diagnostic instruments, medical devices, pathology lab equipment, and hospital equipment in ${city}.`,

    keywords: [
      `Laboratory Equipment ${city}`,
      `Biomedical Equipment ${city}`,
      `Biomedical Products ${city}`,
      `Medical Equipment ${city}`,
      `Diagnostic Equipment ${city}`,
      `Diagnostic Instruments ${city}`,
      `Hospital Equipment ${city}`,
      `Laboratory Instruments ${city}`,
      `Laboratory Reagents ${city}`,
      `Electrolyte Analyzer ${city}`,
      `Electrolyte Reagent ${city}`,
      `Blood Gas Analyzer ${city}`,
      `Pathology Lab Equipment ${city}`,
      `Clinical Laboratory Equipment ${city}`,
      `Medical Devices ${city}`,
      `Healthcare Equipment ${city}`,
      `Lab Equipment Supplier ${city}`,
      `Biomedical Equipment Supplier ${city}`,
      `Global Biomedical ${city}`,
      `Global Biomedical Products`,
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Laboratory Equipment & Biomedical Products in ${city} | Global Biomedical`,
      description:
        `Browse premium laboratory equipment, analyzers, reagents, biomedical instruments, and hospital equipment in ${city}.`,
      url,
      siteName: "Global Biomedical",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Global Biomedical Products ${city}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Biomedical Products in ${city} | Global Biomedical`,
      description:
        `Premium laboratory equipment and biomedical products supplier in ${city}.`,
      images: ["/og-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },

    category: "Healthcare",
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} />;
}