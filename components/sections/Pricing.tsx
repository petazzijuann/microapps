import AnimatedSection from "@/components/AnimatedSection";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Básica",
    price: "USD 200",
    features: ["Una demo del catálogo", "1 función principal", "Sin integraciones externas", "Con tu marca y tus datos"],
  },
  {
    name: "Estándar",
    price: "USD 300",
    features: ["La demo con ajustes", "1 integración (Sheets, mail, WhatsApp, etc.)"],
    highlighted: true,
  },
  {
    name: "A medida",
    price: "Se cotiza",
    features: ["Según el alcance del proyecto"],
  },
];

const MAINTENANCE = [
  { name: "Sin mantenimiento", price: "USD 0" },
  { name: "Básico sin dominio", price: "~USD 10/mes" },
  { name: "Básico con dominio", price: "~USD 20/mes" },
];

export default function Pricing() {
  return (
    <AnimatedSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">Precios claros</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 ${
              plan.highlighted ? "border-accent/60 bg-surface" : "border-surface-border bg-surface"
            }`}
          >
            <h3 className="font-medium">{plan.name}</h3>
            <p className="mt-2 text-2xl font-semibold">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-center text-lg font-medium">Mantenimiento mensual (opcional)</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MAINTENANCE.map((tier) => (
            <div key={tier.name} className="rounded-xl border border-surface-border bg-surface p-4 text-center">
              <p className="text-sm text-muted-foreground">{tier.name}</p>
              <p className="mt-1 font-medium">{tier.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-accent">Primer mes gratis.</p>
        <p className="mx-auto mt-3 max-w-xl text-center text-xs text-muted-foreground">
          Los costos de terceros (por ejemplo, la API de WhatsApp) los paga el cliente aparte.
        </p>
      </div>
    </AnimatedSection>
  );
}
