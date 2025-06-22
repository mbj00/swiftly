import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/connectDB';
import User from '../../models/User';
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password)
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });

    //   return NextResponse.json({
    //     message: 'Login successful',
    //     user: {
    //       id: user._id,
    //       username: user.username,
    //       email: user.email,
    //     },
    //   });

    const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username, fullname : user.fullName },
        secret,
        { expiresIn: '7d' }
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return response; 

}
