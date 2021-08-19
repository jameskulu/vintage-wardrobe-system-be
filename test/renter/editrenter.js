const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('PUT /api/renter/items/update/:itemId', () => {
        it('It should be able to edit', (done) => {
            const itemId = 'bf01b5f8-2453-4e8b-8377-3eeee0d6d673';
            const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            const edit = {
                name : 'Tshirts',                                   
                description :'tshirt',
                price : '1000',
                size:'Medium',
                color:'Blue',
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