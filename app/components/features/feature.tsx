import { IconType } from "react-icons"

interface FeatureProps {
    icon: IconType
    title: string
    description: string
    alt?: string
    userOnly?: boolean
}

const Feature: React.FC<FeatureProps> = ({icon: Icon, title, description, userOnly}) => {
    return(<article className="indicator flex items-center flex-col w-2/3 md:w-1/3 gap-y-3 text-center">
        <Icon size={32}/>
        {userOnly && <span className="indicator-item badge badge-sm sm:badge-md badge-accent">For users only</span>  }
        <span className=" font-bold color-[#505050] text-xl">{title}</span>
        <p className="color-[#e5e7eb] text-sm sm:text-md">{description}</p>
        </article>) 
}

export default Feature