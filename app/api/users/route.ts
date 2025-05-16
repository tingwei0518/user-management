import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/prisma/client'
import { userSchema } from '@/app/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 });
    }

    const { name, phone, gender, birthday, occupation, profileImage } = result.data;
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        gender,
        birthday: new Date(birthday),
        occupation,
        profileImage: profileImage || ''
      }
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
