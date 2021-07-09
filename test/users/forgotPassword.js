const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Forgot Password API', () => {
    let token
    describe('POST /api/users/forgot-password', () => {
        it('It should send forgot password email', (done) => {
            const forgotPassword = {
                email: 'arbin@gmail.com',
            }
            chai.request(server)
                .post('/api/users/forgot-password')
                .send(forgotPassword)
                .end((err, response) => {
                    token = response.body.data.resetToken || ''
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })
    describe('POST /api/users/reset-password', () => {
        it('It should reset the password', (done) => {
            const forgotPassword = {
                newPassword: 'arbinchau1234',
                token,
            }
            chai.request(server)
                .post('/api/users/reset-password')
                .send(forgotPassword)
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
