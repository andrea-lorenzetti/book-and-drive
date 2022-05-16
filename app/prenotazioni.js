const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Studente = require('./models/studente.js');
const Prenotazione = require('./models/prenotazione.js');
const Istruttore = require('./models/istruttore.js');
const Segreteria = require('./models/segreteria.js');


router.post('/prenotaGuida', (req,res)=>{
    //Prenota una guida
});

router.delete('/annullaGuida', (req,res)=>{
    //annulla una prenotazione
});


router.get('/mieGuide', async(req,res)=>{
    //Richiesta guide studente
    const query = req.query;
    const user_stud = query.username_stud;
    if (!user_stud){
        res.status(400).json({ error: 'Studente non specificato' });
        return;
    }
    let student = null;
    try {
        student = await Studente.findById(user_stud);
    } catch (error) {
        // This catch CastError when studentId cannot be casted to mongoose ObjectId
        // CastError: Cast to ObjectId failed for value "11" at path "_id" for model "Student"
    }
    if(student == null) {
        res.status(400).json({ error: 'Questo studente non esiste' });
        return;
    };
    guide = await Prenotazione.find({username_studente: user_stud}).exec();
    guide = guide.map((guida)=>{
        return {
            self: "api/v1/prenotazioni/" + guida.id,
            slot: guida.slot.toLocaleString('it-IT'),
            studente: guida.nominativo_studente,
            istruttore: guida.username_istruttore,
            presenza: guida.presenza
        };
    })
    res.status(200).json(guide);
});


module.exports = router;