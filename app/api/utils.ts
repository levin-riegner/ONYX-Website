import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function withCORS(responseInit?: ResponseInit): ResponseInit {
	return {
		...responseInit,
		headers: {
			...responseInit?.headers,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	};
}

function serializeError(error: unknown) {
	if (error instanceof Error) {
		return {
			message: error.message,
			name: error.name,
		};
	}

	return {
		message: 'Unexpected error',
		error,
	};
}

export function handleUnexpectedError(error: unknown) {
	console.error(error);
	return invalidRequestResponse(serializeError(error), 500);
}

export function invalidRequestResponse(error: unknown, status = 422) {
	return NextResponse.json(
		{
			success: false,
			error,
		},
		withCORS({ status })
	);
}

export function successfulResponse(data?: unknown, status = 200) {
	return NextResponse.json(
		{
			success: true,
			data,
		},
		withCORS({ status })
	);
}

export async function makeDraftModeWorkWithinIframes() {
	const cookieStore = await cookies();
	const cookie = cookieStore.get('__prerender_bypass');

	if (!cookie?.value) {
		return;
	}

	// DatoCMS Web Previews render inside an iframe, so the draft cookie needs the
	// iframe-safe attributes that Next.js does not add by default.
	cookieStore.set({
		name: '__prerender_bypass',
		value: cookie.value,
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'none',
		partitioned: true,
	});
}

export async function clearDraftModeWithinIframes() {
	const cookieStore = await cookies();

	cookieStore.set({
		name: '__prerender_bypass',
		value: '',
		httpOnly: true,
		path: '/',
		secure: true,
		sameSite: 'none',
		partitioned: true,
		expires: new Date(0),
	});
}

export function isRelativeUrl(path: string): boolean {
	try {
		new URL(path);
		return false;
	} catch {
		try {
			new URL(path, 'http://example.com');
			return true;
		} catch {
			return false;
		}
	}
}

export function getSecretApiToken() {
	const token = process.env.DRAFT_MODE_SECRET;

	if (!token) {
		throw new Error('Missing DRAFT_MODE_SECRET environment variable.');
	}

	return token;
}
