"use client";

import { useState, type FormEvent } from "react";
import RainbowButton from "@/components/RainbowButton";
import MicrophoneButton from "@/components/MicrophoneButton";
import { buildWhatsAppLink } from "@/lib/constants";

type CustomOrderFormProps = {
  initialMessage: string;
  demoOrigen?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function CustomOrderForm({ initialMessage, demoOrigen }: CustomOrderFormProps) {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState(initialMessage);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contacto, mensaje, demoOrigen, empresaWeb: honeypot }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "No pudimos enviar tu pedido. Probá de nuevo en un rato.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Algo salió mal.");
    }
  }

  if (status === "success") {
    const whatsappLink = buildWhatsAppLink(mensaje);
    return (
      <div className="rounded-2xl border border-surface-border bg-surface p-8 text-center">
        <h2 className="text-xl font-medium">¡Listo, lo recibimos!</h2>
        <p className="mt-2 text-muted-foreground">
          Ya tenemos tu pedido. Te respondemos a la brevedad por el contacto que nos dejaste.
        </p>
        {whatsappLink ? (
          <div className="mt-6 flex justify-center">
            <RainbowButton href={whatsappLink} size="md">
              Escribime por WhatsApp
            </RainbowButton>
          </div>
        ) : (
          <p className="mt-6 text-xs text-muted-foreground">
            [CONFIGURAR] número de WhatsApp para habilitar el contacto directo.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="empresa_web">No completar este campo</label>
        <input
          type="text"
          id="empresa_web"
          name="empresa_web"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nombre" className="text-sm font-medium">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          className="rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contacto" className="text-sm font-medium">
          WhatsApp o mail
        </label>
        <input
          id="contacto"
          name="contacto"
          type="text"
          required
          value={contacto}
          onChange={(event) => setContacto(event.target.value)}
          className="rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-accent"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="mensaje" className="text-sm font-medium">
            ¿Qué problema querés resolver?
          </label>
          <MicrophoneButton
            onResult={(transcript) =>
              setMensaje((current) => (current ? `${current} ${transcript}` : transcript))
            }
          />
        </div>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          minLength={10}
          rows={6}
          value={mensaje}
          onChange={(event) => setMensaje(event.target.value)}
          className="resize-none rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none focus-visible:border-accent"
        />
      </div>

      {status === "error" && <p className="text-sm text-red-400">{errorMessage}</p>}

      <RainbowButton type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando…" : "Enviar pedido"}
      </RainbowButton>
    </form>
  );
}
