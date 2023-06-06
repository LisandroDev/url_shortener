import getCurrentUser from '@/app/actions/getCurrentUser';
import getStats from '@/app/actions/getStats';
import getUrls from '@/app/actions/getUrls';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const urls = await getUrls();
    const stats = await getStats();

    return NextResponse.json({ urls: urls, stats: stats });
  } catch (error) {
    console.log('ENDPOINT: API/DASHBOARD | METHOD:GET MESSAGE: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
