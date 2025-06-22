'use client'

import { FaEarthAsia } from "react-icons/fa6"
import { CiCircleList, CiImageOn, CiLocationOn } from "react-icons/ci"
import { MdOutlineGifBox } from "react-icons/md"
import { RiCalendarScheduleLine } from "react-icons/ri"
import { BsEmojiSmile } from 'react-icons/bs'
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchSessionUser } from '../../lib/fetchSessionUser';
import type { SessionUser } from '../../lib/fetchSessionUser'


const ComposeReply = (prop : any) => {
    const tweetId = prop.tweetId;
    // console.log('id is '+ tweetId)
    const [tweetText, setTweetText] = useState('');
    const [user, setUser] = useState<SessionUser | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const userData = await fetchSessionUser();
            setUser(userData);
          };
      
          getUser();
      }, []);


    const handleComposeReply = async () => {
        // console.log(tweetText, user)
        const userId = user?.id;
        const res = await fetch("/api/newreply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({tweetId, tweetText, userId}),
          });
        
          const data = await res.json();
           if (res.ok) {
                alert("Tweet added Successfully");
              } else {
                alert(data.error || "Tweet failed to post");
              }      
    }


    return (
        <div className=" border-b-[0.5px] border-gray-600 h-40 relative flex items-start">
            <div className="w-12 h-10 ml-3 mr-1 mt-9 rounded-full bg-slate-400"></div>
            <div className="flex flex-col w-full mr-4">
                <div className="border-b-[0.5px] border-gray-600">
                    <button className="text-blue-400 bg-transparent rounded-full hover:bg-blue-950">
                        <Link href={'/'} className="flex px-1 mx-2 items-center text-sm space-x-1"><span className="text-gray-400">Reply to </span>&nbsp; @Unknown</Link>
                    </button>
                    <input type="text" 
                        className="w-full h-full p-5 text-xl bg-transparent outline-none border-none" 
                        name="tweetText" id="" placeholder="Post your reply..." 
                        onChange={(e) => setTweetText(e.target.value)} value={tweetText} />
                </div>
                <div className="w-full flex my-3 justify-between items-center">
                    <div className="flex text-blue-400 space-x-3 text-xl p-1 ml-2">
                        <CiImageOn />
                        <MdOutlineGifBox />
                        <CiCircleList />
                        <BsEmojiSmile />
                        <RiCalendarScheduleLine />
                        <CiLocationOn />
                    </div>
                    <div>
                        <button onClick={handleComposeReply} className=" bg-white rounded-full text-md text-black font-bold py-2 px-5 text-center hover:bg-white/80 transition duration-200">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComposeReply
