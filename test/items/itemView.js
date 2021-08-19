const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Item API', () => {

    describe('GET /api/items', () => {
        it('It should get search the items', (done) => {
            chai.request(server)
                .get('/api/items/s')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })

    describe('GET /api/items', () => {
        it('It should get all the products', (done) => {
            chai.request(server)
                .get('/api/items')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })
    describe('GET /api/items/:itemId', () => {
        it('It should get a single product', (done) => {
            const itemId = '86a66046-6f3a-44b7-b7e0-103c888d33c2'
            chai.request(server)
                .get('/api/items/' + itemId)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })
   /* describe('POST /api/items/new', () => {
        it('It should login get a token and post a new product', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'rijan22shrestha@gmail.com',
                    password: '$2a$10$s9ZXlLt1XUzWnoesgRuw2e86yyJQkSo.LGK2bd5qoAL2wTbWf6S8u',
                })
                .end((err, response) => {
                    response.should.have.status(200)
                    var token = response.body.token

                    const product = {
                        name: 'asdfghj',
                        description: 'this is rental clothes',
                        price: 'Rs500',
                        subCategoryId: 'shirt',
                    }
                    chai.request(server)
                        .post('/api/items/new')
                        .set('Authorization', 'Bearer ' + token)
                        .send(product)
                        .end((err, response) => {
                            response.should.have.status(200)
                            response.body.should.be.a('object')
                            response.body.should.have.property('success')
                            response.body.should.have.property('message')
                            response.body.should.have.property('data')
                            done()
                        })
                })
        })
    })*/
})
