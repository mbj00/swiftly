'use client'
import Tweet from '../clientComponents/Tweet'
import type { TweetType } from "../../lib/types";
import { useEffect, useState } from 'react';

type Props = {
    user: {
        id: string;
        email: string;
        username: string;
        fullname: string;
    } | null;
};

const RepliesSection = ({ tweetId }: any) => {
    const [tweets, setTweets] = useState<TweetType[]>([]);


    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const res = await fetch("/api/fetchreplies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tweetId }),
                });
                const data = await res.json();
                console.log("Replies fetched:", data);
                setTweets(data);
            } catch (error) {
                console.error("Error fetching replies:", error);
            }
        };

        if (tweetId) {
            fetchReplies();
        }
    }, [tweetId]);


    return (
        // <main className=" mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">

        <div className="flex flex-col">
            
            {
                !tweets && <div  className="text-gray-400 text-center py-4">Server not reachable</div>
            }
            {
                tweets && tweets.map((tweet) => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))
            }
        </div>
        // </main>
    )
}

export default RepliesSection
