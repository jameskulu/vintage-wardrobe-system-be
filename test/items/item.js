const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Item API', () => {
    describe('GET /api/items/s', () => {
        it('It should search the items', (done) => {
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
        it('It should get all the items', (done) => {
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
        it('It should get a single item', (done) => {
            const itemId = '6cd71987-5368-4217-bffe-fa773737310f'
            chai.request(server)
                .get(`/api/items/${itemId}`)
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
