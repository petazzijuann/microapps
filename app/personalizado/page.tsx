import type { Metadata } from "next";
import CustomOrderForm from "@/components/CustomOrderForm";
import { getDemoBySlug } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Pedido a medida",
  description: "Contanos qué necesitás y te respondemos con una propuesta.",
};

type PersonalizadoPageProps = {
  searchParams: Promise<{ demo?: string }>;
};

export default async function PersonalizadoPage({ searchParams }: PersonalizadoPageProps) {
  const { demo: demoSlug } = await searchParams;
  const demo = demoSlug ? getDemoBySlug(demoSlug) : undefined;
  const initialMessage = demo ? `Quiero algo parecido a: ${demo.title}` : "";

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Contame qué necesitás</h1>
      <p className="mt-3 text-muted-foreground">Escribilo o dictalo, lo veo yo y te respondo.</p>

      <div className="mt-10">
        <CustomOrderForm initialMessage={initialMessage} demoOrigen={demo?.slug} />
      </div>
    </div>
  );
}
