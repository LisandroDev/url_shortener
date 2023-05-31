import { redirect } from 'next/navigation';
import prisma from '../libs/prismadb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const shortUrl_string = request.url.split(origin + '/')[1];

  // if (shortUrl_string.length !== 7) {
  //   redirect('/error/404');
  // }

  const url_db = await prisma.shortURL.findFirst({
    where: { alias: shortUrl_string },
  });

  if (url_db) {

   const updateViews = await prisma.shortURL.update({
      where: { id: url_db.id },
      data: { views: url_db.views + 1 },
    });

    url_db.fullUrl.startsWith('https://') ||
    url_db.fullUrl.startsWith('http://')
      ? redirect(url_db.fullUrl)
      : redirect(`//${url_db.fullUrl}`);
  }

  return new NextResponse('Not Found: Not a valid short url', { status: 404 });
}
