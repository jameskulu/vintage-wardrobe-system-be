const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Review API', () => {
    describe('POST /api/reviews/new', () => {
        it("It should login get a token and add new review",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                email:"test@gmail.com",
                password:"teesstt"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
        
            const review = {
                text:"asdfghj",
                rating:"two star",         
                itemId:"2345y",
            }
            chai.request(server)
                .post("/api/reviews/new")
                .set('Authorization','Bearer ' + token)
                .send(review)
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