const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('POST /api/renter/orders/:orderId/status', () => {
        it('It should change status order', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const status = {
                        status: 'approved',
                    }
                    const orderId = '3b32210c-5e60-4084-808e-4e8c456178d1'
                    chai.request(server)
                        .post(`/api/renter/orders/${orderId}/status`)
                        .send(status)
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
