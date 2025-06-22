import connectDB from "@/app/lib/connectDB";
import Tweet from "../models/Tweet";
import { NextResponse } from "next/server";
import User from "../models/User";

export async function POST(req: Request) {
    const { sessionUserId, profileId } = await req.json();
    await connectDB();

    try {
        const user = await User.findById(sessionUserId);

        if (user.following.includes(profileId)) {
            user.following.pull(profileId);
        }

        await user.save();

        const profileUser = await User.findById(profileId)

        if (profileUser.followers.includes(sessionUserId)) {
            profileUser.followers.pull(sessionUserId);
        }

        await profileUser.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}