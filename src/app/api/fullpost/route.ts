import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import Tweet from "../models/Tweet";

export async function POST(req : Request) {
    const { postId } = await req.json();

    try {
        await connectDB();
    
        const fullPost = await Tweet.findById(postId);
        console.log('/////////////////////////////////////')
        console.log(fullPost);
        return NextResponse.json(fullPost, { status: 200 });
      } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
      }
}