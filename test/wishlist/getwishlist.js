const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Wishlist API', () => {
    describe('GET /api/users/wishlist', () => {
        it('It should get all the wishlist item', (done) => {
            const userId = 'gjkjwb12345'
            chai.request(server)
                .get('api/users/wishlist'+ userId)
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