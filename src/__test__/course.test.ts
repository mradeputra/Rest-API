import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import InitServer from '../Utils/initServer'
import { CreateRole } from '../Services/Role/role.service'
import { LoginUser, RegisterUser } from '../Services/User/user.service'

const app = InitServer()
const payloadLogin = { email: 'name@random.com', password: 'password' }
const payloadRegister = { email: 'name@random.com', password: 'password', name: 'name', roleType: 'Admin' }
const payloadCreate = { title: 'belajar typescript', author: 'putra', price: 10000 }
let refToken = ''
let accToken = ''
let courseId = ''

describe('course', () => {
  beforeAll(async () => {
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

    await RegisterUser({ ...payloadRegister })

    const { accessToken, refreshToken } = await LoginUser({ ...payloadLogin })
    accToken = accessToken
    refToken = refreshToken
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('healthCheck', () => {
    it('should return status 200', async () => {
      const { status } = await supertest(app).get('/health')
      expect(status).toBe(200)
    })
  })

  describe('create course', () => {
    describe('create course success', () => {
      it('should create course success 201', async () => {
        const { status, body } = await supertest(app)
          .post('/course/insert')
          .set('Authorization', 'Bearer ' + accToken)
          .send({ ...payloadCreate })
        courseId = body.data.id
        expect(status).toBe(201)
      })
    })
  })

  describe('get all courses', () => {
    describe('get all success 200', () => {
      it('should return all courses 200', async () => {
        const { status } = await supertest(app)
          .get('/course')
          .set('Authorization', 'Bearer ' + accToken)

        expect(status).toBe(200)
      })
    })

    describe('get all failure', () => {
      jest.setTimeout(10000)
      it('should return error 401', async () => {
        const { status } = await supertest(app)
          .get('/course')
          .set('Authorization', 'Bearer' + '')

        expect(status).toBe(401)
      })
    })
  })

  describe('get course by id', () => {
    describe('get course by id success 200', () => {
      it('should return course 200', async () => {
        const { status } = await supertest(app)
          .get(`/course/${courseId}`)
          .set('Authorization', 'Bearer ' + accToken)
        expect(status).toBe(200)
      })
    })

    describe('get course not found', () => {
      it('should return error 404', async () => {
        const { status } = await supertest(app)
          .get(`/course/${courseId.replace('a', 'b')}`)
          .set('Authorization', 'Bearer ' + accToken)

        expect(status).toBe(404)
      })
    })
  })

  describe('update course', () => {
    describe('update success', () => {
      it('should update course success 200', async () => {
        const { status } = await supertest(app)
          .put('/course/update')
          .set('Authorization', 'Bearer ' + accToken)
          .send({ id: courseId, ...payloadCreate })

        expect(status).toBe(200)
      })
    })
  })

  describe('count courses', () => {
    describe('count courses success 200', () => {
      it('should return count 200', async () => {
        const { status } = await supertest(app)
          .get('/course/count')
          .set('Authorization', 'Bearer ' + accToken)
        expect(status).toBe(200)
      })
    })
  })

  describe('delete course', () => {
    describe('delete success', () => {
      it('should delete course success 202', async () => {
        const { status } = await supertest(app)
          .delete(`/course/delete/${courseId}`)
          .set('Authorization', 'Bearer ' + accToken)
        expect(status).toBe(202)
      })
    })
  })
})
