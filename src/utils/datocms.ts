import { executeQuery } from '@datocms/cda-client';

function getPublishedToken() {
	const token =
		process.env.DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN ||
		process.env.NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN;

	if (!token) {
		throw new Error(
			'DatoCMS published content token is missing. Please set DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN or NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN.'
		);
	}

	return token;
}

export const performRequest = async <T = unknown>(
	query: string,
	options?: Record<string, unknown>
): Promise<T | null> => {
	try {
		const queryResponse = await executeQuery(query, {
			...options,
			token: getPublishedToken(),
		});

		return queryResponse as T;
	} catch (error) {
		console.error('DatoCMS request failed:', error);
		return null;
	}
};
