const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('AdminPanel API', () => {
    describe('GET /api/admin/items', () => {
        it('It should get all the items', (done) => {
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
                        .get('/api/admin/items')
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

    describe('GET /api/admin/items/:itemId', () => {
        it('It should get a single item', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const itemId = '6cd71987-5368-4217-bffe-fa773737310f'

                    chai.request(server)
                        .get(`/api/admin/items/${itemId}`)
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

    describe('POST /api/admin/items/new', () => {
        it('It should post a new items', (done) => {
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
                        name: 'tdd testing item admin',
                        description: 'this is rental clothes',
                        price: 500,
                        color: 'Red',
                        size: 'Medium',
                        subCategoryId: '0b2f1d76-99ea-4dd5-87c8-d5d7aad6a1b6',
                    }
                    chai.request(server)
                        .get(`/api/admin/items/add`)
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
                    const itemId = '6cd71987-5368-4217-bffe-fa773737310f'
                    const updateItem = {
                        name: 'tdd testing item admin update',
                        description: 'this is rental clothes',
                        price: 600,
                        color: 'White',
                        size: 'Large',
                    }
                    chai.request(server)
                        .put(`/api/admin/items/update/${itemId}`)
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

    describe('DELETE /api/admin/items', () => {
        it('It should be able to delete items', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'tddtesting@yopmail.com',
                    password: 'Test@123',
                })
                .end((err, res) => {
                    response.should.have.status(200)
                    var { token } = res.body
                    const itemId = '6cd71987-5368-4217-bffe-fa773737310f'
                    chai.request(server)
                        .delete(`/api/admin/items/delete/${itemId}`)
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
