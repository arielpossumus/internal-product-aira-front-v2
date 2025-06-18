// Utility para cargar fuentes de Google Fonts dinámicamente
export const loadGoogleFont = (fontFamily) => {
  // Sanitizar el nombre de la fuente para la URL
  const sanitizedFontFamily = fontFamily.replace(/\s+/g, '+');
  
  // Crear el elemento link para la fuente
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${sanitizedFontFamily}&display=swap`;
  link.rel = 'stylesheet';
  
  // Agregar el link al head del documento
  document.head.appendChild(link);
  
  // Retornar el nombre de la fuente para usar en el tema
  return fontFamily;
};

// Función para validar si una fuente está disponible
export const isFontAvailable = async (fontFamily) => {
  try {
    await document.fonts.load(`12px "${fontFamily}"`);
    return document.fonts.check(`12px "${fontFamily}"`);
  } catch (error) {
    console.error('Error checking font availability:', error);
    return false;
  }
}; 