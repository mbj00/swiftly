'use client'

import { useEffect, useState } from 'react'
import LeftSidebar from '../../components/LeftSidebar'
import RightSection from '../../components/RightSection'
import { fetchSessionUser } from '../../lib/fetchSessionUser';
import type { SessionUser } from '../../lib/fetchSessionUser'
import { useParams, useRouter } from 'next/navigation';
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
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/fetchprofile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId }),
        });
        const data = await res.json();
        // console.log("***********PROFILE****************");
        // console.log(data);
        setProfile(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    if (profileId) fetchProfile();
  }, [profileId]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchSessionUser();
      setSessionUser(userData);
    };
    getUser();
  }, []);

  useEffect(() => {
     const sessionUserId = sessionUser?.id;
    const fetchsessionUserProfile = async () => {
      try {
        const res = await fetch("/api/fetchprofile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId: sessionUserId }),
        });
        const data = await res.json();
        console.log("***********SESSION USER PROFILE****************");
        console.log(data);
        setsessionUserProfile(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchsessionUserProfile();
  }, [sessionUser]);

  useEffect(() => {
    if (Array.isArray(sessionUserProfile?.following) && profileId) {
      setIsFollowing(sessionUserProfile.following.includes(profileId));
    } else {
      setIsFollowing(false);
    }
  }, [sessionUserProfile, profileId]);

  const handleFollow = async () => {
    const sessionUserId = sessionUser?.id
    const res = await fetch(`/api/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionUserId, profileId
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setIsFollowing(true);
    } else {
      console.error(data.error || "Unknown error");
    }
  }

  const handleUnfollow = async () => {
    const sessionUserId = sessionUser?.id
    const res = await fetch(`/api/unfollow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionUserId, profileId
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setIsFollowing(false);
    } else {
      console.error(data.error || "Unknown error");
    }
  }

  const isDataReady = profile && sessionUserProfile && typeof isFollowing === 'boolean';

  return (
    <div className="w-full h-full flex justify-center text-white items-center relative bg-black">
      <div className="max-w-screen w-full h-full flex relative">
        <LeftSidebar user={sessionUser} />

        {/* Profile content */}
        <div className="w-[47%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
          <div className="flex items-center space-x-6 sticky top-0 backdrop-blur bg-black/10 p-3 z-10">
            <button onClick={() => router.back()} className="text-lg">
              <FaArrowLeft />
            </button>
            <div>
              <div className="font-bold text-white">{profile?.fullName || "Unknown"}</div>
              <div className="text-gray-400 text-sm">{profile?.tweets.length} posts</div>
            </div>
          </div>
          <div className="bg-slate-400 w-full h-40 top-0">
          </div>

          <div className='flex items-center justify-between'>
            <div className='bg-blue-600 w-32 h-32 rounded-full border-3 border-black mt-[-60px] ml-6'></div>
            <div>
              <button className='border-1 border-gray-600 rounded-full p-2 m-2'>
                <BsThreeDots />
              </button>
              {isDataReady ? (
                (profile && sessionUserProfile) ? (
                  sessionUserProfile._id === profile._id ? (
                    <button className="font-bold text-white bg-black rounded-full py-2 px-4 mr-2 border-gray-600 border">
                      Edit Profile
                    </button>
                  ) : (
                    isFollowing ? (
                      <button
                        onClick={handleUnfollow}
                        className="font-bold text-white bg-black rounded-full py-2 px-4 mr-2 border-gray-600 border"
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={handleFollow}
                        className="font-bold text-black bg-white rounded-full py-2 px-4 mr-2"
                      >
                        Follow
                      </button>
                    )
                  )
                ) : (
                  <div className="py-2 px-4 mr-2 text-sm text-gray-400 animate-pulse">Loading...</div>
                )
              ) : null
              }


            </div>
          </div>

          <div className='my-2 mx-4 border-b border-gray-600'>
            <div>
              <div className="font-bold text-white text-xl">{profile?.fullName || "Unknown"}</div>
              <div className="text-gray-500 ">@{profile?.username || "Unknown"}</div>
            </div>
            <div className='my-3'>
              <p>
                It's not enough that I succeed - others must also succeed
                🇨🇦 ✝️ 🇺🇸

                Dad, expert burper
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <span className='flex items-center'><IoLocationOutline className='text-gray-400 mr-1' />Canada</span>
              <span className='flex items-center'><RiLink className='text-gray-400 mr-1' />vibranium.app</span>
              <span className='flex items-center'><SlCalender className='text-gray-400 mr-1' />Joined {dayjs(profile?.createdAt).format('MMM, YYYY')}</span>
            </div>
            <div className='my-2 flex space-x-3 items-center'>
              <span className='flex space-x-1 items-center'><p className='font-bold'>{profile?.following.length}</p> <p className='text-gray-400'>Following</p></span>
              <span className='flex space-x-1 items-center'><p className='font-bold'>{profile?.followers.length}</p> <p className='text-gray-400'>Followers</p></span>
            </div>
          </div>




        </div>

        <RightSection user={sessionUser} />
      </div>
    </div>
  )
}

export default Page
