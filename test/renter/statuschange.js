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
                orderId: '234fgh',
                status: 'chaudhary',
                userId: '876fmhn',
                
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