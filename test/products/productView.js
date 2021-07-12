const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Product API', () => {

    describe('GET /api/products', () => {
        it("It should get all the products",(done)=>{
            chai.request(server)
                .get("/api/products")
                .end((err,response)=>{
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('success')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })
        })
    })
    describe('GET /api/products/:productId', () => {
        it("It should get a single product",(done)=>{
            const productId = "456783sha7823hs"
            chai.request(server)
                .get("/api/products/"+productId)
                .end((err,response)=>{
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