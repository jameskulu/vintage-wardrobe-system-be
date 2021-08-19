const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('GET /api/users/profile', () => {
        it('It should get profile of user', (done) => {
            const userId = 'eb184a2a-3ae2-4b02-abec-32306617d3de'
            chai.request(server)
                .get('/api/users/profile/' + userId)
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