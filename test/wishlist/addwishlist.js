const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Wishlist API', () => {
    describe('POST /api/users/wishlist/add', () => {
        it('It add item in wishlist', (done) => {
            const itemId = "603c7476a761db00e88d0649";
            const userId = "603c7476a761db00e649";
            chai.request(server)
                .post('/api/users/wishlist/add' + itemId + userId)
                .send(itemId)
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