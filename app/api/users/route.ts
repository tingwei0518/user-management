import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseForm, saveFile } from '@/app/lib/upload'
import { prisma } from '@/prisma/client'
import { mkdir } from 'fs/promises'
import { uploadDir } from '@/app/lib/upload'
import { Gender, Occupation } from '@/app/users/components/UserModal/constants'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: NextRequest) {
  try {
    await mkdir(uploadDir, { recursive: true })

    const { fields, files } = await parseForm(request)
    console.log('Parsed fields:', fields)
    console.log('Parsed files:', files)

    if (!fields.name || !fields.gender || !fields.birthday || !fields.occupation || !fields.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let profileImage = ''
    if (files.profileImage) {
      try {
        profileImage = await saveFile(files.profileImage)
        console.log('File saved:', profileImage)
      } catch (error) {
        console.error('Error saving file:', error)
        return NextResponse.json(
          { error: 'Failed to save file' },
          { status: 500 }
        )
      }
    }

    try {
      const user = await prisma.user.create({
        data: {
          name: fields.name,
          gender: fields.gender as Gender,
          birthday: new Date(fields.birthday),
          occupation: fields.occupation as Occupation,
          phone: fields.phone,
          profileImage: profileImage || '',
        },
      })
      console.log('User created:', user)
      return NextResponse.json(user)
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

