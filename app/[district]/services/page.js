import Services from "@/app/services/page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://globalbiomedicals.in/${district}/services`;

  return {
    title: `Laboratory Equipment Installation, Repair & AMC Services in ${city} | Global Biomedical`,

    description: `Global Biomedical offers laboratory equipment installation, calibration, repair, annual maintenance (AMC), preventive maintenance, and technical support services in ${city}. Trusted by hospitals, pathology labs, diagnostic centres, medical colleges, and research laboratories.`,

    keywords: [
      `Laboratory Equipment Services ${city}`,
      `Laboratory Equipment Installation ${city}`,
      `Laboratory Equipment Repair ${city}`,
      `Laboratory Equipment Calibration ${city}`,
      `Laboratory Equipment AMC ${city}`,
      `Biomedical Equipment Services ${city}`,
      `Biomedical Equipment Supplier ${city}`,
      `Medical Equipment Repair ${city}`,
      `Diagnostic Equipment Installation ${city}`,
      `Hospital Equipment Maintenance ${city}`,
      `Pathology Lab Equipment Service ${city}`,
      `Biomedical Engineer ${city}`,
      `Medical Equipment Service ${city}`,
      `Healthcare Equipment Service ${city}`,
      `Annual Maintenance Contract ${city}`,
      `Laboratory Equipment Supplier ${city}`,
      `Global Biomedical ${city}`,
      "Global Biomedical Services",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Laboratory Equipment Installation, Repair & AMC Services in ${city} | Global Biomedical`,
      description:
        `Professional installation, repair, calibration, AMC, and maintenance services for laboratory and biomedical equipment in ${city}.`,
      url,
      siteName: "Global Biomedical",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "https://globalbiomedicals.in/og-image.jpg", // Replace with your actual OG image
          width: 1200,
          height: 630,
          alt: `Laboratory Equipment Services in ${city}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Laboratory Equipment Services in ${city}`,
      description:
        `Expert laboratory equipment installation, maintenance, calibration, and repair services in ${city}.`,
      images: ["https://globalbiomedicals.in/og-image.jpg"], // Replace with your actual image
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export default async function DistrictServicesPage({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <Services city={city} />;
}