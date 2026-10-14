import Link from "next/link";
import type { Demo } from "@/lib/demos";

export default function DemoCard({ demo }: { demo: Demo }) {
  const Icon = demo.icon;

  return (
    <div className="flex flex-col rounded-2xl border border-surface-border bg-surface p-6">
      <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
      <h3 className="mt-4 font-medium">{demo.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{demo.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/demos/${demo.slug}`}
          className="rounded-full border border-surface-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          Ver demo
        </Link>
        <Link
          href={`/personalizado?demo=${demo.slug}`}
          className="rounded-full border border-surface-border px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          Quiero algo parecido
        </Link>
      </div>
    </div>
  );
}
