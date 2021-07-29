const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Renter API', () => {
    describe('POST /api/orders/new', () => {
        it("It should login get a token and upload new ordered item",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                email:"test@gmail.com",
                password:"teesstt"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
        
            const item = {
                startDate = '2021/07/26',
                endDate = '2021/07/29',
                phoneNumber = '9842394709',
                address = 'battisputali',
                city = 'kathmandu',
                country = 'nepal',
                totalPrice = '700',
                itemId = '234565',
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