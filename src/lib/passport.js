const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database");
// const helpers = require('./helpers')

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "username", // Campos Form Login
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      let [result] = await db.promise().query('SELECT * FROM users WHERE USR_Documento = ?', [username]),
        user = result[0]
      if (result.length) {
        if (result[0].USR_Password === password) {
          req.flash("messageSuccess", `Bienvenido ${user.USR_PrimerNombre} ${user.USR_PrimerApellido}`)
          return done(null, user);
        } else {
          return done(null, false, req.flash("messageInfo", "Contraseña Incorrecta 😐"));
        }
      } else {
        return done(null, false, req.flash("messageInfo", "El usuario no existe 😑"));
      }



      // db.query("SELECT * FROM dbp_virtualcolpatria.TBL_RCREDENCIAL WHERE CRE_CUSUARIO = ?", [username], async (err, result) => {
      //   if (err) throw err;
      //   if (result.length) {
      //     const user = result[0];
      //     // const validPassword = await helpers.matchPassword(password, user.password);
      //     const validPassword = password === user.CRE_CDOCUMENTO;
      //     if (validPassword) {
      //       db.query("SELECT * FROM dbp_virtualcolpatria.TBL_RPERMISO WHERE FKPER_CUSUARIOS = ? AND PER_CESTADO = 'Activo'", [user.PKCRE_NCODIGO], (err, result) => {
      //         if (err) throw err;
      //         if (result.length) {
      //           done(null, user, req.flash("messageSuccess", `Bienvenido ${user.CRE_CUSUARIO}`));
      //         } else {
      //           done(null, false, req.flash("messageError", "Sin Permisos"));
      //         }
      //       });
      //     } else {
      //       done(null, false, req.flash("messageInfo", "Contraseña Incorrecta"));
      //     }
      //   } else {
      //     return done(null, false, req.flash("messageInfo", "El usuario no existe"));
      //   }
      // });
    }
  )
);

// passport.use(
//   "local.signup",
//   new LocalStrategy(
//     {
//       usernameField: "username", // Campos del Form SignUp
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       const { fullname } = req.body;
//       const newUser = {
//         username,
//         password,
//         fullname,
//       };
//       // newUser.password = await helpers.encryptPassword(password);
//       db.query("INSERT INTO users SET ?", [newUser], (err, result) => {
//         if (err) throw err;
//         newUser.id = result.insertId;
//         return done(null, newUser);
//       });
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.USR_ID);
});

passport.deserializeUser(async (id, done) => {
  let [result] = await db.promise().query(`SELECT * FROM users WHERE USR_ID = ${id}`)
  done(null, result[0])
  // db.query("SELECT * FROM dbp_virtualcolpatria.TBL_RCREDENCIAL WHERE PKCRE_NCODIGO = ?", [id], (err, result) => {
  //   if (err) throw err;
  //   const user = result[0];
  //   db.query("SELECT * FROM dbp_virtualcolpatria.TBL_RPERMISO WHERE FKPER_CUSUARIOS = ? AND PER_CESTADO = 'Activo'", [id], (err, result) => {
  //     if (err) throw err;
  //     if (result.length) {
  //       // * Todo Correcto
  //       const userAll = {
  //         ...user,
  //         rpermiso: result[0],
  //       };
  //       done(null, userAll);
  //     }
  //   });
  // });
});
