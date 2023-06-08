import { redirect } from 'next/navigation';
import prisma from '../libs/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import getCountryName from '../api/utils/getCountryName';
import { updateOrCreateCountryViews } from './utils/updateOrCreateCountryViews';


export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const shortUrl_string = request.url.split(origin + '/')[1];
  const forwardedIP =
    request.headers.get('x-forwarded-for')?.split(',')[0] || '';

  // Find Full URL By Alias

  const url_db = await prisma.shortURL.findFirst({
    where: { alias: shortUrl_string },
  });

  if (!url_db) {
    return null;
  }

  // Retrieve the country name from the Geolocation API based on the IP provided in the headers then update or create Country Views.

  const requestFromCountryName = process.env.NODE_ENV ==='production' ? await getCountryName(forwardedIP)  : null;

  if (requestFromCountryName ) {
    try {
      await updateOrCreateCountryViews(requestFromCountryName, url_db);
    } catch (error) {
      console.error('Error updating country views:', error);
    }
  }

  // Update Views on ShortURL

  await prisma.shortURL.update({
    where: { id: url_db.id },
    data: { views: url_db.views + 1 },
  });

  url_db.fullUrl.startsWith('https://') || url_db.fullUrl.startsWith('http://')
    ? redirect(url_db.fullUrl)
    : redirect(`//${url_db.fullUrl}`);

  return new NextResponse('Not Found: Not a valid short url', { status: 404 });
}
