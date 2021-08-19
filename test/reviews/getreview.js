const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Review API', () => {
    describe('GET /api/reviews', () => {
        it('It should get a review', (done) => {
            const itemId = 'c2945cf9-8f66-48fd-84f1-7ec6978bcefa'
            chai.request(server)
                .get('/api/reviews/:itemId/' + itemId)
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