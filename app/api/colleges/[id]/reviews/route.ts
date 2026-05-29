import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id: collegeId } = await params
    const { rating, title, body, pros, cons } = await req.json()

    if (!rating || !title || !body) {
      return NextResponse.json({ error: 'Rating, title and body are required' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: { collegeId, userId: user.userId, rating, title, body, pros, cons },
      include: { user: { select: { name: true, id: true } } }
    })

    // Update college rating
    const allReviews = await prisma.review.findMany({ where: { collegeId } })
    const avgRating = allReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allReviews.length
    await prisma.college.update({
      where: { id: collegeId },
      data: { rating: Math.round(avgRating * 10) / 10, reviewCount: allReviews.length }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
