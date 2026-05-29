import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state') || ''
    const category = searchParams.get('category') || ''
    const type = searchParams.get('type') || ''
    const minFees = parseInt(searchParams.get('minFees') || '0')
    const maxFees = parseInt(searchParams.get('maxFees') || '9999999')
    const sortBy = searchParams.get('sortBy') || 'nirfRank'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {
      fees: { gte: minFees, lte: maxFees },
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (state) where.state = { equals: state, mode: 'insensitive' }
    if (category) where.category = { equals: category, mode: 'insensitive' }
    if (type) where.type = { equals: type, mode: 'insensitive' }

    const orderBy: Record<string, string> = {}
    if (sortBy === 'rating') orderBy.rating = 'desc'
    else if (sortBy === 'fees_asc') orderBy.fees = 'asc'
    else if (sortBy === 'fees_desc') orderBy.fees = 'desc'
    else orderBy.nirfRank = 'asc'

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { placements: true }
      }),
      prisma.college.count({ where })
    ])

    return NextResponse.json({
      colleges,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
