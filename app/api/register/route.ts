import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import isEmail from 'validator/lib/isEmail';
import { NextResponse, NextRequest } from 'next/server';
import { BadRequestError } from '@/app/error/Error';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!isEmail(email)) {
      throw new BadRequestError('Not a valid email');
    }

    const emailDB = await prisma.user.findUnique({where:{email: email}})

    if(emailDB){
      return NextResponse.json({error: 'Email already registered'})
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log('ENDPOINT: API/REGISTER | METHOD:POST MESSAGE: ', error);
    return new NextResponse( `${error.message}` , { status: error.statusCode || 500 });
  }
}
