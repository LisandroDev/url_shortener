import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import isEmail from 'validator/lib/isEmail';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!isEmail(email)) {
      throw new Error('Not a valid email');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('ENDPOINT: API/REGISTER | METHOD:POST MESSAGE: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
