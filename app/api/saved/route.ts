import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const saved = await prisma.savedCollege.findMany({
      where: { userId: user.userId },
      include: { college: { include: { placements: true } } },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(saved.map((s: { college: unknown }) => s.college))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
