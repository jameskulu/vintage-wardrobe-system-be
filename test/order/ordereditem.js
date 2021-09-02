const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Order API', () => {
    describe('POST /api/orders/new', () => {
        it('It should order an item', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const items = [
                        {
                            startDate: '2021-08-0518:15:00',
                            endDate: '2021-08-05T18:15:00.000Z',
                            phoneNumber: '9813850420',
                            address: 'Ktm',
                            city: 'ktm',
                            country: 'Nepal',
                            totalPrice: 1000,
                            itemId: '59a2b32a-e807-4ebd-a2ac-c224eb86b8c4',
                        },
                    ]
                    chai.request(server)
                        .post('/api/users/profile/change-password')
                        .set('Authorization', `Bearer ${token}`)
                        .send(items)
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
