import AnimatedSection from "@/components/AnimatedSection";
import {
  CatalogButtonSlot,
  CATALOG_SLOT_START_ID,
} from "@/components/TravellingCatalogButton";
import { HERO_SLOGAN, HERO_SUBTITLE } from "@/lib/constants";

export default function Hero() {
  return (
    // Ocupa exactamente una pantalla menos el header (61px: py-4 + línea de
    // text-lg + borde) para que la sección siguiente no se asome: hay que
    // scrollear para encontrarla. El pb-8 deja el botón a la misma altura que
    // su posición de viaje (ver CATALOG_BUTTON_BOTTOM_GAP en
    // TravellingCatalogButton).
    <AnimatedSection className="mx-auto flex min-h-[calc(100svh_-_61px)] max-w-4xl flex-col items-center px-4 pt-12 pb-8 text-center sm:px-6 sm:pt-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {HERO_SLOGAN}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{HERO_SUBTITLE}</p>
      </div>
      <CatalogButtonSlot id={CATALOG_SLOT_START_ID} />
    </AnimatedSection>
  );
}
