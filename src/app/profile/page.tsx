'use client'

import { useEffect, useState } from 'react'
import LeftSidebar from './../components/LeftSidebar'
import RightSection from './../components/RightSection'
import { fetchSessionUser } from './../lib/fetchSessionUser';
import type { SessionUser } from './../lib/fetchSessionUser'
import { redirect, useParams, useRouter } from 'next/navigation';
import { Profile } from '@/app/lib/types';
import { FaArrowLeft } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { RiLink } from 'react-icons/ri';
import { SlCalender } from 'react-icons/sl';
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(relativeTime);

const Page = () => {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessionUserProfile, setsessionUserProfile] = useState<Profile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const params = useParams();
  const profileId = params?.profileid as string; 
  const router = useRouter();


  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchSessionUser();
      setSessionUser(userData);
    //   console.log(userData)
      redirect(`/profile/${userData?.id}`)
    };
    getUser();
  }, []);
 

  return (
    <div className="w-full h-full flex justify-center text-white items-center relative bg-black">
      <div className="max-w-screen w-full h-full flex relative">
        <LeftSidebar user={sessionUser} />

         <div className="w-[47%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
         </div>

        <RightSection user={sessionUser} />
      </div>
    </div>
  )
}

export default Page
