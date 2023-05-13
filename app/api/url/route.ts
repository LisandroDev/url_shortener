import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import isURL from 'validator/lib/isURL';


export async function POST(request: Request) {
  try {
    // Fake delay for Loading State TEST.

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    // Get URL String from body and validate
    const body = await request.json();
    const { url } = body;

    if (!isURL(url)) {
      throw new Error('Url in request is not a valid one!');
    }

    // Hash URL String with MD5 and encode it to base64 then get only the first 7 characters.
    const shortUrl = createHash('md5').update(url).digest('base64');
    return NextResponse.json({ shortUrl: shortUrl.slice(0, 7), testing: validateSomething() });
  } catch (error) {
    console.log('ENDPOINT: API/URL METHOD:POST MESSAGE: ', error);
    return new NextResponse('Error', { status: 500 });
  }
}
