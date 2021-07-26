const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {

    describe('GET /api/renter', () => {
        it("It should get uploaded items",(done)=>{
            chai.request(server)
                .get("/api/renter/items")
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