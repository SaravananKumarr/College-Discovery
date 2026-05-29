import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = signToken({ userId: user.id, email: user.email })
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
    response.cookies.set('auth-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/', sameSite: 'lax' })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('auth-token')
  return response
}
