export const SITE_NAME = "MicroApps";

// Slogan provisorio del hero: cambiarlo acá actualiza toda la landing.
export const HERO_SLOGAN = "Cubrimos cualquier necesidad con una microapp";

export const HERO_SUBTITLE =
  "Microapps a medida para tu pyme o empresa: chicas, rápidas y enfocadas en resolver un problema puntual.";

export const SITE_DESCRIPTION =
  "MicroApps diseña microapps a medida para pymes y empresas: bots, cotizadores, paneles y automatizaciones, listos en días, no en meses.";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function buildWhatsAppLink(message: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type OwnProject = {
  title: string;
  description: string;
  link: string | "[CONFIGURAR]";
};

export const OWN_PROJECTS: OwnProject[] = [
  {
    title: "Automatización de contenido en n8n",
    description:
      "Un flujo en n8n que publica contenido automáticamente en varias cuentas, sin intervención manual día a día.",
    link: "[CONFIGURAR]",
  },
  {
    title: "Valmont",
    description:
      "Web de marca + automatización de publicaciones y ventas para simplificar el día a día del negocio.",
    link: "[CONFIGURAR]",
  },
  {
    title: "MicroApps",
    description: "Esta misma web institucional, pensada y construida como microapp.",
    link: "[CONFIGURAR]",
  },
];
