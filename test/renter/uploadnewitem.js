const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('POST /api/renter/items/new', () => {
        it("It should login get a token and upload new item",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                email:"nepalibabu@gmail.com",
                password:"$2a$10$Ikj89Rsv.YIeMC/lKV5hnunwN5o/a7muyffabyBKJLDBFWogel9Qa"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
        
            const item = {
                name:"Dress",
                description:"pink outfit",
                price:"48",
                size:"Medium",
                color:"Pink",                      
                subCategoryId:"d5145c7c-b967-47c3-b1a2-2ffb43763d75",
            }
            chai.request(server)
                .post("/api/renter/items/new")
                .set('Authorization','Bearer ' + token)
                .send(item)
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