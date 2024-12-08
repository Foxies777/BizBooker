import {jwtDecode} from 'jwt-decode'

type JwtPayload = {
  userId: string
}

export const getUser = (): JwtPayload | null => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decoded: JwtPayload = jwtDecode(token)      
      return decoded
    } catch (error) {
      console.error('Failed to decode token:', error)
    }
  }
  return null
}
