const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Product API', () => {

    describe('GET /api/products/productView', () => {
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
    describe('GET /api/products/productView/:productId', () => {
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
    describe('POST /api/products/productView/new', () => {
        it("It should login get a token and post a new product",(done)=>{

            chai.request(server)
            .post("/api/products")
            .send({
                email:"test@gmail.com",
                password:"teesstt"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
            
            const product = {
                product_name:"asdfghj",
                size:29,
            }
            chai.request(server)
                .post("/api/products/new")
                .set('Authorization','Bearer ' + token)
                .send(product)
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
})