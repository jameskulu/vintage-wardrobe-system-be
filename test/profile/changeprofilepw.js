const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('PUT /api/users/profile/change-password', () => {
        it('It should be able to change profile password', (done) => { 
            const userId = 3487;
            const changepw = {
                oldPassword : 'arch',
                newPassword :'arch12345',  
            }
            chai.request(server)
                .put('/api/users/profile/change-password/' + userId)
                .send(changepw)
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