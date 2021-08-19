const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')

// Assertion Style
chai.should()
chai.use(chaiHttp)

describe('Profile API', () => {
    describe('PUT /api/users/profile/edit', () => {
        it('It should be able to edit profile', (done) => { 
            const userId = 'eb184a2a-3ae2-4b02-abec-32306617d3de';
            const editprof = {
                firstName : 'James',
                lastName :'Kulu',  
                gender : 'ma',
                address : 'dfsdf',
                city : 'kathmandu',
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