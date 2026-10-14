import AnimatedSection from "@/components/AnimatedSection";
import { CatalogButtonSlot, CATALOG_SLOT_START_ID } from "@/components/TravellingCatalogButton";
import { HERO_SLOGAN, HERO_SUBTITLE } from "@/lib/constants";

export default function Hero() {
  return (
    <AnimatedSection className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {HERO_SLOGAN}
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">{HERO_SUBTITLE}</p>
      <div className="mt-2">
        <CatalogButtonSlot id={CATALOG_SLOT_START_ID} />
      </div>
    </AnimatedSection>
  );
}
