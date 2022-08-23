document.addEventListener('DOMContentLoaded', () => {
  const tablaProduccionBody = document.querySelector('#tablaProduccion tbody'),
    TotalRegistros = document.getElementById('TotalRegistros');

  getData('/registrosProductosHoy').then((res) => {
    let objProductos = {},
      htmlTR = '',
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

  // * Filtro
  const containerTableFilter = document.getElementById('containerTableFilter'),
    btnFiltro = document.getElementById('btnFiltro'),
    fechaInput = document.getElementById('fechaInput');

  btnFiltro.addEventListener('click', async () => {
    let res = await postData('/getForDate', { fecha: fechaInput.value });
    if (res.length === 0) {
      Toast.fire({
        icon: 'info',
        title: 'No hay registros en esta fecha 😢',
      });
      return
    }

    let objProductos = {},
      htmlTR = `
        <table class='striped highlight centered'>
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Cantidad</th>
            </tr>
          </thead>

          <tbody>
          `,
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
    htmlTR += `</tbody>
    </table>`;

    htmlTR += `<h4 class='center'>Total <b>${suma}</b></h4>`;

    containerTableFilter.innerHTML = htmlTR;
  });
});
