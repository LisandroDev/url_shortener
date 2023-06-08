import getCurrentUser from "./getCurrentUser"
import prisma from '../../libs/prismadb'

const getUrls = async () => {
    
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return null;
    }

    const urls = await prisma.shortURL.findMany({where:{ownerId: currentUser.id}})

    if(!urls){
        return null;
    }

    return urls
}

export default getUrls