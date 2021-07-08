let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Register API', () =>{

    describe('POST /api/users/register', () =>{
        it("It should register new user", (done) => {
            const registers = {
                firstname:"arbin",
                lastname:"chy",
                email:"arbin@gmail.com",
                password:"arbin"

            };
            chai.request(server)
            .post("/api/users/register")
            .send(registers)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('firstname').eq("arbin");
                response.body.should.have.property('lastname').eq("chy");
                response.body.should.have.property('email').eq("arbin@gmail.com");
                response.body.should.have.property('password').eq("arbin");
                done();
            });

        })

    });
    describe('POST /api/users/email-activate', () =>{
        it("It should activate email account", (done) => {
            const registers = {
                token: "eaafnae134"

            };
            chai.request(server)
            .post("/api/users/email-activate")
            .send(registers)
            .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token').eq("eaafnae134");
            });

        })

    })
});