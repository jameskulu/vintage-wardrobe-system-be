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
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body

                    chai.request(server)
                        .get('/api/admin/users/')
                        .set('Authorization', `Bearer ${token}`)
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

    describe('GET /api/admin/users/:userId', () => {
        it('It should get a single user by userId', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const userId = '13963633-7326-4da5-be29-8685c3b703bf'

                    chai.request(server)
                        .get(`/api/admin/users/${userId}`)
                        .set('Authorization', `Bearer ${token}`)
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

    describe('POST /api/admin/users/new', () => {
        it('It should login get a token and post a new user', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const item = {
                        firstName: 'Arbin',
                        lastName: 'Choudhary ',
                        email: 'arbin@123gmail.com',
                        password: 'arbin12345',
                        role: 'customer',
                        gender: 'Male',
                        address: 'Kathmandu',
                        city: 'battisputali',
                        country: 'Nepal',
                    }
                    chai.request(server)
                        .get(`/api/admin/users/add`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(item)
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

    describe('PUT /api/admin/users/update/userId', () => {
        it('It should be able to update users', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const userId = '13963633-7326-4da5-be29-8685c3b703bf'
                    const updateItem = {
                        firstName: 'Janak',
                        lastName: 'Gurung',
                        email: 'janak12@gmail.com',
                        role: 'user',
                        gender: 'ma',
                        address: 'Park',
                        city: 'New York',
                        country: 'USA',
                    }
                    chai.request(server)
                        .put(`/api/admin/users/update/${userId}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(updateItem)
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

    describe('DELETE /api/admin/users', () => {
        it('It should be able to delete users', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const userId = 'da6c0067-5e14-47e8-9d45-2e109b744500'
                    chai.request(server)
                        .delete(`/api/admin/users/delete/${userId}`)
                        .set('Authorization', `Bearer ${token}`)
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
})
