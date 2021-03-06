const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Login API', () => {
    describe('POST /api/users/login', () => {
        it('It should login user', (done) => {
            const loginUser = {
                email: 'rijan22shrestha@gmail.com',
                password: '$2a$10$zJdkYpdPFAoYxJSVvpRJvei6GqVmLEQvrnlfFlO4LKv0LL5lqMHEq',
            }
            chai.request(server)
                .post('/api/users/login')
                .send(loginUser)
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
