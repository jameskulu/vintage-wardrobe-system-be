const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Wishlist API', () => {
    describe('Delete /api/users/wishlist/remove/:itemId', () => {
        it('It should be able to delete wishlist item', (done) => {
            const itemId = 654;
            const userId = 8734;
            chai.request(server)
                .delete('/api/users/wishlist/remove/' + itemId + userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})