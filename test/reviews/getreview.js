const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Review API', () => {
    describe('GET /api/reviews', () => {
        it('It should get a review', (done) => {
            const itemId = '6cd71987-5368-4217-bffe-fa773737310f'
            chai.request(server)
                .get(`/api/reviews/${itemId}`)
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