import { ShortURL } from '@prisma/client';
import prisma from '../../libs/prismadb';

export async function updateOrCreateCountryViews(
  requestFromCountryName: string,
  url_db: ShortURL
) {
  try {
    const countryViews = await prisma.countryViews.findFirst({
      where: { country_name: requestFromCountryName, shortURLId: url_db.id },
    });

    if (countryViews) {
      await prisma.countryViews.update({
        where: { id: countryViews.id },
        data: { views: countryViews.views + 1 },
      });
    } else {
      await prisma.countryViews.create({
        data: {
          country_name: requestFromCountryName,
          views: 1,
          shortURLId: url_db.id,
        },
      });
    }
  } catch (error) {
    console.error('Error updating or creating country views:', error);
    throw error;
  }
}
