import Link from "next/link"
import { BiHomeCircle, BiUser } from "react-icons/bi"
import { BsBell, BsBookmark, BsThreeDots } from "react-icons/bs"
import { HiOutlineHashtag } from "react-icons/hi"
import { HiOutlineEnvelope } from "react-icons/hi2"
import { GiArrowWings } from "react-icons/gi";

type Props = {
  user: {
    id: string;
    email: string;
    username: string;
    fullname: string;
  } | null;
};

const NAVIGATION_ITEMS = [
  {
    title: '',
    icon: GiArrowWings
  },
  {
    title: 'Home',
    icon: BiHomeCircle,
    source : ""
  },
  {
    title: 'Explore',
    icon: HiOutlineHashtag,
    source : "explore"
  },
  {
    title: 'Notifications',
    icon: BsBell,
    source : "notifications"
  },
  {
    title: 'Messages',
    icon: HiOutlineEnvelope,
    source : "messages"
  },
  {
    title: 'Bookmarks',
    icon: BsBookmark,
    source : "bookmarks"
  },
  {
    title: 'Profile',
    icon: BiUser,
    source : "profile"
  },
]

const LeftSidebar = ({ user }: Props) => {
    return (
        <section className='w-[23%] sticky top-0 hidden lg:flex flex-col items-stretch h-screen space-y-2 my-2'>
            <div className="w-full flex flex-col items-stretch h-screen">
                {
                    NAVIGATION_ITEMS.map((item) => (
                        <Link className="hover:bg-white/10 transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-3 px-4" href={`/${item.source}`} key={item.title}>
                            <div className="text-2xl">
                                <item.icon />
                            </div>
                            <div className="text-xl">{item.title}</div>
                        </Link>
                    ))
                }
                {/* <button className="mx-6 bg-white rounded-full text-xl text-black font-bold py-3 text-center hover:bg-white/80 transition duration-200">
                    Post
                </button> */}
            </div>
            <button className=" flex items-center justify-between bg-transparent rounded-full pr-3 pl-1 py-3 mx-4 hover:bg-white/10">
                <div className="flex items-center justify-center space-x-3">
                  <div className="rounded-full bg-slate-400 w-8 h-8"></div>
                <div className="flex flex-col text-left">
                    <div className="text-sm font-bold">{user?.fullname}</div>
                    <div className="text-xs">@{user?.username}</div>
                </div>
                </div>
                <div >
                    <BsThreeDots />
                </div>
            </button>
        </section>
    )
}

export default LeftSidebar
