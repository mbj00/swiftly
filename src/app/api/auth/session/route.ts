import { NextResponse } from 'next/server';
import { getSessionUser } from '../../../lib/getSessionUser';

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  console.log(user);

  return NextResponse.json({ user });
}
