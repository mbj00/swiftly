import connectDB from "@/app/lib/connectDB";
import Tweet from "../models/Tweet";
import User from "../models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { tweetId, sessionUserId } = await req.json();
    await connectDB();

    try {
        const tweet = await Tweet.findById(tweetId);
        const user = await User.findById(sessionUserId);

        if (!tweet || !user) {
            return NextResponse.json({ error: "Tweet or User not found" }, { status: 404 });
        }

        const alreadyBookmarked = tweet.bookmarks.includes(sessionUserId);

        if (alreadyBookmarked) {
            tweet.bookmarks.pull(sessionUserId);
            user.bookmarks.pull(tweetId);
        } else {
            tweet.bookmarks.push(sessionUserId);
            user.bookmarks.push(tweetId);
        }

        await tweet.save();
        await user.save();

        return NextResponse.json({ success: true, bookmarked: !alreadyBookmarked });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
