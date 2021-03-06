const express = require('express');
const app = express();
const db = require('./db')

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

app.use(express.urlencoded({ extended: true }));
const Trening = require('./models/Trening')
const Termin = require('./models/Termin')
const TreningRepository = require('./models/TreningRepository')
const TrenerRepository = require('./models/TrenerRepository')
const VrstaTreningRepository = require('./models/VrstaTreningRepository');
const TerminRepository = require('./models/TerminRepository')

let TreningRepo = new TreningRepository()
let TrenerRepo = new TrenerRepository()
let VrstaTreningRepo = new VrstaTreningRepository()
let TerminRepo = new TerminRepository()


app.get('/treninzi', async function (req, res) {
    let treninzi = await TreningRepo.getAll()
    res.send(treninzi)
})

app.get('/trening', async function (req, res) {
    let trening = await TreningRepo.getTrening(req.query.id)
    if (trening != undefined)
        res.send(trening)
    else    
        res.sendStatus(404)
})

app.get('/treneri', async function (req, res) {
    let treneri = await TrenerRepo.getAll()
    res.send(treneri)
})

app.get('/termini', async function (req, res) {
    let trening = req.query.trening
    let termini = await Trening.getAllTermins(trening)
    res.send(termini)
})

app.post('/dodajTermin', async function (req, res) {
    let result = await TerminRepo.add(req.query.trener, req.query.trening, req.query.datum, req.query.vrijeme)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.get('/vrsteTreninga', async function (req, res) {
    let vrsteTreninga = await VrstaTreningRepo.getAll()
    res.send(vrsteTreninga)
})

app.post('/dodajVrstuTreninga', async function (req, res) {
    let result = await VrstaTreningRepo.add(req.query.naziv)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/obrisiTrening', async function (req, res) {
    let result = await TreningRepo.remove(req.query.id)
    console.log(result)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/obrisiVrstuTreninga', async function (req, res) {
    let result = await VrstaTreningRepo.remove(req.query.id)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/urediVrstuTreninga', async function (req, res) {
    let result = await VrstaTreningRepo.edit(req.query.id, req.query.naziv)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/urediTrening', async function (req, res) {
    let result = await TreningRepo.edit(req.query.id, req.query.naziv, req.query.opis, req.query.idVrsta)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/urediTermin', async function (req, res) {
    let result = await Termin.changeTrainer(req.query.termin, req.query.trener)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

app.post('/obrisiTermin', async function (req, res) {
    console.log(req.query.id)
    let result = await TerminRepo.remove(req.query.id)
    if(result==true)
        res.sendStatus(200)
    else
        res.sendStatus(400)
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(5000);
  }

module.exports = app