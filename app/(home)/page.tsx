import { draftMode } from 'next/headers';
import { getDatoCmsBaseEditingUrl, getDatoCmsDraftToken } from '@utils/executeQuery';
import { getHomepageData } from './data';
import HomePageContent from './HomePageContent';
import HomepageDraftPreview from './HomepageDraftPreview';
import { EVERYTHING } from './query';

const Page = async () => {
	const { isEnabled } = await draftMode();
	const data = await getHomepageData();

	if (isEnabled) {
		return (
			<HomepageDraftPreview
				initialData={data}
				query={EVERYTHING}
				token={getDatoCmsDraftToken()}
				baseEditingUrl={getDatoCmsBaseEditingUrl()}
			/>
		);
	}

	return <HomePageContent data={data} />;
};

export default Page;
