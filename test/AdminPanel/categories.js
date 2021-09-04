const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('AdminPanel API', () => {
    describe('GET /api/admin/categories', () => {
        it('It should get all the categories', (done) => {
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
                        .get('/api/admin/categories')
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

    describe('GET /api/admin/categories/:categoryId', () => {
        it('It should get a single category', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const categoryId = 'a0ac4495-eae2-4be9-9899-ee68d5b8df9f'

                    chai.request(server)
                        .get(`/api/admin/categories/${categoryId}`)
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

    describe('POST /api/admin/categories/new', () => {
        it('It should post a new categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const category = {
                        name: 'testing category',
                    }
                    chai.request(server)
                        .get(`/api/admin/categories/add`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(category)
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

    describe('PUT /api/admin/categories/update/userId', () => {
        it('It should be able to update categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const categoryId = 'ec9b4d54-ffe8-4fef-a761-6a9600e07788'
                    const updateSubCategory = {
                        name: 'testing update sub category',
                    }
                    chai.request(server)
                        .put(`/api/admin/categories/update/${categoryId}`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(updateSubCategory)
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

    describe('DELETE /api/admin/categories', () => {
        it('It should be able to delete categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const categoryId = 'ec9b4d54-ffe8-4fef-a761-6a9600e07788'
                    chai.request(server)
                        .delete(`/api/admin/categories/delete/${categoryId}`)
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
