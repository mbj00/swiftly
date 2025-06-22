import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../lib/connectDB';
import Reply from '../models/Reply';

export async function POST(req: Request) {
  const {tweetId, tweetText, userId } = await req.json();
  // console.log("values received for reply are "+ tweetId, tweetText, userId);

  if (!tweetText || !userId)
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });

  await connectDB();

  const user = await Reply.create({
    text : tweetText,
    author : userId,
    tweet : tweetId
  });

  return NextResponse.json({ message: 'Tweet posted successfullly' }, { status: 201 });
}
