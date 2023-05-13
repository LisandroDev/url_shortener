import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const urlToRedirect = request.url.split('http://localhost:3000/')[1];
  redirect(`//${urlToRedirect}`);
}
