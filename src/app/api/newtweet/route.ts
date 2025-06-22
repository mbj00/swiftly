import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../lib/connectDB';
import Tweet from '../models/Tweet';

export async function POST(req: Request) {
  const { tweetText, userId } = await req.json();
  console.log(tweetText, userId);

  if (!tweetText || !userId)
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });

  await connectDB();

  const user = await Tweet.create({
    text : tweetText,
    author : userId
  });

  return NextResponse.json({ message: 'Tweet posted successfullly' }, { status: 201 });
}
