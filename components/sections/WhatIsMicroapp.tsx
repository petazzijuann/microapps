import AnimatedSection from "@/components/AnimatedSection";
import { Bot, Calculator, LayoutDashboard } from "lucide-react";

const EXAMPLES = [
  { icon: Bot, label: "Un bot que atiende consultas y pedidos" },
  { icon: Calculator, label: "Un cotizador que calcula precios al toque" },
  { icon: LayoutDashboard, label: "Un panel que muestra el estado del negocio" },
];

export default function WhatIsMicroapp() {
  return (
    <AnimatedSection className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">¿Qué es una microapp?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        Una herramienta de software chica y enfocada que resuelve un problema concreto de tu negocio:
        un bot, un cotizador, un panel, una automatización. Sin sistemas gigantes ni meses de desarrollo,
        algo puntual que anda y te resuelve ese problema.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {EXAMPLES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 rounded-2xl border border-surface-border bg-surface p-6 text-center"
          >
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
