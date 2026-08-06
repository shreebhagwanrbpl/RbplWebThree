import Contact from "@/app/contact/page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const district = resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://globalbiomedicals.in/${district}/contact`;

  return {
    title: `Contact Global Biomedical | Laboratory & Biomedical Equipment Supplier in ${city}`,

    description:
      `Contact Global Biomedical in ${city} for laboratory equipment, biomedical instruments, diagnostic analyzers, medical devices, installation, calibration, AMC, repair, maintenance, and technical support. Serving hospitals, pathology labs, diagnostic centres, research institutes, and healthcare professionals.`,

    keywords: [
      `Contact Global Biomedical ${city}`,
      `Global Biomedical ${city}`,
      `Laboratory Equipment Supplier ${city}`,
      `Biomedical Equipment Supplier ${city}`,
      `Medical Equipment Supplier ${city}`,
      `Diagnostic Equipment Supplier ${city}`,
      `Hospital Equipment Supplier ${city}`,
      `Laboratory Equipment Dealer ${city}`,
      `Medical Devices ${city}`,
      `Laboratory Instruments ${city}`,
      `Diagnostic Lab Equipment ${city}`,
      `Biomedical Products ${city}`,
      `Biomedical Equipment Service ${city}`,
      `Laboratory Equipment AMC ${city}`,
      `Laboratory Equipment Repair ${city}`,
      `Laboratory Equipment Installation ${city}`,
      `Laboratory Equipment Calibration ${city}`,
      `Healthcare Equipment ${city}`,
      `Clinical Laboratory Equipment ${city}`,
      "Global Biomedical Contact",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `Contact Global Biomedical | Laboratory Equipment Supplier in ${city}`,
      description:
        `Get in touch with Global Biomedical for laboratory equipment, diagnostic instruments, installation, calibration, maintenance, and technical support in ${city}.`,
      url,
      siteName: "Global Biomedical",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Contact Global Biomedical ${city}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Contact Global Biomedical | ${city}`,
      description:
        `Contact Global Biomedical for laboratory and biomedical equipment solutions in ${city}.`,
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

  return <Contact city={city} />;
}