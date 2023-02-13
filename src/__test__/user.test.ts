import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import InitServer from '../Utils/initServer'
import { CreateRole } from '../Services/Role/role.service'

const app = InitServer()
const payloadLogin = { email: 'name@random.com', password: 'password' }
const payloadRegister = { email: 'name@random.com', password: 'password', name: 'name', roleType: 'Admin' }
let refreshToken = ''
let accessToken = ''

describe('user', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    const db = await MongoMemoryServer.create()
    await mongoose.connect(db.getUri()).then(() => {
      console.log('Connected to database')
    })
    await CreateRole({
      name: 'Admin',
      description: 'Admin web'
    }).then(() => {
      console.log('Created role success')
    })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('register', () => {
    describe('register success', () => {
      it('should return 201', async () => {
        const { status } = await supertest(app)
          .post('/user/register')
          .send({ ...payloadRegister })

        expect(status).toBe(201)
      })
    })

    describe('register failure', () => {
      it('should return 400', async () => {
        const { status } = await supertest(app)
          .post('/user/register')
          .send({ ...payloadRegister })
        expect(status).toBe(400)
      })
    })
  })

  describe('login user', () => {
    describe('login success', () => {
      it('should return 200', async () => {
        const { status, body } = await supertest(app)
          .post('/user/login')
          .send({ ...payloadLogin })

        expect(status).toBe(200)
        accessToken = body.data.accessToken
        refreshToken = body.data.refreshToken
      })
    })
  })

  describe('refresh token', () => {
    describe('refresh token success', () => {
      it('should return 200', async () => {
        const { status } = await supertest(app).post('/user/refresh').send({ refreshToken })
        expect(status).toBe(200)
      })
    })

    describe('refresh token failure', () => {
      it('should return 500', async () => {
        const { status } = await supertest(app).post('/user/refresh').send({ refreshToken: 'invalid' })
        expect(status).toBe(500)
      })
    })
  })
})
