
import prisma from '../libs/prismadb';
import getCurrentUser from './getCurrentUser';
import getSession from './getSession';

const getStats = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const totalShortUrl = await prisma.shortURL.count({
      where: { owner: currentUser },
    });

    const totalViews = await prisma.shortURL.aggregate({
      where: { ownerId: currentUser.id },
      _sum: { views: true },
    });

    if (!totalShortUrl || !totalViews) {
      return null;
    }

    return { totalViews: totalViews._sum , totalLinks: totalShortUrl };
  } catch (error: any) {
    return null;
  }
};

export default getStats;
