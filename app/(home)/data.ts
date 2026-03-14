import { cache } from 'react';
import { draftMode } from 'next/headers';
import { executeQuery } from '@utils/executeQuery';
import { EVERYTHING, type HomePageQueryResult } from './query';

const getHomepageDataByDraftState = cache(async (includeDrafts: boolean) => {
	return executeQuery<HomePageQueryResult>(EVERYTHING, {
		includeDrafts,
	});
});

export async function getHomepageData(): Promise<HomePageQueryResult> {
	const { isEnabled } = await draftMode();

	return getHomepageDataByDraftState(isEnabled);
}
