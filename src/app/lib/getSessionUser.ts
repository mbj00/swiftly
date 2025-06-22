// lib/getSessionUser.ts
import { cookies } from 'next/headers';
const jwt = require('jsonwebtoken')

export const getSessionUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  // console.log(token);
  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return user; // contains id, email, username from your sign-in payload
  } catch (err) {
    return null;
  }
};
