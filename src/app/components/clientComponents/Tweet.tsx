'use client'
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { AiFillHeart, AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai"
import { IoShareOutline, IoStatsChartOutline } from "react-icons/io5"
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { TweetType } from "@/app/lib/types"
import { useEffect, useState } from "react"
import { fetchSessionUser } from '../../lib/fetchSessionUser';
import type { SessionUser } from '../../lib/fetchSessionUser'
import Link from "next/link";

type Props = {
    tweet: TweetType;
  };

dayjs.extend(relativeTime);



const Tweet =  ({ tweet }: Props) => {
    const [tweetUser, setTweetUser] = useState<any>(null);
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [hasLiked, setHasLiked] = useState(false)
    const [likeLoading, setLikeLoading] = useState(false)
    const [hasBookmarked, setHasBookmarked] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const userData = await fetchSessionUser();
            setSessionUser(userData);
          };
      
          getUser();
      }, []);

    useEffect(() => {
        const fetchTweetUser = async () => {
            try {
                const userId = tweet.author; 
                const res = await fetch("/api/tweetUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
                const data = await res.json(); 
                console.log(data);
                setTweetUser(data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };

        fetchTweetUser();
    }, [tweet.author]);



        //like feature******************************


    useEffect(() => {
        if (sessionUser?.id && tweet.likes?.includes(sessionUser.id)) {
          setHasLiked(true)
        }
      }, [sessionUser?.id, tweet.likes])

    const handleLike = async () => {
        if (!sessionUser?.id) return
        setLikeLoading(true)
    
        try {
          const res = await fetch(`/api/toggleLike`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tweetId: tweet._id,
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
        if (sessionUser?.id && tweet.bookmarks?.includes(sessionUser.id)) {
          setHasBookmarked(true);
        }
      }, [sessionUser?.id, tweet.bookmarks]);


      const handleBookmark = async () => {
        if (!sessionUser?.id) return;
      
        try {
          const res = await fetch(`/api/toggleBookmark`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tweetId: tweet._id,
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
      
      
    
    // for like/unlike, tweetId = tweet.id and sessionUserId(const sessionUserId = sessionUser?.id;)
    return (
        <div className="border-b-[0.5px] p-4 flex space-x-4 border-gray-600">
            <div className="w-12 h-10 rounded-full bg-slate-200"></div>
            <div className="flex flex-col space-y-2  w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                        <div className="font-bold text-white">{tweetUser?.fullName || "Unknown"}</div>
                        <div className="text-gray-500 px-1">@{tweetUser?.username || "unknown"}</div>
                        <div className="text-gray-500"><BsDot /></div>
                        <div className="text-gray-500">{dayjs(tweet.createdAt).fromNow()}</div>
                    </div>
                    <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-1">
                        <BsThreeDots />
                    </div>
                </div>

                <Link href={`./post/${tweet._id}`}>
                <div className="text-white text-sm pb-1">
                    {tweet.text}
                </div>
                <div className="bg-slate-400 aspect-square w-full h-80 rounded-2xl">
                </div>
                </Link>
                <div className="flex flex-row px-8 items-center justify-between w-full text-left">
                    <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-2">
                        <BsChat />
                    </div>
                    <div className="text-gray-400 rounded-full cursor-pointer hover:bg-green-600/20 hover:text-green-600 p-2">
                        <AiOutlineRetweet />
                    </div>
                    <button
                         onClick={handleLike}
                         disabled={likeLoading} 
                         className={`rounded-full cursor-pointer p-2 transition ${
                            hasLiked
                              ? "text-pink-600 hover:bg-pink-600/30"
                              : "text-gray-400 hover:text-pink-600 hover:bg-pink-600/20"}`}
                    >
                    {hasLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    <button
                         onClick={handleBookmark}
                         className={`rounded-full cursor-pointer p-2 transition ${
                            hasBookmarked
                              ? "text-blue-600 hover:bg-blue-400/30"
                              : "text-gray-400 hover:text-blue-600 hover:bg-blue-400/20"}`}
                    >
                    {hasBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
                    </button>                    
                    <div className="text-gray-400 rounded-full cursor-pointer hover:bg-blue-400/20 hover:text-blue-400 p-2">
                        <IoShareOutline />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Tweet
