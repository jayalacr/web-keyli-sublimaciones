"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function enviarOpinion(nombre: string, detalle: string, texto: string, anonimo: boolean) {
  const nombreLimpio = anonimo ? "Cliente anónimo" : nombre.trim().slice(0, 80);
  const detalleLimpio = detalle.trim().slice(0, 80);
  const textoLimpio = texto.trim().slice(0, 500);
  if (!nombreLimpio || !textoLimpio) throw new Error("Nombre y opinión son obligatorios.");

  const db = supabaseAdmin();
  const { error } = await db.from("opiniones").insert({
    nombre: nombreLimpio,
    detalle: detalleLimpio || null,
    texto: textoLimpio,
  });
  if (error) throw error;
}
