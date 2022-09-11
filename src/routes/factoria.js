const router = require('express').Router();
const db = require('../database');

router.get('/listaUsuarios', async (req, res) => {
  const sqlSelect = `SELECT * FROM users`;
  let [resultSelect] = await db.promise().query(sqlSelect);
  res.render('factoria/listaUsuarios', { title: 'Lista Usuario', resultSelect });
});

router.post('/actualizar/:id', async (req, res) => {
  const ID = req.params.id,
    data = {
      USR_PrimerNombre: req.body.nombre,
      USR_Password: req.body.contrasena,
    };
  console.log(req.body);
  const sqlUpdate = `UPDATE users SET ? WHERE USR_ID = ${ID}`;
  let [resultUpdate] = await db.promise().query(sqlUpdate, [data]);
  if (resultUpdate.affectedRows) {
    res.redirect('/listaUsuarios');
  } else {
    res.json({ error: 'Error 500' });
  }
});

// ! Produccion
router.get('/resgistrarProduccion', async (req, res) => {
  res.render('factoria/registrarProduccion', { title: 'Produccion' });
});

router.post('/resgistrarProduccionEmpanadas', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaEmpanadas,
    PRO_Cantidad: req.body.cantidadEmpanada,
    PRO_Tipo: 'Empanadas',
    PRO_RolUser: req.user.USR_Rol,
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadEmpanada}</b> de <b>${req.body.referenciaEmpanadas}</b> 😁`);
  res.redirect('/resgistrarProduccion');
});

router.post('/resgistrarProduccionPizza', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaPizza,
    PRO_Cantidad: req.body.cantidadPizza,
    PRO_Tipo: 'Pizza',
    PRO_RolUser: req.user.USR_Rol,
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadPizza}</b> de <b>${req.body.referenciaPizza}</b> 😁`);
  res.redirect('/resgistrarProduccion');
});

router.get('/registrosProduccionHoy', async (req, res) => {
  let FechaHoy = new Date();
  let FormatFechaHoy = FechaHoy.toISOString().split('T')[0];

  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ? AND PRO_RolUser = ?`;
  let [resultSelect] = await db.promise().query(sqlSelect, [FormatFechaHoy, req.user.USR_Rol]);
  res.json(resultSelect);
});

router.post('/getForDateProduccion', async (req, res) => {
  const { fecha } = req.body;
  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ? AND (PRO_RolUser = 'Produccion' OR PRO_RolUser = 'Supervisor' OR PRO_RolUser = 'Admin')`;
  let [resultSelect] = await db.promise().query(sqlSelect, [fecha]);
  res.json(resultSelect);
});

// ! Produccion Inven
router.get('/resgistrarProduccionInv', async (req, res) => {
  res.render('factoria/registrarProduccionInv', { title: 'Produccion' });
});

router.post('/resgistrarProduccionInvEmpanadas', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaEmpanadas,
    PRO_Cantidad: req.body.cantidadEmpanada,
    PRO_Tipo: 'Empanadas',
    PRO_RolUser: req.user.USR_Rol,
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadEmpanada}</b> de <b>${req.body.referenciaEmpanadas}</b> 😁`);
  res.redirect('/resgistrarProduccionInv');
});

router.post('/resgistrarProduccionInvPizza', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaPizza,
    PRO_Cantidad: req.body.cantidadPizza,
    PRO_Tipo: 'Pizza',
    PRO_RolUser: req.user.USR_Rol,
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadPizza}</b> de <b>${req.body.referenciaPizza}</b> 😁`);
  res.redirect('/resgistrarProduccionInv');
});

router.get('/registrosProduccionInvHoy', async (req, res) => {
  let FechaHoy = new Date();
  let FormatFechaHoy = FechaHoy.toISOString().split('T')[0];

  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ? AND PRO_RolUser = ?`;
  let [resultSelect] = await db.promise().query(sqlSelect, [FormatFechaHoy, req.user.USR_Rol]);
  res.json(resultSelect);
});

router.post('/getForDateProduccionInv', async (req, res) => {
  const { fecha } = req.body;
  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ? AND PRO_RolUser = ? OR PRO_RolUser = 'Supervisor' OR PRO_RolUser = 'Admin'`;
  let [resultSelect] = await db.promise().query(sqlSelect, [fecha, req.user.USR_Rol]);
  res.json(resultSelect);
});

router.post('/retgistrarInventario', async (req, res) => {
  const dataInsert = {
    Grande: req.body.cantidadInvGrande,
    Large: req.body.cantidadInvLarge,
    Mediana: req.body.cantidadInvMediana,
    MedianaINT: req.body.cantidadInvMedianaINT,
    Pop: req.body.cantidadInvPop,
    Junior: req.body.cantidadInvJunior,
    Peque: req.body.cantidadInvPeque,
    Pizza: req.body.cantidadInvPizza,
    PizzaIntegral: req.body.cantidadInvPizzaIntegral,
    P2: req.body.cantidadInvP2,
    P2INT: req.body.cantidadInvP2INT,
    P5: req.body.cantidadInvP5,
    S2: req.body.cantidadInvS2,
    S5: req.body.cantidadInvS5,
    Q2: req.body.cantidadInvQ2,
    Q5: req.body.cantidadInvQ5,
    Hojaldre: req.body.cantidadInvHojaldre,
    MG: req.body.cantidadInvMG,
    MM: req.body.cantidadInvMM,
    MP: req.body.cantidadInvMP,
  };
  const sqlInsert = 'INSERT INTO inventario SET ?';
  Object.keys(dataInsert).forEach(async (ref) => {
    let [resultInsert] = await db.promise().query(sqlInsert, [{ INV_Referencia: ref, INV_Cantidad: dataInsert[ref] ? dataInsert[ref] : 0 }]);
  });
  req.flash('messageSuccess', `Se han registrado en Inventario 😁`);
  res.redirect('/resgistrarProduccionInv');
});

// ! Gerente
router.get('/viewGerente', async (req, res) => {
  let FechaHoy = new Date();
  let FormatFechaHoy = FechaHoy.toISOString().split('T')[0];

  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ?`;
  let [resultSelect] = await db.promise().query(sqlSelect, FormatFechaHoy);
  let objProductos = {};
  resultSelect.forEach((row) => {
    if (row.PRO_RolUser === 'Produccion') {
      if (objProductos[`${row.PRO_Referencia}Prod`]) {
        let suma = (objProductos[`${row.PRO_Referencia}Prod`] += row.PRO_Cantidad);
        objProductos[`${row.PRO_Referencia}Prod`] = suma;
      } else {
        objProductos[`${row.PRO_Referencia}Prod`] = row.PRO_Cantidad;
      }
    }
    if (row.PRO_RolUser === 'Inventario') {
      if (objProductos[`${row.PRO_Referencia}ProdInv`]) {
        let suma = (objProductos[`${row.PRO_Referencia}ProdInv`] += row.PRO_Cantidad);
        objProductos[`${row.PRO_Referencia}ProdInv`] = suma;
      } else {
        objProductos[`${row.PRO_Referencia}ProdInv`] = row.PRO_Cantidad;
      }
    }
  });
  console.log(objProductos);
  // res.json({ objProductos });
  res.render('factoria/viewGerente', { title: 'Vista Gerente', objProductos})
});
module.exports = router;
