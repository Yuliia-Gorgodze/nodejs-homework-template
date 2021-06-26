const request = require('supertest')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = require('../app')
const db = require('../model/db')
const User = require('../model/users')
const Contact = require('../model/contact')
const Users = require('../repositories/users')
const {contact, newUser} = require('./data/data')
describe('Test route cats', ()=>{
    let user, token
    beforeAll(async () => {
    await db
    await User.deleteOne({email: newUser.email})
    user = await User.create(newUser)
    const SECRET_KEY = process.env.SECRET_KEY
    const issueToken = (payload, secret) => jwt.sign(payload, secret)
    token = issueToken({id: user._id}, SECRET_KEY)
    await Users.updateToken(user._id, token)
    })
    afterAll(async()=>{
        const mongo = await db
        await User.deleteOne({email: newUser.email})
        await mongo.disconnect()
    })
    beforeEach(async()=>{
       await Contact.deleteMany({})
    })
    describe('GET request', ()=>{
        it('shoul return status 200 get all contacts', async ()=> {
          const response = 
              await request(app).get('/api/contacts')
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.status).toBeDefined()
       
            expect(response.body.data.result).toBeInstanceOf(Array)
        })
        it('shoul return status 200 get all contact by id', async ()=> {
            const newContact = await Contact.create({...contact, owner: user._id})
            const response = 
              await request(app).get(`/api/contacts/${newContact._id}`)
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(200)
            expect(response.status).toBeDefined()
       
            expect(response.body.data.result).toHaveProperty('id')

            expect(response.body.data.result.id).toBe(String(newContact._id))
        })
        it('shoul return status 404 get contact without id ', async ()=> {
            const fakeId = '60d731af87cde43d10bd2483'
            const response = 
              await request(app).get(`/api/contacts/${fakeId}`)
              .set('Authorization', `Bearer ${token}`)
            expect(response.status).toEqual(404)
            expect(response.status).toBeDefined()
        })
        it('shoul return status 404 get contact wrong id ', async ()=> {
            
        })
    })
    describe('POST request', ()=>{
        it('shoul return status 201 create contacts', async ()=> {
            const response = 
                await request(app).post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send(contact)
                .set('Accept', 'application/json')
        
              expect(response.status).toEqual(201)
              expect(response.status).toBeDefined()
         
          })
    })
    describe('Get request', ()=>{})
})