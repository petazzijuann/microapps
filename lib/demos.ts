import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardCheck,
  FileSpreadsheet,
  MessageCircle,
  Megaphone,
  PackageSearch,
  CalendarClock,
  Calculator,
  Store,
} from "lucide-react";

export type Demo = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const DEMOS: Demo[] = [
  {
    slug: "bot-whatsapp-telegram",
    title: "Bot de WhatsApp/Telegram",
    description: "Responde preguntas frecuentes y toma pedidos solo, sin que nadie esté del otro lado.",
    icon: MessageCircle,
  },
  {
    slug: "cotizador-online",
    title: "Cotizador online",
    description: "Tu cliente completa unos datos y recibe un precio al toque, sin que vos tengas que calcularlo.",
    icon: Calculator,
  },
  {
    slug: "turnos-reservas",
    title: "Turnos y reservas con recordatorios",
    description: "Agenda online con recordatorios automáticos para que no se te caiga ningún turno.",
    icon: CalendarClock,
  },
  {
    slug: "panel-stock-ventas",
    title: "Panel de stock y ventas",
    description: "Ves el estado de tu negocio de un vistazo, con reporte semanal automático.",
    icon: BarChart3,
  },
  {
    slug: "formulario-sheets-avisos",
    title: "Formulario con aviso automático",
    description: "Carga datos a Sheets o una base, y te avisa por mail o WhatsApp apenas entra algo nuevo.",
    icon: FileSpreadsheet,
  },
  {
    slug: "portal-estado-pedido",
    title: "Portal de estado de pedido",
    description: "Tu cliente consulta en qué va su pedido sin tener que preguntarte a vos.",
    icon: PackageSearch,
  },
  {
    slug: "automatizacion-contenido",
    title: "Automatización de contenido",
    description: "Programa y publica contenido en redes solo, siguiendo las reglas que le marques.",
    icon: Megaphone,
  },
  {
    slug: "control-gestion",
    title: "Control de gestión",
    description: "Registros, tareas y reportes en un solo lugar, sin planillas sueltas por todos lados.",
    icon: ClipboardCheck,
  },
  {
    slug: "conexion-tienda-online",
    title: "Conexión de tienda online",
    description: "Une tu tienda con stock, facturación o envíos para que dejes de hacerlo a mano.",
    icon: Store,
  },
];

export function getDemoBySlug(slug: string): Demo | undefined {
  return DEMOS.find((demo) => demo.slug === slug);
}
