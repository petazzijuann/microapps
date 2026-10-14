"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mic, MicOff } from "lucide-react";

type MicrophoneButtonProps = {
  onResult: (transcript: string) => void;
  disabled?: boolean;
};

function noopSubscribe() {
  return () => {};
}

function getSpeechSupportSnapshot() {
  return Boolean(window.SpeechRecognition ?? window.webkitSpeechRecognition);
}

function getSpeechSupportServerSnapshot() {
  return false;
}

export default function MicrophoneButton({ onResult, disabled }: MicrophoneButtonProps) {
  const supported = useSyncExternalStore(
    noopSubscribe,
    getSpeechSupportSnapshot,
    getSpeechSupportServerSnapshot
  );
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function toggleListening() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "es-AR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript.trim()) onResult(transcript.trim());
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  if (!supported) {
    return (
      <p className="text-xs text-muted-foreground">
        Tu navegador no permite dictar por voz, pero podés escribirlo tranquilo.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      aria-pressed={listening}
      aria-label={listening ? "Detener dictado por voz" : "Dictar por voz"}
      title={listening ? "Detener dictado" : "Dictar por voz"}
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors ${
        listening
          ? "border-accent text-accent"
          : "border-surface-border text-muted-foreground hover:text-foreground"
      } disabled:opacity-50`}
    >
      {listening ? <MicOff className="h-4 w-4" aria-hidden="true" /> : <Mic className="h-4 w-4" aria-hidden="true" />}
      {listening ? "Grabando…" : "Dictar"}
    </button>
  );
}
