-- Tabla de pedidos personalizados (formulario /personalizado)
create table if not exists public.solicitudes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  contacto text not null,
  mensaje text not null,
  demo_origen text
);

alter table public.solicitudes enable row level security;

-- Nadie puede leer, insertar, actualizar o borrar desde el cliente (anon/authenticated).
-- Los inserts se hacen únicamente desde el servidor (route handler) con la service role key,
-- que no pasa por RLS.
revoke all on public.solicitudes from anon, authenticated;
