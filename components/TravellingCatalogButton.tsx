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
 * Distancia desde el borde inferior de la pantalla a la que viaja el botón.
 * El `pb-8` del hero está pensado para que arranque justo a esta altura.
 */
const CATALOG_BUTTON_BOTTOM_GAP = 32;

/**
 * Hay un solo botón "Ver catálogo" en toda la landing. Arranca abajo en el
 * hero, viaja pegado al borde inferior de la pantalla mientras la persona
 * recorre las secciones, y termina estacionado en el CTA final, arriba del
 * "¿No ves lo que necesitás?".
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

    const endTop = endSlot.getBoundingClientRect().top;
    const travelTop =
      window.innerHeight - startSlot.offsetHeight - CATALOG_BUTTON_BOTTOM_GAP;

    // Viaja pegado al borde inferior de la pantalla (ahí lo espera el hueco del
    // hero, que reserva exactamente esa altura) hasta que sube el hueco final:
    // desde ese momento se engancha ahí, arriba del "¿No ves lo que necesitás?",
    // y se va con la página.
    const target = Math.min(travelTop, endTop);

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
