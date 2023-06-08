import axios from "axios"

export default async function getCountryName(ip: string){


    if(ip === ''){
        return null
    }
    
    const geolocationApiResponse = await axios.get(`https://api.country.is/${ip}`)

    if(!geolocationApiResponse){
        return null
    }

    return geolocationApiResponse.data.country
}