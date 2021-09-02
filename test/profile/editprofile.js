const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('PUT /api/users/profile/edit', () => {
        it('It should be able to edit profile', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const editprof = {
                        firstName: 'Tddupdate',
                        lastName: 'TestingUpdate',
                        gender: 'ma',
                        address: 'baneshwor',
                        city: 'kathmandu',
                        country: 'Nepal',
                    }
                    chai.request(server)
                        .put('/api/users/wishlist/add')
                        .set('Authorization', `Bearer ${token}`)
                        .send(editprof)
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
