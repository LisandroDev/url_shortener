import getCurrentUser from '@/app/utils/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import { UnauthorizedError } from '@/app/error/Error';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { urlsToDelete } = body;

    if (!currentUser) {
      throw new UnauthorizedError('User not authenticated');
    }

    const deleteUrls = await prisma.shortURL.deleteMany({
      where: { ownerId: currentUser.id , id: { in: urlsToDelete} },
    });

    if (!deleteUrls) {
      return new NextResponse('Error at delete', { status: 500 });
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error: any) {
    console.log('ENDPOINT: API/URL/DELETE | METHOD:DELETE MESSAGE: ', error);
    return new NextResponse('Error', { status: error.statusCode || 500 });
  }
}
