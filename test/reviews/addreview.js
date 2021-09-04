const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Review API', () => {
    describe('POST /api/reviews/new', () => {
        it('It should add new review', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const review = {
                        text: 'Nice quality',
                        rating: '4',
                        itemId: '6cd71987-5368-4217-bffe-fa773737310f',
                    }
                    chai.request(server)
                        .post('/api/reviews/new')
                        .set('Authorization', `Bearer ${token}`)
                        .send(review)
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
