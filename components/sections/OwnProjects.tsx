import AnimatedSection from "@/components/AnimatedSection";
import { OWN_PROJECTS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";

export default function OwnProjects() {
  return (
    <AnimatedSection className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-2xl font-semibold sm:text-3xl">Proyectos propios en producción</h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
        Son proyectos propios, no de clientes.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {OWN_PROJECTS.map((project) => (
          <div key={project.title} className="rounded-2xl border border-surface-border bg-surface p-6">
            <h3 className="font-medium">{project.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            {project.link === "[CONFIGURAR]" ? (
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground/60">
                [CONFIGURAR]
              </span>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
              >
                Ver proyecto <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
