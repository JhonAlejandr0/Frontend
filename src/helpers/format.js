export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};
export const formatearFechaHora = (fechaHora) => {
  // Parsear la fecha y hora
  const date = new Date(fechaHora);

  // Extraer la fecha en formato YYYY-MM-DD
  const fecha = date.toISOString().split("T")[0];

  // Extraer la hora en formato HH:MM:SS
  const hora = date.toTimeString().split(" ")[0];

  // Retornar un array con la fecha y la hora
  return [fecha, hora];
};
