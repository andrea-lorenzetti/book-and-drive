const express = require('express');
const cors = require('cors')

const app = express();
const istruttori = require('./istruttori.js')
const prenotazioni = require('./prenotazioni.js')
const segreteria = require('./segreteria.js')
const studenti = require('./studenti.js')

const autenticazione_studenti=require('./autenticazione_studenti.js')
const autenticazione_istruttori=require('./autenticazione_istruttori.js')
const autenticazione_segreteria=require('./autenticazione_segreteria.js')

const tokenChecker=require('./tokenChecker.js')

//____________________________________________________________________//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use('/', express.static('static'));


app.use('/api/v1/autenticazione_studente', autenticazione_studenti);
app.use('/api/v1/autenticazione_istruttore', autenticazione_istruttori); 
app.use('/api/v1/autenticazione_istruttore', autenticazione_segreteria); 

/*
    route with tokenChecker for istruttori, studenti, prenotazioni
    new version of istruttori, studenti prenotazioni with token checker
*/
app.use('/api/v1/segreteria', segreteria);
app.use('/api/v1/istruttori', istruttori);
app.use('/api/v1/prenotazioni', prenotazioni);
app.use('/api/v1/studenti', studenti);



app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;


