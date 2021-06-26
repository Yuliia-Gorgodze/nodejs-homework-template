const request = require('supertest')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
require('dotenv').config()

const app = require('../app')
const db = require('../model/db')
const User = require('../model/users')

const Users = require('../repositories/users')
const {newUserTest} = require('./data/data')
jest.mock('cloudinary')

describe('Test route users', ()=>{
let token
beforeAll(async () => {
    await db
    await User.deleteOne({email: newUserTest.email})
    })
 afterAll(async()=>{
        const mongo = await db
        await User.deleteOne({email: newUserTest.email})
        await mongo.disconnect()
    })

it('Register User', async()=>{
        const response = 
            await request(app).post('/api/users/signup')
            .set('Authorization', `Bearer ${token}`)
            .send(newUserTest)
            .set('Accept', 'application/json')
   
          expect(response.status).toEqual(201)
          expect(response.status).toBeDefined()    
})
it('Create 409 User', async()=>{
    const response = 
    await request(app).post('/api/users/signup')
    .send(newUserTest)
    .set('Accept', 'application/json')

  expect(response.status).toEqual(409)
  expect(response.status).toBeDefined()

})
it(' Login User', async()=>{
    const response = 
    await request(app).post('/api/users/login')
    .send(newUserTest)
    .set('Accept', 'application/json')

  expect(response.status).toEqual(200)
  expect(response.body).toBeDefined()
  token = response.body.data.token
  console.log(token)
})

})