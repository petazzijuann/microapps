import AnimatedSection from "@/components/AnimatedSection";
import RainbowButton from "@/components/RainbowButton";

export default function FinalCta() {
  return (
    <AnimatedSection className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <RainbowButton href="/catalogo" size="lg">
        Ver catálogo
      </RainbowButton>
      <p className="mt-8 text-muted-foreground">
        ¿No ves lo que necesitás? Lo armamos a tu medida.
      </p>
      <div className="mt-4">
        <RainbowButton href="/personalizado" size="md">
          Pedí algo a tu medida
        </RainbowButton>
      </div>
    </AnimatedSection>
  );
}
