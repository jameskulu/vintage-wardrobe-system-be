const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Reset Password API', () => {
    let token
    describe('POST /api/users/reset-password', () => {
        it('It should post forgotted user', (done) => {
            const resetpwuser = {
                password: 'test123',
            }
            chai.request(server)
                .post('/api/users//reset-password')
                .send(resetpwuser)
                .end((err, response) => {
                    token = response.body.data.emailToken
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

