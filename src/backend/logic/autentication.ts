import jwt from 'jsonwebtoken';

import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export default function autentication(cookies: RequestCookies): string | null {
    const token: string = cookies.get('__session')?.value as string;

    if (!token) return null;

    const userId: string = jwt.decode(token)?.sub as string;

    return userId;
}