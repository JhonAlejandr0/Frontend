const nombreCompletoRegex =
  /^([A-Za-zÁÉÍÓÚáéíóúÑñ]+ ){1,2}[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

export const validacionesFormulario = (
  nombre,
  correo,
  telefono,
  direccion,
  usuario,
  contraseña,
  documento
) => {
  if (
    nombre === "" ||
    correo === "" ||
    telefono === "" ||
    direccion === "" ||
    usuario === "" ||
    contraseña === "" ||
    documento === ""
  ) {
    return "Son necesarios todos los campos";
  }

  if (!/^[0-9]{10}$/.test(telefono)) {
    return "Teléfono inválido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return "Correo inválido";
  }
  if (!nombreCompletoRegex.test(nombre)) {
    return "Nombre completo inválido. Debe incluir al menos un nombre y un apellido, y puede tener hasta dos apellidos.";
  }
  
  const contraseñaRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!contraseñaRegex.test(contraseña)) {
    return "Contraseña inválida. Debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial.";
  }
  
  return "";
};
