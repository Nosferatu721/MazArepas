document.addEventListener("DOMContentLoaded", () => {
  const tablaProduccionBody = document.querySelector("#tablaProduccion tbody"),
    TotalRegistros = document.getElementById("TotalRegistros");

  getData("/registrosProductosHoy").then((res) => {
    console.log(res);
    let objProductos = {},
      htmlTR = "",
      suma = 0;
    res.forEach((producto) => {
      if (objProductos[`${producto.PRO_Referencia}`]) {
        let suma = (objProductos[`${producto.PRO_Referencia}`] += producto.PRO_Cantidad);
        objProductos[`${producto.PRO_Referencia}`] = suma;
      } else {
        objProductos[`${producto.PRO_Referencia}`] = producto.PRO_Cantidad;
      }
    });

    let claves = Object.keys(objProductos);
    for (let i = 0; i < claves.length; i++) {
      suma += objProductos[claves[i]];
      htmlTR += `
          <tr>
            <td>${claves[i]}</td>
            <td>${objProductos[claves[i]]}</td>
          </tr>
        `;
    }

    TotalRegistros.innerHTML = suma;

    tablaProduccionBody.innerHTML = htmlTR;
  });
});
