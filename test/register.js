const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Register API', () => {
    let token
    describe('POST /api/users/register', () => {
        it('It should register new user', (done) => {
            const registers = {
                firstName: 'arbin',
                lastName: 'chy',
                email: 'arbin@gmail.com',
                password: 'arbins',
            }
            chai.request(server)
                .post('/api/users/register')
                .send(registers)
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
    describe('POST /api/users/email-activate', () => {
        it('It should activate email account', (done) => {
            const activateAccount = {
                token: token,
            }
            chai.request(server)
                .post('/api/users/email-activate')
                .send(activateAccount)
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
