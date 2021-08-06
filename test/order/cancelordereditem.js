const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('Delete /api/users/orders/:orderId/cancel', () => {
        it('It should be able to delete cart item', (done) => {
            const orderId = '234';
            const userId = '543';
            chai.request(server)
                .delete('/api/users/orders/:orderId/cancel' + orderId + userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})