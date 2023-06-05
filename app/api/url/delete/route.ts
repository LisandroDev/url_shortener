import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { urlsToDelete } = body;

    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const deleteUrls = await prisma.shortURL.deleteMany({
      where: { ownerId: currentUser.id , id: { in: urlsToDelete} },
    });

    if (!deleteUrls) {
      return new NextResponse('Error at delete', { status: 500 });
    }

    return new NextResponse('Success', { status: 200 });
  } catch (error) {
    console.log('ENDPOINT: API/URL | METHOD:DELETE MESSAGE: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
