const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('AdminPanel API', () => {
    describe('GET /api/admin/sub-categories', () => {
        it('It should get all the sub categories', (done) => {
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
                        .get('/api/admin/sub-categories')
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

    describe('GET /api/admin/sub-categories/:subCategoryId', () => {
        it('It should get a single sub-category', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const subCategoryId = '0b2f1d76-99ea-4dd5-87c8-d5d7aad6a1b6'

                    chai.request(server)
                        .get(`/api/admin/sub-categories/${subCategoryId}`)
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

    describe('POST /api/admin/sub-categories/new', () => {
        it('It should post a new sub categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const subCategory = {
                        name: 'testing sub category',
                        categoryId: 'ec9b4d54-ffe8-4fef-a761-6a9600e07780',
                    }
                    chai.request(server)
                        .get(`/api/admin/sub-categories/add`)
                        .set('Authorization', `Bearer ${token}`)
                        .send(subCategory)
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

    describe('PUT /api/admin/sub-categories/update/userId', () => {
        it('It should be able to update sub categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const subCategoryId = '0b2f1d76-99ea-4dd5-87c8-d5d7aad6a1b6'
                    const updateSubCategory = {
                        name: 'testing update sub category',
                    }
                    chai.request(server)
                        .put(
                            `/api/admin/sub-categories/update/${subCategoryId}`
                        )
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

    describe('DELETE /api/admin/sub-categories', () => {
        it('It should be able to delete sub-categories', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const subCategoryId = '0b2f1d76-99ea-4dd5-87c8-d5d7aad6a1b6'
                    chai.request(server)
                        .delete(
                            `/api/admin/sub-categories/delete/${subCategoryId}`
                        )
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
