import AnimatedSection from "@/components/AnimatedSection";
import GlowButton from "@/components/GlowButton";
import { CatalogButtonSlot, CATALOG_SLOT_END_ID } from "@/components/TravellingCatalogButton";

export default function FinalCta() {
  return (
    <AnimatedSection className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      {/* Acá estaciona el botón viajero de "Ver catálogo". */}
      <CatalogButtonSlot id={CATALOG_SLOT_END_ID} />
      <p className="mt-8 text-muted-foreground">
        ¿No ves lo que necesitás? Lo armamos a tu medida.
      </p>
      <div className="mt-4">
        <GlowButton href="/personalizado" size="md">
          Pedí algo a tu medida
        </GlowButton>
      </div>
    </AnimatedSection>
  );
}
