const router = require('express').Router();
const db = require('../database');

// ? Usuarios
router.get('/', (req, res) => {
  res.redirect('/login');
});

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

// ? Produccion
router.get('/resgistrarProducto', async (req, res) => {
  res.render('factoria/registrarProducto', { title: 'Productos' });
});

router.post('/resgistrarProductoEmpanadas', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaEmpanadas,
    PRO_Cantidad: req.body.cantidadEmpanada,
    PRO_Tipo: 'Empanadas',
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadEmpanada}</b> de <b>${req.body.referenciaEmpanadas}</b> 😁`);
  res.redirect('/resgistrarProducto');
});

router.post('/resgistrarProductoPizza', async (req, res) => {
  const data = {
    PRO_Referencia: req.body.referenciaPizza,
    PRO_Cantidad: req.body.cantidadPizza,
    PRO_Tipo: 'Pizza',
  };
  const sqlInsert = `INSERT INTO produccion SET ?`;
  let [resultInsert] = await db.promise().query(sqlInsert, [data]);
  req.flash('messageSuccess', `Se agrego <b>${req.body.cantidadPizza}</b> de <b>${req.body.referenciaPizza}</b> 😁`);
  res.redirect('/resgistrarProducto');
});

router.get('/registrosProductosHoy', async (req, res) => {
  let FechaHoy = new Date();
  let FormatFechaHoy = FechaHoy.toISOString().split('T')[0];
  console.log(FormatFechaHoy);

  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ?`;
  let [resultSelect] = await db.promise().query(sqlSelect, [FormatFechaHoy]);
  res.json(resultSelect);
});

router.post('/getForDate', async (req, res) => {
  const { fecha } = req.body;
  const sqlSelect = `SELECT * FROM produccion WHERE DATE(PRO_Created_at) = ?`;
  let [resultSelect] = await db.promise().query(sqlSelect, [fecha]);
  res.json(resultSelect);
});

module.exports = router;
