import { supabasePublic } from "@/lib/supabase/public";
import { sortKeyTemporada } from "@/lib/temporadas";

export type Categoria = { id: string; nombre: string; slug: string; orden: number };

export type ProductoColor = { hex: string; etiqueta: string };
export type ProductoImagen = { url: string; alt: string };

export type Producto = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  material: string | null;
  tecnica: string | null;
  precio_desde_centavos: number;
  dias_produccion: number;
  capacidades: string[];
  colores: ProductoColor[];
  imagen_url: string | null;
  imagen_alt: string | null;
  galeria: ProductoImagen[];
  destacado: boolean;
  orden: number;
  categoria: { nombre: string } | null;
};

export type Temporada = {
  id: string;
  nombre: string;
  slug: string;
  eslogan: string | null;
  descripcion: string | null;
  portada_url: string | null;
  portada_alt: string | null;
  orden: number;
  fecha_inicio_mes: number | null;
  fecha_inicio_dia: number | null;
  fecha_fin_mes: number | null;
  fecha_fin_dia: number | null;
};

export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabasePublic().from("categorias").select("id,nombre,slug,orden").order("orden");
  if (error) throw error;
  return data;
}

export async function getProductosActivos(): Promise<Producto[]> {
  const { data, error } = await supabasePublic()
    .from("productos")
    .select(
      "id,nombre,slug,descripcion,material,tecnica,precio_desde_centavos,dias_produccion,capacidades,colores,imagen_url,imagen_alt,galeria,destacado,orden,categoria:categorias(nombre)"
    )
    .eq("activo", true)
    .order("orden");
  if (error) throw error;
  return data as unknown as Producto[];
}

export async function getTemporadasActivas(): Promise<(Temporada & { piezas: number; galeria: ProductoImagen[] })[]> {
  const db = supabasePublic();
  const { data: temporadas, error } = await db
    .from("temporadas")
    .select("id,nombre,slug,eslogan,descripcion,portada_url,portada_alt,orden,fecha_inicio_mes,fecha_inicio_dia,fecha_fin_mes,fecha_fin_dia")
    .eq("activa", true)
    .order("orden");
  if (error) throw error;

  const hoy = new Date();
  const sortKey = (t: Temporada) => sortKeyTemporada(t.fecha_inicio_mes, t.fecha_inicio_dia, t.orden, hoy);
  const ordenadas = [...temporadas].sort((a, b) => sortKey(a) - sortKey(b));

  const { data: relaciones, error: relErr } = await db
    .from("productos_temporadas")
    .select("temporada_id,productos(imagen_url,imagen_alt)");
  if (relErr) throw relErr;

  type Rel = { temporada_id: string; productos: { imagen_url: string | null; imagen_alt: string | null } | null };
  const conteoPorTemporada = new Map<string, number>();
  const galeriaPorTemporada = new Map<string, ProductoImagen[]>();
  for (const r of relaciones as unknown as Rel[]) {
    conteoPorTemporada.set(r.temporada_id, (conteoPorTemporada.get(r.temporada_id) ?? 0) + 1);
    if (r.productos?.imagen_url) {
      const galeria = galeriaPorTemporada.get(r.temporada_id) ?? [];
      galeria.push({ url: r.productos.imagen_url, alt: r.productos.imagen_alt ?? "" });
      galeriaPorTemporada.set(r.temporada_id, galeria);
    }
  }

  return ordenadas.map((t) => ({
    ...t,
    piezas: conteoPorTemporada.get(t.id) ?? 0,
    galeria: galeriaPorTemporada.get(t.id) ?? [],
  }));
}

export async function getTemporadaConProductos(slug: string) {
  const db = supabasePublic();
  const { data: temporada, error } = await db
    .from("temporadas")
    .select("id,nombre,slug,eslogan,descripcion,portada_url,portada_alt")
    .eq("slug", slug)
    .eq("activa", true)
    .maybeSingle();
  if (error) throw error;
  if (!temporada) return null;

  const { data: relaciones, error: relErr } = await db
    .from("productos_temporadas")
    .select("productos(id,nombre,imagen_url,imagen_alt,activo,categoria:categorias(nombre))")
    .eq("temporada_id", temporada.id);
  if (relErr) throw relErr;

  type Row = { productos: { id: string; nombre: string; imagen_url: string | null; imagen_alt: string | null; activo: boolean; categoria: { nombre: string } | null } | null };
  const productos = (relaciones as unknown as Row[])
    .map((r) => r.productos)
    .filter((p): p is NonNullable<Row["productos"]> => !!p && p.activo);

  return { temporada, productos };
}

export type TextosInicio = {
  hero_titulo: string;
  hero_subtitulo: string;
  hero_cta: string;
  hero_imagen_url: string;
  hero_imagen_alt: string;
  historia_titulo: string;
  historia_texto: string;
  historia_imagen_url: string;
  historia_imagen_alt: string;
  insignias_confianza: [string, string, string, string];
};

export async function getTextosInicio(): Promise<TextosInicio | null> {
  const { data, error } = await supabasePublic()
    .from("configuracion_sitio")
    .select("valor")
    .eq("clave", "textos_inicio")
    .maybeSingle();
  if (error) throw error;
  return (data?.valor as TextosInicio) ?? null;
}

export type Contacto = {
  whatsapp: string;
  instagram_url: string;
  instagram_widget_url: string;
  facebook_url: string;
  tiktok_urls: string[];
};

export type Opinion = {
  id: string;
  nombre: string;
  detalle: string | null;
  texto: string;
};

export async function getOpinionesAprobadas(): Promise<Opinion[]> {
  const { data, error } = await supabasePublic()
    .from("opiniones")
    .select("id,nombre,detalle,texto")
    .eq("aprobada", true)
    .order("creado_en", { ascending: false })
    .limit(6);
  if (error) throw error;
  return data;
}

export async function getContacto(): Promise<Contacto | null> {
  const { data, error } = await supabasePublic()
    .from("configuracion_sitio")
    .select("valor")
    .eq("clave", "contacto")
    .maybeSingle();
  if (error) throw error;
  return (data?.valor as Contacto) ?? null;
}
