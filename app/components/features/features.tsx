import Feature from "./feature"
import { MdQueryStats } from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import { BsHandThumbsUp } from 'react-icons/bs'
import { BiCustomize } from 'react-icons/bi'

const Features = () => {
    return (
        <section className=" max-w-5xl items-center flex flex-col md:items-start md:flex-row gap-8 md:mt-16">
        <Feature icon={BsHandThumbsUp} title='Easy' description='URL Shortener is easy and fast, enter the long link to get your shortened link' />
        <Feature icon={FiLink} title='Shortened' description='Use any link, no matter what size, URL Shortener always shortens' />
        <Feature userOnly={true} icon={MdQueryStats} title='Statistics' description='Check the number of clicks that your shortened URL received' />
        <Feature userOnly={true} icon={BiCustomize} title="Custom Alias" description="Choose your own unique names or keywords for easy sharing and better branding." />
        </section>
    )
}

export default Features