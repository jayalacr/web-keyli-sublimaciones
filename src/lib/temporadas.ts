// Días desde hoy hasta la próxima ocurrencia anual de una fecha (mes/día), sin importar el año.
// Si ya pasó este año, calcula contra el año siguiente.
export function diasHastaProxima(mes: number, dia: number, hoy: Date): number {
  const hoyMedianoche = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  let fecha = new Date(hoy.getFullYear(), mes - 1, dia);
  if (fecha < hoyMedianoche) fecha = new Date(hoy.getFullYear() + 1, mes - 1, dia);
  return Math.round((fecha.getTime() - hoyMedianoche.getTime()) / 86400000);
}

// Orden de aparición: temporadas con fecha de vigencia primero, la más próxima a hoy antes;
// las sin fecha caen al final, ordenadas por el campo `orden` heredado como desempate manual.
export function sortKeyTemporada(fechaInicioMes: number | null, fechaInicioDia: number | null, orden: number, hoy: Date): number {
  return fechaInicioMes && fechaInicioDia ? diasHastaProxima(fechaInicioMes, fechaInicioDia, hoy) : 10000 + orden;
}
