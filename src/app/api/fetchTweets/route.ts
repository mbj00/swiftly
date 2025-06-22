import connectDB from "@/app/lib/connectDB";
import Tweet from "../models/Tweet";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        await connectDB();
    
        const allTweets = await Tweet.find({}); // sort by latest
        // console.log(allTweets);
        return NextResponse.json(allTweets, { status: 200 });
      } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
      }
}