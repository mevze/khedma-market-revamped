import { jwtVerify, JWTPayload } from 'jose';
import { redirect } from 'next/dist/client/components/navigation';
import { cookies } from 'next/headers';

const secret = process.env.SECRET;

if (!secret) {
  throw new Error('SECRET environment variable is not set');
}

const key = new TextEncoder().encode(secret);

interface CustomJWTPayload {
  userId: string;
  expires: string;
}

async function decrypt(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key) as { payload: JWTPayload };
    if (!payload.sub || !payload.exp) {
      throw new Error('Invalid JWT payload');
    }
    return { userId: payload.sub, expires: payload.exp.toString() };
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    return null;
  }
}

const cookieConfig = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/' as const },
  duration: 24 * 60 * 60 * 1000, 
};

export async function createSession(userId: string) {
  try {
    const expires = new Date(Date.now() + cookieConfig.duration);
    const session = await decrypt(userId); 

    if (!session) {
      throw new Error('Failed to create session');
    }

    const cookieHeader = cookies();
    cookieHeader.set(cookieConfig.name, JSON.stringify(session), { ...cookieConfig.options, expires });

    return redirect('/');
  } catch (error) {
    console.error('Error creating session:', error);
    return new Response('Failed to create session', { status: 500 }); 
  }
}

export async function verifySession() {
  const cookieHeader = cookies();
  const sessionCookie = cookieHeader.get(cookieConfig.name)?.value;

  if (!sessionCookie) {
    return redirect('/login');
  }

  const session = await decrypt(sessionCookie);

  if (!session || !session.userId) {
    return redirect('/login');
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  const cookieHeader = cookies();
  cookieHeader.delete(cookieConfig.name);
  redirect('/login');
}
