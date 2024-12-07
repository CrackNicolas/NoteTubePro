import jwt from 'jsonwebtoken';

import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export default function Autentication(cookies: RequestCookies): string | null {
    const token = cookies.get('__session')?.value as string;

    if (!token) return null;

    const user_id = jwt.decode(token)?.sub as string;

    return user_id;
}