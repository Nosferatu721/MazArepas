const router = require('express').Router();
const db = require('../database');

// ? Usuarios
router.get('/', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
