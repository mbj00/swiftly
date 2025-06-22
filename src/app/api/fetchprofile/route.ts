import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import User from "../models/User"

export async function POST(req: Request) {
    const { profileId } = await req.json();

    try {
        await connectDB();
    
        const profile = await User.find({ _id: profileId });
        console.log(profile);
        return NextResponse.json(profile, { status: 200 });
      } catch (error) {
        console.error('Error fetching tweets:', error);
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
      }
}