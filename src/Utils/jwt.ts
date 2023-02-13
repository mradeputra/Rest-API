import jwt from 'jsonwebtoken'
import CONFIG from '../Config/environment'

export const signJwt = (payload: Record<string, unknown>, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, CONFIG.jwtPrivateKey, { ...(options && options), algorithm: 'RS256' })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwtPublicKey, { algorithms: ['RS256'] })
    return { isValid: true, expired: false, decoded }
  } catch (error: any) {
    return { isValid: false, expired: error.name === 'TokenExpiredError', decoded: null }
  }
}
