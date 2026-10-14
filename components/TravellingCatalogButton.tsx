"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/** Hueco que reserva el lugar del botón en el hero (punto de partida). */
export const CATALOG_SLOT_START_ID = "catalogo-slot-start";
/** Hueco donde el botón queda estacionado al final (CTA final). */
export const CATALOG_SLOT_END_ID = "catalogo-slot-end";

/**
 * Hay un solo botón "Ver catálogo" en toda la landing. Arranca en el hero,
 * baja acompañando a la persona (se queda centrado en la pantalla mientras
 * recorre las secciones) y termina estacionado en el CTA final, de modo que
 * el "Pedí algo a tu medida" queda visible abajo.
 */
export default function TravellingCatalogButton() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const top = useMotionValue(0);
  const opacity = useMotionValue(0);
  const topSpring = useSpring(top, { stiffness: 260, damping: 30, mass: 0.6 });
  const hasPositioned = useRef(false);

  const sync = useCallback(() => {
    const startSlot = document.getElementById(CATALOG_SLOT_START_ID);
    const endSlot = document.getElementById(CATALOG_SLOT_END_ID);
    if (!startSlot || !endSlot) return;

    const startTop = startSlot.getBoundingClientRect().top;
    const endTop = endSlot.getBoundingClientRect().top;
    const centered = (window.innerHeight - startSlot.offsetHeight) / 2;

    // Mientras el hero está a la vista sigue su hueco; después se queda en el
    // centro de la pantalla; y cuando aparece el hueco final, se engancha ahí.
    const target = Math.min(Math.max(startTop, centered), endTop);

    top.set(target);
    if (!hasPositioned.current) {
      // Primer cálculo: aparecer ya en su lugar, sin deslizarse desde arriba.
      topSpring.jump(target);
      hasPositioned.current = true;
    }
    opacity.set(1);
  }, [opacity, top, topSpring]);

  useMotionValueEvent(scrollY, "change", sync);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 z-40 -translate-x-1/2"
      style={{ top: reduceMotion ? top : topSpring, opacity }}
    >
      <Link
        href="/catalogo"
        className="neon-frame pointer-events-auto inline-block rounded-full"
      >
        <span className="flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-medium text-foreground transition-colors duration-200 hover:bg-surface">
          Ver catálogo
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}

/** Hueco invisible que reserva en el layout el espacio del botón viajero. */
export function CatalogButtonSlot({ id }: { id: string }) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className="pointer-events-none invisible inline-flex items-center gap-2 px-7 py-3.5 text-base font-medium"
    >
      Ver catálogo
      <ArrowRight className="h-4 w-4" />
    </div>
  );
}
