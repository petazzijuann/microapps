import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoBySlug } from "@/lib/demos";
import RainbowButton from "@/components/RainbowButton";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);
  return { title: demo?.title ?? "Demo" };
}

export default async function DemoPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);

  if (!demo) {
    notFound();
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <demo.icon className="h-10 w-10 text-accent" aria-hidden="true" />
      <h1 className="text-3xl font-semibold">{demo.title}</h1>
      <p className="text-muted-foreground">Demo en construcción. Muy pronto la vas a poder probar acá mismo.</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <RainbowButton href={`/personalizado?demo=${demo.slug}`} size="md">
          Quiero algo parecido
        </RainbowButton>
        <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-foreground">
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
