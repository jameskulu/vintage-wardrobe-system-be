const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('AdminPanel API', () => {
    describe('GET /api/admin/sub-categories', () => {
        it('It should get all the sub-categories', (done) => {
            chai.request(server)
                .get('/api/admin/sub-categories/')
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

    describe('GET /api/admin/sub-categories', () => {
        it('It should get a single subcategory by sub-categoryid', (done) => {
            const subCategoryId = '847109dc-50ac-43ec-bb3f-8d60fe73856c'
            chai.request(server)
                .get('/api/admin/sub-categories/:subCategoryId/' + subCategoryId)
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

    describe('POST /api/admin/sub-categories', () => {
        it('It should login get a token and post a new sub-category', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'rijan22shrestha@gmail.com',
                    password: '$2a$10$s9ZXlLt1XUzWnoesgRuw2e86yyJQkSo.LGK2bd5qoAL2wTbWf6S8u',
                })
                .end((err, response) => {
                    response.should.have.status(200)
                    var token = response.body.token

                    const name = 'Women';
                    const categoryId = '847109dc-50ac-43ec-bb3f-8d60fe73856c';
                    chai.request(server)
                        .post('/api/admin/sub-categories/new/' + categoryId)
                        .set('Authorization', 'Bearer ' + token)
                        .send(name)
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

    describe('PUT /api/admin/sub-categories', () => {
        it('It should be able to update sub-categories', (done) => {
            const subCategoryId = '847109dc-50ac-43ec-bb3f-8d60fe73856c';
            const updatedSC = {
                name = 'Women',
                categoryId = '847109dc-50ac-43ec-bb3f-8d60fe73856c',
            }
            chai.request(server)
                .put('/api/admin/sub-categories/update/:subCategoryId' + subCategoryId + categoryId)
                .send(updatedSC)
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

    describe('Delete /api/admin/sub-categories', () => {
        it('It should be able to delete sub-categories', (done) => {
            const subCategoryId = '847109dc-50ac-43ec-bb3f-8d60fe73856c';
            chai.request(server)
                .delete('/api/admin/sub-categories/delete/:subCategoryId/'+ subCategoryId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})