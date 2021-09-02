const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('POST /api/renter/items/new', () => {
        it('It should create a new item', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const item = {
                        name: 'tdd testing item',
                        description: 'this is rental clothes',
                        price: 500,
                        color: 'Red',
                        size: 'Small',
                        subCategoryId: '0b2f1d76-99ea-4dd5-87c8-d5d7aad6a1b6',
                    }
                    chai.request(server)
                        .post('/api/renter/items/new')
                        .set('Authorization', `Bearer ${token}`)
                        .send(item)
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
