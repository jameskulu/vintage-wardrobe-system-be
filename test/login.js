const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Login API', () => {
    let token
    describe('POST /api/users/login', () => {
        it('It should post login user', (done) => {
            const loginuser = {
                firstName: 'arbin',
                lastName: 'chy',
                email: 'arbin@gmail.com',
                password: 'arbins',
            }
            chai.request(server)
                .post('/api/users/login')
                .send(loginuser)
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
