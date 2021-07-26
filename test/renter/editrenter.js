const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('PUT /api/renter/items/update/:itemId', () => {
        it('It should be able to edit', (done) => {
            const itemId = 3456;
            const userId = 3487;
            const edit = {
                name = 'rghsjd',
                description='this is for renting clothes',
                price= 'Rs1000',
                subCategoryId= 'T-shirt',
            }
            chai.request(server)
                .put('/api/renter/items/update/' + itemId + userId)
                .send(edit)
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