const { updateContact } = require('../controllers/contacts')
const Contacts = require('../repositories/contacts')
const { expectCt } = require('helmet')



jest.mock('../repositories/contacts')

describe('Unitn test controller contacts', () => {
    const contact =  {id:3, name: 'yula'}
    const req = {user: {id: 1}, body:{}, params: {id: 1}}
    const res = {status: jest.fn().mockReturnThis(),
         json: jest.fn((data) => data)}
    const next = jest.fn()
    it('test update contact exist', async ()=>{
        Contacts.updateContact = jest.fn(()=>{
            return contact
        })
        const result = await updateContact(req, res, next)
       expect(result.status).toEqual('succes')
       expect(result.code).toEqual(200)
       expect(result.data.result).toEqual(result.data.result)
    })
    it('update contact not exist', async ()=>{
        Contacts.updateContact = jest.fn()
      
        const result = await updateContact(req, res, next)
       expect(result.status).toEqual('error')
       expect(result.code).toEqual(404)
       expect(result.message).toEqual('Not found')
    })
    it('update contact : repositories return Error', async ()=>{
        Contacts.updateContact = jest.fn(()=>{
          throw  new Error('Ups')
        })
      
        await updateContact(req, res, next)
       expect(next).toHaveBeenCalled()
      
    })
})