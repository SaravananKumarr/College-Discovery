import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id: collegeId } = await params

    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId: user.userId, collegeId } }
    })

    if (existing) {
      await prisma.savedCollege.delete({
        where: { userId_collegeId: { userId: user.userId, collegeId } }
      })
      return NextResponse.json({ saved: false })
    } else {
      await prisma.savedCollege.create({
        data: { userId: user.userId, collegeId }
      })
      return NextResponse.json({ saved: true })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
