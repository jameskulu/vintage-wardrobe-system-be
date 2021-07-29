const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Cart API', () => {
    describe('POST /api/cart', () => {
        it('It should post cart information', (done) => {
            const cartinfo = {
                name: 'asdfghj',
                description: 'this is rental clothes',
                price: 'Rs500',
                subCategoryId: 'shirt',
            }
            chai.request(server)
                .post('/api/cart')
                .send(cartinfo)
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
