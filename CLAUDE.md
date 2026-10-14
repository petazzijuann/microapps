# MicroApps — Decisiones y plan

Web de MicroApps: servicio de microapps a medida para pymes/empresas. Español rioplatense (voseo), tono directo y cercano.

## Stack y decisiones

- **Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion.** Scaffold hecho con `create-next-app`. Turbopack es el bundler por defecto en Next 16 (no hace falta flag).
- **Next 16 rompe compatibilidad sync con `params`/`searchParams`**: son `Promise` siempre, hay que `await` en los Server Components (`/personalizado` lee `searchParams` como promesa).
- **Un solo repo.** Cada demo del catálogo vive en `app/demos/[slug]/page.tsx`, por ahora un placeholder único "Demo en construcción" que lee el slug.
- **Supabase** (`@supabase/supabase-js`) solo del lado servidor, con **service role key**, para insertar en la tabla `solicitudes` desde el route handler. Nunca se expone la service role al cliente.
- **Deploy en Vercel** (sin configuración especial más allá de las env vars).
- **Oscuro por defecto**, con un **aura neón** multicolor como acento: un conic-gradient desenfocado que gira detrás del botón (dos capas: estela difusa + brillo pegado al borde). Se usa solo en los botones principales (hero, flotante, catálogo, `/personalizado`) y como detalle en el favicon.
- **Fuente**: Geist (ya viene con `next/font/google` desde el scaffold), se mantiene en vez de sumar Inter.
- **Validación**: zod en el route handler de `/api/solicitud`, + honeypot anti-spam.
- **Web Speech API** (`SpeechRecognition` / `webkitSpeechRecognition`) para dictado por voz en el textarea de `/personalizado`, con tipos ambientales propios (no vienen en lib.dom.d.ts) y fallback si el navegador no lo soporta.
- **Slogan del hero** en una constante (`HERO_SLOGAN` en `lib/constants.ts`) para cambiarlo fácil.
- **Links/placeholders sin configurar** se marcan literalmente `[CONFIGURAR]` en los datos (número de WhatsApp, links de proyectos propios) y se renderizan como texto no-clickeable hasta que se complete el dato real.

## Rutas

- `/` — landing (una sola página con secciones `whileInView`).
- `/catalogo` — grilla de 9 demos.
- `/demos/[slug]` — placeholder por demo.
- `/personalizado` — formulario de pedido a medida (+ `?demo=<slug>` precarga mensaje).
- `/api/solicitud` — route handler POST (guarda en Supabase + dispara webhook n8n opcional).

## Plan de archivos

```
CLAUDE.md
.env.example
supabase/schema.sql

types/speech-recognition.d.ts        # tipos ambientales Web Speech API

lib/constants.ts                     # slogan, nombre, whatsapp number, site url
lib/demos.ts                         # array tipado con las 9 demos (slug, título, desc, icono)
lib/supabaseServer.ts                # cliente supabase con service role (server-only)

components/GlowButton.tsx            # botón con aura neón animada (usado en hero/flotante/catálogo/personalizado)
components/AnimatedSection.tsx       # wrapper whileInView fade+slide-up, respeta prefers-reduced-motion
components/FloatingCatalogButton.tsx # botón flotante con scroll progress ring + spring
components/SiteHeader.tsx            # header mínimo con logo + nav (Catálogo / Pedido a medida)
components/MicrophoneButton.tsx      # botón de dictado (Web Speech API)
components/CustomOrderForm.tsx       # formulario cliente de /personalizado
components/DemoCard.tsx              # tarjeta de demo del catálogo

components/sections/Hero.tsx
components/sections/WhatIsMicroapp.tsx
components/sections/HowItWorks.tsx
components/sections/Capabilities.tsx
components/sections/Pricing.tsx
components/sections/OwnProjects.tsx
components/sections/FinalCta.tsx

app/layout.tsx                       # metadata SEO/OG es-AR, fuente, SiteHeader
app/globals.css                      # tema oscuro, keyframes del aura neón, foco visible
app/icon.tsx                         # favicon generado (ImageResponse)
app/page.tsx                         # ensambla las secciones de la landing
app/catalogo/page.tsx
app/demos/[slug]/page.tsx
app/personalizado/page.tsx           # server component, lee searchParams, renderiza CustomOrderForm
app/api/solicitud/route.ts           # POST: zod + honeypot + supabase insert + webhook n8n
```

## Pendiente de configurar (placeholders)

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número real para los links `wa.me`.
- Links de los 3 proyectos propios (n8n, Valmont, MicroApps institucional).
- Variables de Supabase y n8n en `.env.local` / Vercel.
