import { createContext, useEffect, useState } from 'react';

// Colores por defecto (Naturaleza Suave)
const COLOR_POR_DEFECTO = '#3CB371'; // Verde esmeralda
const FONDO_CLARO_POR_DEFECTO = '#DFF5E3'; // Verde menta

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Cargar desde localStorage o usar valor predeterminado
  const [modoOscuro, setModoOscuro] = useState(() => {
    const guardado = localStorage.getItem('modoOscuro');
    return guardado ? JSON.parse(guardado) : false;
  });

  const [colorPrimario, setColorPrimario] = useState(() => {
    return localStorage.getItem('colorPrimario') || COLOR_POR_DEFECTO;
  });

  const [fondoClaro, setFondoClaro] = useState(() => {
    return localStorage.getItem('fondoClaro') || FONDO_CLARO_POR_DEFECTO;
  });

  // Actualizar localStorage cuando cambie el modo o color
  useEffect(() => {
    localStorage.setItem('modoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  useEffect(() => {
    localStorage.setItem('colorPrimario', colorPrimario);

    // También cambiamos el fondo claro automáticamente (puedes modificar esto si prefieres más control)
    const nuevoFondoClaro = colorPrimario === '#3CB371' ? '#DFF5E3' : '#f0f0f0';
    setFondoClaro(nuevoFondoClaro);
    localStorage.setItem('fondoClaro', nuevoFondoClaro);
  }, [colorPrimario]);

  return (
    <ThemeContext.Provider value={{
      modoOscuro,
      setModoOscuro,
      colorPrimario,
      setColorPrimario,
      fondoClaro
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
