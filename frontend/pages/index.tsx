import Head from "next/head";
import {
  Navbar,
  HeroSection,
  WelcomeSection,
  BakeSaleSection,
  ApparelSaleSection,
  FaqSection,
  ParishLifeSection,
  CalendarSection,
  WhoWeAreSection,
  SampleSermonSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>St. John the Divine Orthodox Church | Wheeling, WV</title>
        <meta
          name="description"
          content="St. John the Divine Greek Orthodox Church in Wheeling, WV. Join our welcoming community for Divine Liturgy, fellowship, and Orthodox Christian worship. All are welcome."
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="St. John the Divine Orthodox Church" />
        <meta
          property="og:description"
          content="St. John the Divine Greek Orthodox Church in Wheeling, WV. Join our welcoming community for Divine Liturgy, fellowship, and Orthodox Christian worship."
        />
        <meta property="og:url" content="https://stjohngochurch.org" />
        <meta property="og:image" content="https://stjohngochurch.org/images/welcome_img.webp" />
        <meta property="og:site_name" content="St. John the Divine Orthodox Church" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="St. John the Divine Orthodox Church" />
        <meta
          name="twitter:description"
          content="St. John the Divine Greek Orthodox Church in Wheeling, WV. Join our welcoming community for Divine Liturgy, fellowship, and Orthodox Christian worship."
        />
        <meta name="twitter:image" content="https://stjohngochurch.org/images/welcome_img.webp" />

        {/* Canonical */}
        <link rel="canonical" href="https://stjohngochurch.org" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="US-WV" />
        <meta name="geo.placename" content="Wheeling" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "St. John the Divine Greek Orthodox Church",
              description:
                "Greek Orthodox Church serving the Wheeling, WV community with Divine Liturgy, fellowship, and Orthodox Christian worship.",
              url: "https://stjohngochurch.org",
              telephone: "+1-304-233-0757",
              email: "secretary@stjohngochurch.org",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2215 Chapline St",
                addressLocality: "Wheeling",
                addressRegion: "WV",
                postalCode: "26003",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.0639,
                longitude: -80.7209,
              },
              sameAs: [
                "https://www.facebook.com/SaintJohnWheeling",
                "https://www.instagram.com/stjohnthedivinegoc/",
              ],
              image: "https://stjohngochurch.org/images/welcome_img.webp",
            }),
          }}
        />
      </Head>
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <BakeSaleSection />
      <ApparelSaleSection />
      <FaqSection />
      <ParishLifeSection />
      <CalendarSection />
      <WhoWeAreSection />
      <SampleSermonSection />
      <Footer />
    </>
  );
}
