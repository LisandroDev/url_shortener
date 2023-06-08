import { NextResponse } from "next/server";
import getCurrentUser from "@/app/api/utils/getCurrentUser";
import { BadRequestError, UnauthorizedError } from "@/app/error/Error";
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request){
    try {
        const body = await request.json()
        const user = await getCurrentUser()

        const { shortUrlId } = body.data
        
        if(!user){
            throw new UnauthorizedError('User is not logged in')
        }

        if(!shortUrlId){
            throw new BadRequestError('Short URL was not provided')
        }

        const viewsPerCountry = await prisma.countryViews.findMany({where: {shortURLId: shortUrlId}})

        return NextResponse.json({ viewsPerCountry: viewsPerCountry })

    } catch (error) {
        console.log('ENDPOINT: API/DASHBOARD/COUNTRIESVIEWS | METHOD:GET MESSAGE: ', error);
        return new NextResponse('Error', { status: 500 });
      }
}