document.addEventListener('DOMContentLoaded', () => {
  // * Validar Formularios
  const referenciaEmpanadas = document.getElementById('referenciaEmpanadas'),
    cantidadEmpanada = document.getElementById('cantidadEmpanada'),
    btnRegistrarEmpanadas = document.getElementById('btnRegistrarEmpanadas'),
    referenciaPizza = document.getElementById('referenciaPizza'),
    cantidadPizza = document.getElementById('cantidadPizza'),
    btnRegistrarPizzas = document.getElementById('btnRegistrarPizzas');

  btnRegistrarEmpanadas.addEventListener('click', (e) => {
    if (referenciaEmpanadas.value === '' || cantidadEmpanada.value === '') e.preventDefault();
    if (referenciaEmpanadas.value === '') return Toast.fire({ icon: 'warning', title: 'Por favor ingrese la Referencia 😑' });
    if (cantidadEmpanada.value === '') return Toast.fire({ icon: 'warning', title: 'Por favor ingrese la Cantidad 😑' });
  });
  btnRegistrarPizzas.addEventListener('click', (e) => {
    if (referenciaPizza.value === '' || cantidadPizza.value === '') e.preventDefault();
    if (referenciaPizza.value === '') return Toast.fire({ icon: 'warning', title: 'Por favor ingrese la Referencia 😑' });
    if (cantidadPizza.value === '') return Toast.fire({ icon: 'warning', title: 'Por favor ingrese la Cantidad 😑' });
  });

  // * Mostrar Registros del dia de hoy
  const tablaProduccionBody = document.querySelector('#tablaProduccion tbody'),
    TotalRegistrosProduccion = document.getElementById('TotalRegistrosProduccion'),
    TotalRegistrosProPizza = document.getElementById('TotalRegistrosProPizza');
  getData('/registrosProduccionInvHoy').then((res) => {
    let objProductos = {},
      htmlTR = '',
      sumaTotal = 0,
      sumaPizza = 0;
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
      claves[i] !== 'Pizza' ? (sumaTotal += objProductos[claves[i]]) : (sumaPizza += objProductos[claves[i]]);
      htmlTR += `
          <tr>
            <td>${claves[i]}</td>
            <td>${objProductos[claves[i]]}</td>
          </tr>
        `;
    }

    TotalRegistrosProduccion.innerHTML = sumaTotal;
    TotalRegistrosProPizza.innerHTML = sumaPizza;

    tablaProduccionBody.innerHTML = htmlTR;
  });

  // * Filtro
  const containerTableFilter = document.getElementById('containerTableFilter'),
    btnFiltro = document.getElementById('btnFiltro'),
    fechaInput = document.getElementById('fechaInput');
  btnFiltro.addEventListener('click', async () => {
    let res = await postData('/getForDateProduccionInv', { fecha: fechaInput.value });
    if (res.length === 0) {
      Toast.fire({
        icon: 'info',
        title: 'No hay registros en esta fecha 😢',
      });
      return;
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
