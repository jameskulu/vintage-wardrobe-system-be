const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Order API', () => {
    describe('GET /api/users/orders', () => {
        it('It should get ordered items', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    chai.request(server)
                        .get('/api/users/orders')
                        .set('Authorization', `Bearer ${token}`)
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
