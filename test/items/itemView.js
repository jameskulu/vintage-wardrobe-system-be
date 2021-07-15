const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Product API', () => {

    describe('GET /api/items', () => {
        it("It should get all the products",(done)=>{
            chai.request(server)
                .get("/api/items")
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
    describe('GET /api/items/:itemId', () => {
        it("It should get a single product",(done)=>{
            const itemId = "456783sha7823hs"
            chai.request(server)
                .get("/api/items/"+itemId)
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
    describe('POST /api/items/new', () => {
        it("It should login get a token and post a new product",(done)=>{

            chai.request(server)
            .post("/api/users/login")
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
                .post("/api/items/new")
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