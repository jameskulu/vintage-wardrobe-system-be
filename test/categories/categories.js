const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Category API', () => {
    describe('GET /api/categories', () => {
        it('It should get all the categories', (done) => {
            chai.request(server)
                .get('/api/categories/')
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

    describe('GET /api/categories/:categoryId', () => {
        it('It should get a single category', (done) => {
            const categoryId = '456783sha7823hs'
            chai.request(server)
                .get('/api/categories/' + categoryId)
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

    describe('GET /api/categories/items/:categoryName', () => {
        it('It should get a single product', (done) => {
            const categoryName = 'Shirt'
            chai.request(server)
                .get('/api/categories/items/:categoryName/' + categoryName)
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
})