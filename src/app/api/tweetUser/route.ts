import connectDB from "@/app/lib/connectDB";
import User from "../models/User";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    const { userId } = await req.json();

    try {
        await connectDB();
    
        const tweetUser = await User.findById(userId); // sort by latest
        // console.log(allTweets);
        return NextResponse.json(tweetUser, { status: 200 });
      } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
      }
}