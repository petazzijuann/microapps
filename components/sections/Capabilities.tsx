import AnimatedSection from "@/components/AnimatedSection";
import { Zap, Database, MessageSquare, Plug } from "lucide-react";

const CAPABILITIES = [
  { icon: Zap, title: "Automatizaciones", description: "Tareas repetitivas que se hacen solas." },
  { icon: Database, title: "Apps web con base de datos", description: "Para guardar y consultar tu información." },
  { icon: MessageSquare, title: "Bots de WhatsApp y Telegram", description: "Atienden y responden sin que estés vos." },
  { icon: Plug, title: "Integraciones con APIs", description: "Conectamos tus herramientas entre sí." },
];

export default function Capabilities() {
  return (
    <AnimatedSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">Qué podemos hacer</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-surface-border bg-surface p-6"
          >
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <h3 className="mt-4 font-medium">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
