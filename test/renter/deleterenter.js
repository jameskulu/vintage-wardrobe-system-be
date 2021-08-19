const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('Delete /api/renter/items/delete/:itemId', () => {
        it('It should be able to delete', (done) => {
            const itemId = 'be923384-ff69-4bdd-b5e6-6e0e0b85ce33';
            const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            chai.request(server)
                .delete('/api/renter/items/delete/' + itemId + userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})