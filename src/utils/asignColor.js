// assignColor.js

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const getContrastTextColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
  
    // Calcula la luminancia (Luma)
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  
    // Decide si el color de texto debe ser oscuro o claro
    return luma > 128 ? '#000000' : '#ffffff';
  };
  
  const assignColorToTeam = (team, setTeamColors) => {
    // Si el equipo ya tiene un color asignado, devolver ese color
    if (setTeamColors[team]) {
      return setTeamColors[team];
    } else {
      // Si no tiene un color asignado, generar uno nuevo y guardarlo en el historial
      const newColor = getRandomColor();
      // Actualiza el estado del componente con el nuevo color
      setTeamColors((prevColors) => ({ ...prevColors, [team]: newColor }));
      return newColor;
    }
  };
  
  export{
    assignColorToTeam,
    getRandomColor,
    getContrastTextColor
  };
  