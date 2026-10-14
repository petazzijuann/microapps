import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/catalogo" className="transition-colors hover:text-foreground">
            Catálogo
          </Link>
          <Link href="/personalizado" className="transition-colors hover:text-foreground">
            Pedido a medida
          </Link>
        </nav>
      </div>
    </header>
  );
}
