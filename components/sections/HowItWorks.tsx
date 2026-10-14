import AnimatedSection from "@/components/AnimatedSection";

const STEPS = [
  {
    number: "1",
    title: "Elegís la demo",
    description: "Eligís la demo del catálogo más parecida a lo que necesitás.",
  },
  {
    number: "2",
    title: "La ajustamos",
    description: "La ajustamos con tu marca y tus datos.",
  },
  {
    number: "3",
    title: "Te la entregamos",
    description: "Te la entregamos andando, lista para usar.",
  },
];

export default function HowItWorks() {
  return (
    <AnimatedSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">Cómo funciona</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.number} className="rounded-2xl border border-surface-border bg-surface p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-sm font-semibold text-accent">
              {step.number}
            </span>
            <h3 className="mt-4 font-medium">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Si nada encaja, la hacemos a medida.
      </p>
    </AnimatedSection>
  );
}
