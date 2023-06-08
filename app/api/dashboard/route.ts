import getCurrentUser from '@/app/api/utils/getCurrentUser';
import getStats from '@/app/api/utils/getStats';
import getUrls from '@/app/api/utils/getUrls';
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
