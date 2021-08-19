const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('AdminPanel API', () => {
    describe('GET /api/admin/users', () => {
        it('It should get all the users', (done) => {
            chai.request(server)
                .get('/api/admin/users/')
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

    describe('GET /api/admin/users', () => {
        it('It should get a single user by userid', (done) => {
            const userId = 'a3abc90c-e5df-4beb-a50b-6b7236011485'
            chai.request(server)
                .get('/api/admin/users/:userId/' + userId)
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

    describe('POST /api/admin/users', () => {
        it('It should login get a token and post a new user', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'rijan22shrestha@gmail.com',
                    password: '$2a$10$s9ZXlLt1XUzWnoesgRuw2e86yyJQkSo.LGK2bd5qoAL2wTbWf6S8u',
                })
                .end((err, response) => {
                    response.should.have.status(200)
                    var token = response.body.token

                    const product = {
                        firstName : 'Arbin',
                        lastName: 'Choudhary ',
                        email: 'arbin@123gmail.com',
                        password: 'arbin12345',
                        role: 'customer',
                        gender: 'Male',
                        address: 'Kathmandu',
                        city: 'battisputali',
                        country: 'Nepal'
                    }
                    chai.request(server)
                        .post('/api/admin/users/new')
                        .set('Authorization', 'Bearer ' + token)
                        .send(product)
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

    describe('PUT /api/admin/users', () => {
        it('It should be able to update users', (done) => {
            const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            const updateuser = {
                firstName : 'Janak',
                lastName: 'Gurung',
                email: 'janak12@gmail.com',
                password: 'janak1234',
                role: 'renter',
                gender: 'Male',
                address: 'Schooldada',
                city: 'Urlabari',
                country: 'Morang',
            }
            chai.request(server)
                .put('/api/admin/users/update/:userId' + userId)
                .send(updateuser)
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

    describe('Delete /api/admin/users', () => {
        it('It should be able to delete users', (done) => {
            const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            chai.request(server)
                .delete('/api/admin/users/delete/:userId/'+ userId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})