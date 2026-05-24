import { Hero } from "@/components/home/Hero";
import { SparkleBand } from "@/components/home/SparkleBand";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTAClose } from "@/components/home/CTAClose";
import { products } from "@/lib/data";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <Hero variant="gradient" />
      <SparkleBand />
      <ServicesSection />
      <FeaturedProducts items={featured} />
      <CTAClose />
    </>
  );
}
