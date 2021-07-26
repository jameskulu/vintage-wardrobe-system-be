const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('Delete /api/renter/items/delete/:itemId', () => {
        it('It should be able to delete', (done) => {
            const itemId = 3456;
            const userId = 3487;
            chai.request(server)
                .delete('/api/renter/items/delete/' + itemId + userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})