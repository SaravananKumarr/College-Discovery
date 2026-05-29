import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    })

    const token = signToken({ userId: user.id, email: user.email })
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
    response.cookies.set('auth-token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/', sameSite: 'lax' })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
