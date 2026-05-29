import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'college-discovery-secret-key-change-in-prod'

export function signToken(payload: { userId: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  return verifyToken(token)
}
