import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/prisma/client'
import { Gender, Occupation } from '@/app/types/enums'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.name || !data.gender || !data.birthday || !data.occupation || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          gender: data.gender as Gender,
          birthday: new Date(data.birthday),
          occupation: data.occupation as Occupation,
          phone: data.phone,
          profileImage: data.profileImage || '',
        },
      })
      return NextResponse.json(user, { status: 201 })
    } catch (error) {
      console.error('Error creating user in database:', error)
      return NextResponse.json(
        { error: 'Failed to create user in database', details: error },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in POST handler:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}

