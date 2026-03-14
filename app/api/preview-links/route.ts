import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
	getSecretApiToken,
	handleUnexpectedError,
	invalidRequestResponse,
	withCORS,
} from '../utils';

export const dynamic = 'force-dynamic';

type PreviewLink = {
	label: string;
	url: string;
};

type PreviewLinksResponse = {
	previewLinks: PreviewLink[];
};

export async function OPTIONS() {
	return new Response('OK', withCORS());
}

export async function POST(request: NextRequest) {
	try {
		const token = request.nextUrl.searchParams.get('token');

		if (token !== getSecretApiToken()) {
			return invalidRequestResponse('Invalid token', 401);
		}

		// Keep preview-links homepage-only until record-to-route mapping is introduced.
		const response: PreviewLinksResponse = {
			previewLinks: [
				{
					label: 'Draft homepage',
					url: new URL(
						`/api/draft-mode/enable?redirect=/&token=${token}`,
						request.url
					).toString(),
				},
				{
					label: 'Published homepage',
					url: new URL('/api/draft-mode/disable?redirect=/', request.url).toString(),
				},
			],
		};

		return NextResponse.json(response, withCORS());
	} catch (error) {
		return handleUnexpectedError(error);
	}
}
