const router = require('express').Router();
const db = require('../database');
const nodemailer = require('nodemailer');
const path = require('path');

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.post('/registrarUser', (req, res) => {
  console.log(req.body);
  const dataCredencial = {
    CRE_CUSUARIO: req.body.CRE_CUSUARIO || null,
    CRE_CNOMBRE: req.body.CRE_CNOMBRE || null,
    CRE_CNOMBRE2: req.body.CRE_CNOMBRE2 || null,
    CRE_CAPELLIDO: req.body.CRE_CAPELLIDO || null,
    CRE_CAPELLIDO2: req.body.CRE_CAPELLIDO2 || null,
    CRE_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
    CRE_CDETALLE_REGISTRO: 'Registrado por el Sistema',
    CRE_CESTADO: 'Activo',
  };
  const sqlSelectPsicologo = 'SELECT * FROM dbp_virtualcolpatria.TBL_RCREDENCIAL WHERE CRE_CDOCUMENTO = ?';
  db.promise()
    .query(sqlSelectPsicologo, [dataCredencial.CRE_CDOCUMENTO])
    .then(([resultSelectPsicologo]) => {
      if (resultSelectPsicologo.length > 0) {
        res.json({ message: 'Ya existe el Usuario' });
      } else {
        // * Registrar Psicologo
        const sqlInsertCredencial = 'INSERT INTO dbp_virtualcolpatria.TBL_RCREDENCIAL SET ?';
        db.promise()
          .query(sqlInsertCredencial, [dataCredencial])
          .then(([resultInsertCredencial]) => {
            if (resultInsertCredencial.insertId) {
              const dataRPermiso = {
                FKPER_CUSUARIOS: resultInsertCredencial.insertId,
                PER_CDOCUMENTO: req.body.CRE_CDOCUMENTO || null,
                PER_CNIVEL: req.body.PER_CNIVEL || null, // *
                PER_CDETALLE_REGISTRO: 'Registrado por el Sistema',
                PER_CESTADO: 'Activo',
              };
              const sqlInsertRPermiso = 'INSERT INTO dbp_virtualcolpatria.TBL_RPERMISO SET ?';
              db.promise()
                .query(sqlInsertRPermiso, [dataRPermiso])
                .then(([resultInsertRPermiso]) => {
                  console.log(`${dataCredencial.CRE_CUSUARIO} - Registrado. - IDCredencial: ${resultInsertCredencial.insertId} - IDRPermiso: ${resultInsertRPermiso.insertId}`);
                  res.json({ message: `${dataCredencial.CRE_CUSUARIO} - Registrado. - IDCredencial: ${resultInsertCredencial.insertId} - IDRPermiso: ${resultInsertRPermiso.insertId}` });
                })
                .catch((err) => console.log('ERROR::', err));
            }
          })
          .catch((err) => console.log('ERROR::', err));
      }
    });
});

router.get('/sendEmail', (req, res) => {
  let fechaActual = new Date(Date.now()).toJSON().substr(0, 10);
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'elkintorres721@gmail.com', // generated
        pass: 'pptjjqivqlefoepv', // generated
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Elkin Torres" <elkintorres721@gmail.com>', // sender address
      to: 'elkintorres721@gmail.com', // list of receivers
      subject: 'Envio de Cotizacion!!', // Subject line
      text: 'Envio de Cotizacion!!', // plain text body
      html: `
      <div class='cuerpo'>
        <p>Señor (a) E, F, G, H le deseo un feliz día </p>
        <p>En BANCO SCOTIABANK sabemos lo importante que es tu vehículo, por esto nos gustaría poder apoyarte cuando más lo necesites, para nosotros es grato tener tu confianza y poder entregarte el mejor servicio en alianza con Axa Colpatria.</p>
        <p>De acuerdo a nuestra conversación realizada el día de hoy (${fechaActual}) Envío la cotización de la póliza todo riesgo (VIP) de su vehículo placas (L)</p>
        <div>Vehículo: (AZ, AQ, AM)</div>
        <div>Valor asegurado: (AS)</div>
        <div>Valor a pagar póliza con asistencia vip: (AV)</div>

        <p>Durante el año de vigencia de tu seguro te brindara la protección que necesitas</p>
        <ul>
          <li>RCE (Responsabilidad Civil Extracontractual) hasta de $4.000 millones que puedes manejar incluso si vas manejando otro vehículo</li>
          <li>Reposición de llaves por perdida</li>
          <li>Servicio de asistencia en viaje</li>
          <li>Servicio de llanta estallada</li>
          <li>Le cubrimos su vehículo 100% en caso de pérdida total (Sin deducible).</li>
          <li>Para pérdida parcial por daño o por hurto manejamos un único deducible que no varía de $700.000.</li>
        </ul>

        <p>Asistencias</p>
        <ul>
          <li>Servicio de grúa en caso de avería </li>
          <li>Conductor elegido: <b style='color: #3498db;'>ilimitado</b></li>
          <li>Asistencia jurídica y asistencia (vip )exequias</li>
          <li>Asistencia de viaje tanto para su equipaje como a usted.</li>
          <li>Vehículo de reemplazo,10 días en pérdidas parciales.</li>
          <li>Asistencia vial básica (cambio de llanta, batería, gasolina o cerrajería)</li>
          <li>Traslado del Conductor al Taller en caso de avería</li>
          <li>Cobertura de llanta estallada hasta un 1smlv</li>
        </ul>

        <div style='color: #3498db;'>
          <b>!BENEFICIOS POR TOMAR LA PÓLIZA AXA COLPATRIA</b>
            <div>1.	Revisión Viajera - 2 por vigencia</div>
            <div>2.	https://www.axacolpatria.co/portal/beneficios</div>
        </div>


        <p>Estaré atenta a cualquier comentario</p>

        <img src="cid:logoColpatria" alt="Imagen1">
        <div style='font-size: 10px;'>
          <div>Ejecutivo Línea de Automóviles</div>
          <div>#OrgulloAXACOLPATRIA</div>
          <div>Línea de Atención 4894489</div>
          <div>Cra. 7 No. 24-89 Torre Colpatria Piso 3</div>
          <div>Bogotá D.C - Colombia</div>
        </div>
        <img src="cid:linksColpatria" alt="Imagen2">
      </div>`, // html body pptjjqivqlefoepv
      attachments: [
        {
          // utf-8 string as an attachment
          filename: 'ASISTENCIAS_VIP.pdf',
          path: `http://${req.headers.host}/doc/pdf/ASISTENCIAS_VIP.pdf`,
        },
        {
          // utf-8 string as an attachment
          filename: 'Clausulado-Autos-Livianos_2021.pdf',
          path: `http://${req.headers.host}/doc/pdf/Clausulado-Autos-Livianos_2021.pdf`,
        },
        {
          // utf-8 string as an attachment
          filename: 'AxaColpatria.png',
          path: `http://${req.headers.host}/img/AxaColpatria.jpg`,
          cid: 'logoColpatria',
        },
        {
          // utf-8 string as an attachment
          filename: 'AxaLinks.png',
          path: `http://${req.headers.host}/img/AxaLinks.jpg`,
          cid: 'linksColpatria',
        },
      ],
    });

    console.log(info);
    res.json({ messaqe: 'Se Envio Correo' });

    console.log('Message sent: %s', info.envelope);
  }
  main().catch(console.error);
});

// router.get('/arreglarFecha', async (req, res) => {
//   const sql = `SELECT * FROM TBL_RTIPIFICACION WHERE TIP_TIPOBASE = 'ACTIVOS' ORDER BY TIP_CDETALLE31 DESC LIMIT 10`;
//   let [rows] = await db.promise().query(sql);
//   for await (row of rows) {
//     let myPromise = new Promise(async (resolve, reject) => {
//       let fechaActaulDB = row.TIP_CDETALLE31,
//         fechaNueva = '';

//       // * Cambiar Formato Fecha
//       if (fechaActaulDB.length > 10) {
//         let year = new Date(fechaActaulDB).toLocaleDateString().split('/')[2],
//           month = new Date(fechaActaulDB).toLocaleDateString().split('/')[1];

//         if (month.length === 1) month = `0${month}`;

//         fechaNueva = `${year}${month}`;
//         console.log(row.PKTIP_NCODIGO, fechaActaulDB, fechaNueva);
        
//         const sqlUpdate = `UPDATE dbp_virtualcolpatria.TBL_RTIPIFICACION SET TIP_CDETALLE31 = ? WHERE PKTIP_NCODIGO = ?`;
//         let [rowsUpdate] = await db.promise().query(sqlUpdate, [fechaNueva, row.PKTIP_NCODIGO]);
//         console.log(rowsUpdate.affectedRows);
//       }
//       resolve('Ok');
//     });
//     await myPromise;
//   }
//   res.json('Listo');
// });

module.exports = router;
