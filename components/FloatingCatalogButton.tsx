"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowRight, LayoutGrid } from "lucide-react";

const RING_RADIUS = 21;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function FloatingCatalogButton() {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);

  useEffect(() => {
    const heroCta = document.getElementById("hero-catalogo-btn");
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroCta);

    return () => observer.disconnect();
  }, []);

  const progressSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  // El botón "se deja arrastrar" por el scroll: al bajar queda un poco atrás y
  // vuelve a su lugar con rebote, así acompaña el movimiento de la persona.
  const scrollVelocity = useVelocity(scrollY);
  const drag = useTransform(scrollVelocity, [-2500, 0, 2500], [-26, 0, 26], {
    clamp: true,
  });
  const ySpring = useSpring(drag, { stiffness: 220, damping: 18, mass: 0.6 });

  const squash = useTransform(ySpring, [-26, 0, 26], [1.06, 1, 1.06]);
  const scaleSpring = useSpring(squash, { stiffness: 200, damping: 20 });

  const visible = !heroCtaVisible;

  return (
    <motion.div
      className="fixed bottom-6 right-5 z-50 sm:bottom-10 sm:right-8"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      style={{
        pointerEvents: visible ? "auto" : "none",
        ...(reduceMotion ? {} : { y: ySpring, scale: scaleSpring }),
      }}
    >
      <Link
        href="/catalogo"
        aria-label="Ver catálogo de demos"
        className="neon-aura relative flex items-center justify-center"
      >
        <span className="flex items-center gap-2 rounded-full bg-background px-4 py-3 text-sm font-medium text-foreground sm:px-5">
          <LayoutGrid className="h-4 w-4 sm:hidden" aria-hidden="true" />
          <span className="hidden sm:inline">Ver catálogo</span>
          <span className="sm:hidden">Catálogo</span>
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </span>

        <svg
          className="pointer-events-none absolute -inset-1.5 -z-10"
          width="100%"
          height="100%"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <motion.circle
            cx="24"
            cy="24"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`}
            style={{
              pathLength: reduceMotion ? scrollYProgress : progressSpring,
              rotate: -90,
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      </Link>
    </motion.div>
  );
}
