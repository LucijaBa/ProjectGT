const request = require('supertest');
const app = require('./server');
const VrstaTrening = require('./models/VrstaTrening');
const VrstaTreningRepo = require('./models/VrstaTreningRepository');
const Termin = require('./models/Termin');

describe('Todos API', () => {
    it('GET /treninzi ---> polje treninga', () => {
        return request(app)
            .get('/treninzi')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            naziv: expect.any(String),
                            opis: expect.any(String),
                        })
                    ])
                )
            })      
    });

   
   it('GET /trening ---> određeni trening', () => {
        return request(app)
            .get('/trening?id=1')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        naziv: expect.any(String),
                        vrsta: expect.any(String),
                        vrstaId: expect.any(Number),
                    })
                )
            })      
    });
    
    it('GET /trening ---> 404', () => {
        return request(app)
            .get('/trening?id=9999')
            .expect(404)
    });

    it('GET /treneri ---> polje trenera', () => {
        return request(app)
        .get('/treneri')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        ime: expect.any(String),
                    })
                ])
            )
        })
    });

    it('GET /vrsteTreninga ---> polje vrsta treninga', () => {
        return request(app)
        .get('/vrsteTreninga')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        naziv: expect.any(String),
                    })
                ])
            )
        })
    });

    it('GET /termini ---> termini jednog treninga', () => {
        return request(app)
            .get('/termini?trening=2')
            .expect(200)
    });

    it('POST /obrisiTrening ---> brisanje nepostojećeg treninga', () => {
        return request(app)
            .post('/obrisiTrening')
            .send({
               id: 999
            })
            .expect(400)
    });

    it('POST /obrisiVrstuTreninga ---> brisanje nepostojeće vrste treninga', () => {
        return request(app)
            .post('/obrisiVrstuTreninga')
            .send({
               id: 999
            })
            .expect(400)
    });


    it('POST /urediTermin ---> uređivanje nepostojećeg termina', () => {
        return request(app)
            .post('/urediTermin')
            .send({
               id: 999
            })
            .expect(400)
    });

/**    it('POST /urediVrstuTreninga ---> uređivanje vrste treninga', () => {
        return request(app)
            .post('/urediVrstuTreninga')
            .send({
               id: 2,
               naziv: ''
            })
            .expect(200)
    }); */


})

describe('Testiranje funkcija', () => {
    it('dodavanje nove vrste treninga', () => {
        const novaVrsta = new VrstaTrening(5, 'boks');
        expect(novaVrsta.naziv).toEqual('boks');
        expect(novaVrsta.id).toEqual(5);
    });

    it('dodaje novu vrstu', () => {
        const novaVrsta = new VrstaTrening(null, '');
        expect(novaVrsta).toEqual({id:null, naziv:''});
    });

    it('dodavanje novog termina', () => {
        const noviTermin = new Termin(25, 1, '20-5-2022', '20:00:00');
        expect(noviTermin).toEqual({id:25, trener:1, datum:'20-5-2022', vrijeme:'20:00:00'});
    });


})
