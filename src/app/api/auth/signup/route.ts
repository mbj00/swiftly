import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/connectDB';
import User from '../../models/User';

export async function POST(req: Request) {
  const { fullName, username, email, password } = await req.json();

  if (!email || !username || !fullName || !password)
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });

  await connectDB();

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    return NextResponse.json({ error: 'Email or username already exists.' }, { status: 409 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
}
