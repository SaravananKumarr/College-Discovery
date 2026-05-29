import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        placements: true,
        courses: true,
        reviews: {
          include: { user: { select: { name: true, id: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    const user = await getCurrentUser()
    let isSaved = false
    if (user) {
      const saved = await prisma.savedCollege.findUnique({
        where: { userId_collegeId: { userId: user.userId, collegeId: id } }
      })
      isSaved = !!saved
    }

    return NextResponse.json({ ...college, isSaved })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
