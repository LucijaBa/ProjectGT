const request = require('supertest');
const app = require('./server');

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
            .get('/trening/?id=1')
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
            .get('/trening/?id=9999')
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
})
