import 'dotenv/config'

const CONFIG = {
  courseDB: process.env.CourseDB,
  jwtPublicKey: `${process.env.jwtPublicKey ?? ''}`,
  jwtPrivateKey: `${process.env.jwtSecretKey ?? ''}`
}

export default CONFIG
