const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../server')

chai.should()
chai.use(chaiHttp)

describe('Order API', () => {
    describe('POST /api/orders/new', () => {
        it("It should login get a token and upload new ordered item",(done)=>{

            chai.request(server)
            .post("/api/users/login")
            .send({
                email:"rijan22shrestha@gmail.com",
                password:"$2a$10$s9ZXlLt1XUzWnoesgRuw2e86yyJQkSo.LGK2bd5qoAL2wTbWf6S8u"
            })
            .end((err,response)=>{
                response.should.have.status(200)
                var token = response.body.token;
        
            const item = {
                startDate : '2021-08-05 18:15:00',
                endDate : '2021-08-05T18:15:00.000Z',
                phoneNumber : '+9779813850420',
                address : 'Ktm',
                city : 'ktm',
                country : 'Nepal',
                totalPrice : '1000',
                itemId : 'bf01b5f8-2453-4e8b-8377-3eeee0d6d673',
            }
            chai.request(server)
                .post("/api/orders/new")
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