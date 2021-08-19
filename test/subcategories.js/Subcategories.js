const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Category API', () => {
    describe('GET /api/sub-categories', () => {
        it('It should get all the Subcategories', (done) => {
            chai.request(server)
                .get('/api/sub-categories/')
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

    describe('GET /api/sub-categories/:categoryId', () => {
        it('It should get a single category', (done) => {
            const subCategoryId = '93a82fda-9e0c-4797-bd3d-b973438e3ce4'
            chai.request(server)
                .get('/api/sub-categories/' + subCategoryId)
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