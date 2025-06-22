import connectDB from "@/app/lib/connectDB";
import Tweet from "../models/Tweet";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { tweetId, sessionUserId } = await req.json();
    await connectDB();

    try {
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return NextResponse.json({ error: "Tweet not found" }, { status: 404 });

        const alreadyLiked = tweet.likes.includes(sessionUserId);
        if (alreadyLiked) {
            tweet.likes.pull(sessionUserId); // remove like
        } else {
            tweet.likes.push(sessionUserId); // add like
        }

        await tweet.save();
        return NextResponse.json({ success: true, liked: !alreadyLiked });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}