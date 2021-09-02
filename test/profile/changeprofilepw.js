const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('PUT /api/users/profile/change-password', () => {
        it('It should be able to change password', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const changePassword = {
                        oldPassword: 'Test@123',
                        newPassword: 'Test@123',
                    }
                    chai.request(server)
                        .put('/api/users/profile/change-password')
                        .set('Authorization', `Bearer ${token}`)
                        .send(changePassword)
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
})
