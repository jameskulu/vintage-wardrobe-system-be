const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Wishlist API', () => {
    describe('POST /api/users/wishlist/add', () => {
        it('It add item in wishlist', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    const wishlist = {
                        itemId: '6cd71987-5368-4217-bffe-fa773737310f',
                    }
                    chai.request(server)
                        .post('/api/users/wishlist/add')
                        .set('Authorization', `Bearer ${token}`)
                        .send(wishlist)
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
