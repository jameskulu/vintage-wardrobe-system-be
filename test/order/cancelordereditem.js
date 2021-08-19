const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Order API', () => {
    describe('Delete /api/users/orders/:orderId/cancel', () => {
        it('It should be able to delete cart item', (done) => {
            const orderId = 'bf01b5f8-2453-4e8b-8377-3eeee0d6d673';
            const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            chai.request(server)
                .delete('/api/users/orders/:orderId/cancel' + orderId + userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})