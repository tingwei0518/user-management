import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
import { userSchema } from '@/app/lib/validation'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 });
    }

    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, phone, gender, birthday, occupation, profileImage } = result.data;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        phone,
        gender,
        birthday: new Date(birthday),
        occupation,
        profileImage: profileImage || ''
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
