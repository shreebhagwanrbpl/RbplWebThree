import About from "@/app/about/page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://globalbiomedicals.in/${district}/about`;

  return {
    title: `About Global Biomedical | Laboratory Equipment & Biomedical Equipment Supplier in ${city}`,

    description:
      `Global Biomedical is a leading supplier of laboratory equipment, biomedical instruments, diagnostic analyzers, laboratory consumables, hospital equipment, and healthcare solutions in ${city}. Learn about our expertise, quality products, and trusted support.`,

    keywords: [
      `Global Biomedical ${city}`,
      `About Global Biomedical`,
      `Laboratory Equipment Supplier ${city}`,
      `Biomedical Equipment Supplier ${city}`,
      `Medical Equipment Supplier ${city}`,
      `Diagnostic Equipment Supplier ${city}`,
      `Hospital Equipment Supplier ${city}`,
      `Laboratory Instruments ${city}`,
      `Diagnostic Lab Equipment ${city}`,
      `Laboratory Products ${city}`,
      `Biomedical Company ${city}`,
      `Medical Devices ${city}`,
      `Healthcare Equipment ${city}`,
      `Pathology Lab Equipment ${city}`,
      `Clinical Laboratory Equipment ${city}`,
      `Medical Analyzer Supplier ${city}`,
      `Hospital Laboratory Equipment ${city}`,
      `Biomedical Company India`,
      `Laboratory Equipment India`,
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `About Global Biomedical | Laboratory Equipment Supplier in ${city}`,
      description:
        `Trusted supplier of laboratory equipment, biomedical instruments, and diagnostic analyzers in ${city}.`,
      url,
      siteName: "Global Biomedical",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Global Biomedical ${city}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `About Global Biomedical | ${city}`,
      description:
        `Trusted laboratory equipment and biomedical equipment supplier in ${city}.`,
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

  return <About city={city} />;
}