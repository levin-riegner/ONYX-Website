import type * as GraphQLWeb from '@0no-co/graphql.web';
import {
	executeQuery as libExecuteQuery,
	type ExecuteQueryOptions as DatoExecuteQueryOptions,
} from '@datocms/cda-client';

export const cacheTag = 'datocms';

type GraphQlQuery = string | GraphQLWeb.DocumentNode;

type LocalExecuteQueryOptions<Variables> = {
	variables?: Variables;
	includeDrafts?: boolean;
};

function getEnvValue(...names: string[]) {
	for (const name of names) {
		const value = process.env[name];

		if (value) {
			return value;
		}
	}

	return null;
}

export function getDatoCmsPublishedToken() {
	const token = getEnvValue(
		'DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN',
		'NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN'
	);

	if (!token) {
		throw new Error(
			'Missing DatoCMS published content token. Set DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN or NEXT_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN.'
		);
	}

	return token;
}

export function getDatoCmsDraftToken() {
	const token = getEnvValue(
		'DATOCMS_DRAFT_CONTENT_CDA_TOKEN',
		'NEXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN'
	);

	if (!token) {
		throw new Error(
			'Missing DatoCMS draft content token. Set DATOCMS_DRAFT_CONTENT_CDA_TOKEN or NEXT_DATOCMS_DRAFT_CONTENT_CDA_TOKEN.'
		);
	}

	return token;
}

export function getDatoCmsBaseEditingUrl() {
	const value = getEnvValue('DATOCMS_BASE_EDITING_URL', 'NEXT_DATOCMS_BASE_EDITING_URL');

	if (!value) {
		throw new Error(
			'Missing DatoCMS base editing URL. Set DATOCMS_BASE_EDITING_URL or NEXT_DATOCMS_BASE_EDITING_URL to the full environment URL.'
		);
	}

	try {
		const parsedUrl = new URL(value);
		const isEnvironmentUrl = /\/environments\/[^/]+\/?$/.test(parsedUrl.pathname);

		if (!isEnvironmentUrl) {
			throw new Error();
		}
	} catch {
		throw new Error(
			'DATOCMS_BASE_EDITING_URL must be a full DatoCMS environment URL, for example https://project.admin.datocms.com/environments/main.'
		);
	}

	return value.replace(/\/$/, '');
}

export async function executeQuery<Result = unknown, Variables = Record<string, never>>(
	query: GraphQlQuery,
	options?: LocalExecuteQueryOptions<Variables>
) {
	const includeDrafts = options?.includeDrafts ?? false;
	// Published requests stay cache-tagged, while draft requests bypass cache and include
	// the metadata DatoCMS needs for realtime preview and click-to-edit overlays.
	const requestOptions: DatoExecuteQueryOptions<Variables> = {
		variables: options?.variables,
		excludeInvalid: true,
		includeDrafts,
		token: includeDrafts ? getDatoCmsDraftToken() : getDatoCmsPublishedToken(),
		contentLink: includeDrafts ? 'v1' : undefined,
		baseEditingUrl: includeDrafts ? getDatoCmsBaseEditingUrl() : undefined,
		requestInitOptions: includeDrafts
			? {
					cache: 'no-store',
				}
			: {
					cache: 'force-cache',
					next: {
						tags: [cacheTag],
					},
				},
	};

	if (typeof query === 'string') {
		return libExecuteQuery<Result, Variables>(query, requestOptions);
	}

	return libExecuteQuery<Result, Variables>(query, requestOptions);
}
