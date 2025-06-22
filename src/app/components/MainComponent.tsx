import ComposeTweet from "./server-components/ComposeTweet"
import Tweet from './clientComponents/Tweet'
import type { TweetType } from "../lib/types";

type Props = {
    user: {
        id: string;
        email: string;
        username: string;
        fullname: string;
    } | null;
};

const MainComponent = async ({ user }: Props) => {

    const res = await fetch('http://localhost:3000/api/fetchTweets', { cache: 'no-store' });
    const tweets : TweetType[] = await res.json();
    // console.log(tweets);

return (
    <main className=" mx-2 flex max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <h1 className="text-2xl p-3 font-bold backdrop-blur bg-black/30 sticky top-0">Home</h1>
        <ComposeTweet />
        <div className="flex flex-col">
            {
                    !tweets && <div>Server not reachable</div>
                }
            {
                    tweets && tweets.map((tweet) => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))
                }
        </div>
    </main>
)
}

export default MainComponent
