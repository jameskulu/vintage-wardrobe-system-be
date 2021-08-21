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
                .get('/api/admin/items/')
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

    describe('GET /api/admin/items', () => {
        it('It should get a single item by itemid', (done) => {
            const itemId = '86a66046-6f3a-44b7-b7e0-103c888d33c2'
            chai.request(server)
                .get('/api/admin/items/:itemId/' + itemId)
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

    describe('POST /api/admin/items', () => {
        it('It should login get a token and post a new item', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    email: 'rijan22shrestha@gmail.com',
                    password: '$2a$10$s9ZXlLt1XUzWnoesgRuw2e86yyJQkSo.LGK2bd5qoAL2wTbWf6S8u',
                })
                .end((err, response) => {
                    response.should.have.status(200)
                    var token = response.body.token
                    const userId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
                    const item = {  
                        name:'Pant',
                        description:'White Pant',
                        price: '500', 
                        color: 'White', 
                        size: 'Medium', 
                        subCategoryId: '93a82fda-9e0c-4797-bd3d-b973438e3ce4', 
                    } 
                    chai.request(server)
                        .post('/api/admin/items/new')
                        .set('Authorization', 'Bearer ' + token)
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

    describe('PUT /api/admin/items', () => {
        it('It should be able to update items', (done) => {
            const itemId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            const updateitem = {
                name:'T-shirt', 
                description:'Green T-shirt', 
                price:'800', 
                color:'Green', 
                size:'Medium', 
                subCategoryId:'93a82fda-9e0c-4797-bd3d-b973438e3ce4', 
                userId:'057c5512-d6b0-4d5d-8215-9fc37f4ff0bd',
            }
            chai.request(server)
                .put('/api/admin/items/update/:itemId/' + itemId)
                .send(updateitem)
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

    describe('Delete /api/admin/items', () => {
        it('It should be able to delete items', (done) => {
            const itemId = '057c5512-d6b0-4d5d-8215-9fc37f4ff0bd';
            chai.request(server)
                .delete('/api/admin/users/delete/:userId/'+ itemId)
                .end((err, response) => {
                    response.should.have.status(200)
                    done()
                })
        })
    })
})