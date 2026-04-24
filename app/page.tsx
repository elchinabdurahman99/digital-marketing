import {
  getHero,
  getFeaturedProjects,
  getServices,
  getTestimonials,
  getStats,
  getPartnerLogos,
} from "@/sanity/lib/queries";
import HomePageClient from "@/components/pages/HomePageClient";

export default async function HomePage() {
  const [hero, services, featuredProjects, testimonials, stats, partnerLogos] =
    await Promise.all([
      getHero(),
      getServices(),
      getFeaturedProjects(),
      getTestimonials(),
      getStats(),
      getPartnerLogos(),
    ]);

  return (
    <HomePageClient
      hero={hero}
      services={services}
      featuredProjects={featuredProjects}
      testimonials={testimonials}
      stats={stats}
      partnerLogos={partnerLogos}
    />
  );
}
