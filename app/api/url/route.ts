import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import prisma from '@/app/libs/prismadb';
import isURL from 'validator/lib/isURL';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  try {

    const currentUser = await getCurrentUser();

    // Fake delay for Loading State TEST.

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    // Get URL String from body and validate
    
    const body = await request.json();
    const { url, customAlias } = body;

    if (!isURL(url)) {
      throw new Error('Url in request is not a valid one!');
    }

    // If Alias provided and User logged.
   
    if (currentUser && customAlias) {

      const alias_db = await prisma.shortURL.findFirst({ where: {
        alias: customAlias
      }})

      if(alias_db){
        throw new Error('Alias already in DB')
      }

      const shortUrl = await prisma.shortURL.create({
        data: {
          alias: customAlias,
          fullUrl: url,
          ownerId: currentUser.id,
        },
      });

      return NextResponse.json({ shortUrl: shortUrl.alias, ownership: true });
    }

    // Hash URL String with MD5 and encode it to base64 then retrieve only the first 7 characters.

      const shortUrl_string = createHash('md5')
      .update(url)
      .digest('base64')
      .replaceAll(/[+/=\\]/g, '')
      .slice(0, 7);


    // Check if alias already exists in DB, if true return alias.

    const url_db = await prisma.shortURL.findFirst({
      where: {
        alias: shortUrl_string,
      },
    });

    if (url_db) {
      return NextResponse.json({ shortUrl: url_db.alias, ownership: false });
    }
    
    // Save URL to DB.

    const shortUrl = await prisma.shortURL.create({
      data: {
        alias: shortUrl_string,
        ownerId: currentUser ? currentUser.id : null,
        fullUrl: url,
      },
    });

    return NextResponse.json({ shortUrl: shortUrl.alias, ownership: true });
  } catch (error) {
    console.log('ENDPOINT: API/URL | METHOD:POST MESSAGE: ', error);
    return new NextResponse( `${error}` , { status: 500 });
  }
}

