const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('PUT /api/users/profile/edit', () => {
        it('It should be able to edit profile', (done) => { 
            const userId = 3487;
            const editprof = {
                firstName : 'rghsjd',
                lastName :'this is for renting clothes',  
                gender : 'Rs1000',
                address : 'T-shirt',
                city : 'ktm',
                country : 'Nepal',
            }
            chai.request(server)
                .put('/api/users/profile/edit/' + userId)
                .send(editprof)
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