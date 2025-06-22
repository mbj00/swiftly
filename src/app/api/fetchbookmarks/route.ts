import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import User from "../models/User";
import Tweet from "../models/Tweet";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const allTweets = await Tweet.find({ _id: { $in: user.bookmarks } });

    return NextResponse.json(allTweets, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookmarked tweets:", error);
    return NextResponse.json({ error: "Failed to fetch tweets" }, { status: 500 });
  }
}
