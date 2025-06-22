'use client'
import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import LeftSidebar from '@/app/components/LeftSidebar';
import RightSection from '@/app/components/RightSection';
import { fetchSessionUser } from '../../lib/fetchSessionUser';
import type { SessionUser } from '../../lib/fetchSessionUser'
import type { PostType } from "@/app/lib/types"
import { FaArrowLeft } from 'react-icons/fa6';
import { BsChat, BsThreeDots } from 'react-icons/bs';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { IoBookmark, IoBookmarkOutline, IoShareOutline } from 'react-icons/io5';
import ComposeTweet from '@/app/components/server-components/ComposeTweet';
import ComposeReply from '@/app/components/server-components/ComposeReply';
import RepliesSection from '../../components/server-components/RepliesSection';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);

type Post = PostType;

const page = () => {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [postUser, setPostUser] = useState<any>(null);
  const [hasLiked, setHasLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [hasBookmarked, setHasBookmarked] = useState(false);

  const params = useParams();
  const postId = params?.postid;

  const router = useRouter();

  // To fetch the main tweet using tweet id from params
  useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch("/api/fullpost", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postId }),
                });
                const data = await res.json(); 
                console.log(data);
                setPost(data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchPost();
    }, []);

  // To fetch the user data from the post 
useEffect(() => {
        const fetchPostUser = async () => {
            try {
                const userId = post?.author; 
                const res = await fetch("/api/tweetUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
                const data = await res.json(); 
                console.log(data);
                setPostUser(data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchPostUser();
    }, [post?.author]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchSessionUser();
      setSessionUser(userData);
      console.log(sessionUser);
    };
    getUser();
  }, []);


      //like feature******************************


    useEffect(() => {
        if (sessionUser?.id && post?.likes?.includes(sessionUser.id)) {
          setHasLiked(true)
        }
      }, [sessionUser?.id, post?.likes])

    const handleLike = async () => {
        if (!sessionUser?.id) return
        setLikeLoading(true)
    
        try {
          const res = await fetch(`/api/toggleLike`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tweetId: post?._id,
              sessionUserId: sessionUser.id,
            }),
          })
    
          const data = await res.json()
          if (res.ok && data.success) {
            setHasLiked(data.liked)
          } else {
            console.error(data.error || "Unknown error")
          }
        } catch (error) {
          console.error("Error toggling like:", error)
        } finally {
          setLikeLoading(false)
        }
      }


      //    bookmark feature********************

      useEffect(() => {
        if (sessionUser?.id && post?.bookmarks?.includes(sessionUser.id)) {
          setHasBookmarked(true);
        }
      }, [sessionUser?.id, post?.bookmarks]);


      const handleBookmark = async () => {
        if (!sessionUser?.id) return;
      
        try {
          const res = await fetch(`/api/toggleBookmark`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tweetId: post?._id,
              sessionUserId: sessionUser.id,
            }),
          });
      
          const data = await res.json();
          if (res.ok && data.success) {
            setHasBookmarked(data.bookmarked);
          } else {
            console.error(data.error || "Unknown error");
          }
        } catch (error) {
          console.error("Error toggling bookmark:", error);
        }
      };

  return (
    <>
      <div className='w-full h-full flex justify-center text-white items-center relative bg-black'>
        <div className='max-w-screen w-full h-full flex relative'>
          <LeftSidebar user={sessionUser} />

          <div className="w-[47%] mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
            <div className='flex items-center space-x-3'>
              <button onClick={() => router.back()} className="text-lg p-3 backdrop-blur bg-black/10 sticky top-0"><FaArrowLeft /></button>
              <h1 className="text-xl font-bold p-3 backdrop-blur bg-black/10 sticky top-0">Post</h1>
            </div>

            {/* Post Section Starts */}

            <div className=" p-4 flex space-x-4">
              <div className="flex flex-col space-y-2  w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                    <div className=''>
                      <Link href={`../profile/${postUser?._id}`}>
                      <div className="font-bold text-white">{postUser?.fullName || "Unknown"}</div>
                      <div className="text-gray-500">@{postUser?.username || "Unknown"}</div>
                      </Link>
                    </div>
                  </div>
                  <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-1">
                    <BsThreeDots />
                  </div>
                </div>

                <div>
                  <div className="text-white">
                    {post?.text}
                  </div>
                  <div className="bg-slate-400 aspect-square w-full h-80 rounded-2xl py-1">
                  </div>
                  <div className='my-2 text-gray-400'>
                    {dayjs(post?.createdAt).format('hh:mm A · MMM D, YYYY')}
                  </div>
                </div>
                <div className="flex text-xl flex-row px-8 py-2 items-center justify-between w-full text-left border-b-[0.5px] border-t-[0.5px] border-gray-600">
                  <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-2">
                    <BsChat />
                  </div>
                  <div className="text-gray-400 rounded-full cursor-pointer hover:bg-green-600/20 hover:text-green-600 p-2">
                    <AiOutlineRetweet />
                  </div>
                  <button
                   onClick={handleLike}
                   disabled={likeLoading} 
                   className={`flex items-center rounded-full cursor-pointer p-2 transition ${
                      hasLiked
                        ? "text-pink-600 hover:bg-pink-600/30"
                        : "text-gray-400 hover:text-pink-600 hover:bg-pink-600/20"}`}
                  >
                    {hasLiked ? <AiFillHeart /> : <AiOutlineHeart />} <span className='text-md px-1'>{post?.likes.length}</span>
                    
                  </button>
                  <button
                   onClick={handleBookmark}
                   className={`flex items-center rounded-full cursor-pointer p-2 transition ${
                      hasBookmarked
                        ? "text-blue-600 hover:bg-blue-400/30"
                        : "text-gray-400 hover:text-blue-600 hover:bg-blue-400/20"}`}
                  >
                    {hasBookmarked ? <IoBookmark /> : <IoBookmarkOutline />} <span className='text-md px-1'>{post?.bookmarks.length}</span>
                  </button>
                  <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-2">
                    <IoShareOutline />
                  </div>
                </div>
              </div>
            </div>

            {/* Reply section &&&&&&*********************************** */}
            
            <ComposeReply tweetId={post?._id}/>

            {/* **********Replies section here*************** */}

            <RepliesSection tweetId={post?._id}/>
              
          </div>

          <RightSection user={sessionUser} />
        </div>
      </div>

    </>
  )
}

export default page
