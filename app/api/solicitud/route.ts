import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const solicitudSchema = z.object({
  nombre: z.string().trim().min(1, "Falta el nombre.").max(200),
  contacto: z.string().trim().min(1, "Falta el contacto.").max(200),
  mensaje: z.string().trim().min(10, "Contanos un poco más.").max(4000),
  demoOrigen: z.string().trim().max(200).optional(),
  empresaWeb: z.string().max(0, "Spam detectado.").optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const parsed = solicitudSchema.safeParse(body);

  if (!parsed.success) {
    // Honeypot con contenido: respondemos éxito falso para no delatar el filtro.
    if (parsed.error.issues.some((issue) => issue.path[0] === "empresaWeb")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }

  const { nombre, contacto, mensaje, demoOrigen } = parsed.data;

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("solicitudes").insert({
      nombre,
      contacto,
      mensaje,
      demo_origen: demoOrigen ?? null,
    });

    if (error) {
      console.error("Error insertando solicitud en Supabase:", error);
      return NextResponse.json({ error: "No pudimos guardar tu pedido." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error de configuración de Supabase:", error);
    return NextResponse.json({ error: "No pudimos guardar tu pedido." }, { status: 500 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contacto, mensaje, demoOrigen }),
      });
    } catch (error) {
      console.error("Error disparando webhook de n8n:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
