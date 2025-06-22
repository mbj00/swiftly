'use client'

import { useEffect, useState } from 'react'
import LeftSidebar from './../components/LeftSidebar'
import RightSection from './../components/RightSection'
import { fetchSessionUser } from './../lib/fetchSessionUser';
import type { SessionUser } from './../lib/fetchSessionUser'
import { redirect, useParams, useRouter } from 'next/navigation';
import { Profile } from '@/app/lib/types';
import { FaArrowLeft } from 'react-icons/fa6';
import { BsSearch, BsThreeDots } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { RiLink } from 'react-icons/ri';
import { SlCalender } from 'react-icons/sl';
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import BookmarksSection from '../components/server-components/BookmarksSection';


dayjs.extend(relativeTime);

const Page = () => {
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [sessionUserProfile, setsessionUserProfile] = useState<Profile | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const userData = await fetchSessionUser();
            setSessionUser(userData);
            console.log(userData)
        };
        getUser();
    }, []);


    return (
        <div className="w-full h-full flex justify-center text-white items-center relative bg-black">
            <div className="max-w-screen w-full h-full flex relative">
                <LeftSidebar user={sessionUser} />

                <main className="w-[47%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
                    <div className='flex items-center space-x-3'>
                        <button onClick={() => router.back()} className="text-lg p-3 backdrop-blur bg-black/10 sticky top-0 cursor-pointer"><FaArrowLeft /></button>
                        <h1 className="text-xl font-bold p-3 backdrop-blur bg-black/10 sticky top-0">Bookmarks</h1>
                    </div>

                    <div className="text-sm relative w-full h-full py-2 px-4">
                        <label htmlFor="search" className="absolute top-0 pl-3 h-full flex items-center justify-center">
                            <BsSearch className=" text-gray-500 " />
                        </label>
                        <input type="text" name="" id="search" placeholder="Search" className="w-full h-full rounded-full py-3 px-8 outline-none border-[1px] border-gray-600 focus:border-blue-400 hover:bg-neutral-900/90 placeholder:text-white" />
                    </div>

                    <BookmarksSection userId={sessionUser?.id}/>

                </main>

                <RightSection user={sessionUser} />
            </div>
        </div>
    )
}

export default Page
