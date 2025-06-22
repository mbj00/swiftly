import connectDB from "@/app/lib/connectDB";
import Tweet from "../models/Tweet";
import { NextResponse } from "next/server";
import Reply from "../models/Reply";

export async function POST(req: Request) {
    const { tweetId } = await req.json();

    try {
        await connectDB();
    
        const allTweets = await Reply.find({ tweet: tweetId }).sort({ createdAt: -1 }); // sort by latest
        // console.log(allTweets);
        return NextResponse.json(allTweets, { status: 200 });
      } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
      }
}