import Feature from "./feature"
import { MdQueryStats } from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import { BsHandThumbsUp } from 'react-icons/bs'

const Features = () => {
    return (
        <section className=" max-w-5xl flex flex-col items-center md:flex-row gap-8 mt-16">
        <Feature icon={BsHandThumbsUp} title='Easy' description='URL Shortener is easy and fast, enter the long link to get your shortened link' />
        <Feature icon={FiLink} title='Shortened' description='Use any link, no matter what size, ShortURL always shortens' />
        <Feature icon={MdQueryStats} title='Statistics' description='Check the number of clicks that your shortened URL received' />
        </section>
    )
}

export default Features