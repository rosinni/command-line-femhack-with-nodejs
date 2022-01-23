//calcula la altura máxima
export const maxProjectileHeight = (vO, angulo, unidad) => {

  let g = unidad === "M/S" ? 9.807 : 127098.72;

  let alfa = (angulo * Math.PI) / 180;
 let h_max = (vO * vO) * (Math.sin(alfa)*Math.sin(alfa))/ (2 * g);

  return h_max;
};

//calcula la distancia maxima recorrida
export const maxDistanceTraveled = (unidad, h_max,angulo,vO) => {
    let h_maxMs = 0,
        h_maxKm = 0,
        x_maxMs = 0,
        x_maxKm = 0;
    let g = unidad === "M/S" ? 9.807 : 127098.72;
    let alfa = (angulo * Math.PI) / 180;
    let x_max = (vO * vO * Math.sin(2*alfa)) / g;

  if (unidad === "M/S") {
    h_maxMs = h_max + " Metros";
    h_maxKm = h_max / 1000 + " Kilometros";
    x_maxMs = x_max + " Metros";
    x_maxKm = x_max / 1000 + " Kilometros";
  } else {
    h_maxKm = h_max + " Kilometros";
    h_maxMs = h_max / 1000 + "Metros";
    x_maxKm = x_max + " Kilometros";
    x_maxMs = x_max / 1000 + " Metros";
  }

  return { h_maxMs, h_maxKm, x_maxMs, x_maxKm };
};


//escribe el contenido del documento .txt que se va a crear
export const writeContent = (results , entryData)=>{

    return `------ TUS DATOS HAN SIDO PROCESADOS DE FORMA EXITOSA ------\n
    Estos son tus datos
    - Velocidad inicial ingresada (vO) : ${entryData.vO}
    - Angulo ingresado : ${entryData.angulo}
    - Altura máxima calculada : ${results.h_maxMs} / ${results.h_maxKm}
    - Distancia máxima calculada : ${results.x_maxMs} / ${results.x_maxKm}
    ----------------------------------\n`

}