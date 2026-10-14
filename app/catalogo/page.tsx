import type { Metadata } from "next";
import DemoCard from "@/components/DemoCard";
import GlowButton from "@/components/GlowButton";
import { DEMOS } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Catálogo de demos",
  description: "Elegí la demo más parecida a lo que necesitás y la ajustamos a tu negocio.",
};

export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Catálogo de demos</h1>
        <p className="mt-4 text-muted-foreground">
          Elegí la demo más parecida a lo que necesitás. La ajustamos con tu marca y tus datos, y te la
          entregamos andando.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((demo) => (
          <DemoCard key={demo.slug} demo={demo} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-surface-border bg-surface p-10 text-center">
        <h2 className="text-xl font-medium">¿No encontraste lo que buscabas?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Contanos qué necesitás y lo armamos a tu medida.
        </p>
        <div className="mt-6 flex justify-center">
          <GlowButton href="/personalizado" size="md">
            Pedí algo a tu medida
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
