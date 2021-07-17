const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Item API', () => {
    describe('GET /api/items', () => {
        it('It should get all the items', (done) => {
            chai.request(server)
                .get('/api/items')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })

    describe('GET /api/items/:itemId', () => {
        it('It should get a single item', (done) => {
            const itemId = '1250938c-d4a9-436a-950b-8b35c148d8b1'
            chai.request(server)
                .get(`/api/items/${itemId}`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })

    describe('POST /api/movies/new', () => {
        it('It should login get a token and create a new item', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'jameskulu55@gmail.com',
                    password: 'madrids',
                })
                .end((err, response) => {
                    response.should.have.status(200)
                    const { token } = response.body

                    const item = {
                        name: 'testing_name',
                        description: 'testing_summary',
                        price: 500,
                        subCategory: '330e6fee-7e57-45c7-bd55-4cd2e88c61d0',
                    }
                    chai.request(server)
                        .post('/api/items/new')
                        .set('Authorization', `Bearer ${token}`)
                        .send(item)
                        .end((err, response) => {
                            response.should.have.status(200)
                            response.body.should.have.property('success')
                            response.body.should.have.property('message')
                            response.body.should.have.property('data')
                            done()
                        })
                })
        })
    })
})
