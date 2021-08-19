const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    let token
    describe('POST /api/renter/orders/:orderId/status', () => {
        it('It should change status order', (done) => {
            const status = {
                orderId: '21b2b7dc-c56b-44a6-bcd0-677255d78888',
                status: 'received',
                userId: 'a3abc90c-e5df-4beb-a50b-6b7236011485',
                
            }
            chai.request(server)
                .post('/api/renter/orders/:orderId/status')
                .send(status)
                .end((err, response) => {
                    token = response.body.data.emailToken || ''
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