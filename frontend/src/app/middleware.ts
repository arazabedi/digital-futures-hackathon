import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('accessToken');

	if (!token) {
		const url = request.nextUrl.clone();
		if (url.pathname !== '/login' && url.pathname !== '/register') {
			url.pathname = '/login';
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // specify paths to protect
};
