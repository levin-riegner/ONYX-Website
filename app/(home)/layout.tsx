import type { Metadata } from 'next';
import { stripStega } from '@datocms/content-link';
import { getHomepageData } from './data';

type TwitterCard = 'summary' | 'summary_large_image' | 'player' | 'app';

function cleanText(value: string | null | undefined) {
	return value ? stripStega(value) : undefined;
}

function getTwitterCard(value: string | null | undefined): TwitterCard {
	switch (value) {
		case 'summary':
		case 'summary_large_image':
		case 'player':
		case 'app':
			return value;
		default:
			return 'summary_large_image';
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const FALLBACK = {
		title: 'ONYX',
		desc: 'Unlock premium data + inventory across CTV, Video, and Display with supply-side targeting that drives lower CPAs and higher win rates.',
		image: '/og.jpg',
		twitterCard: 'summary_large_image' as const,
	};

	try {
		const { seo } = await getHomepageData();
		const title = cleanText(seo?.meta?.title) ?? FALLBACK.title;
		const description = cleanText(seo?.meta?.desc) ?? FALLBACK.desc;
		const twitterCard = getTwitterCard(seo?.meta?.twitterCard);

		return {
			title,
			metadataBase: new URL('https://onyxproject.com'),
			description,
			keywords:
				'ONYX, data, inventory, CTV, Video, Display, supply-side targeting, lower CPAs, higher win rates',
			robots: 'index, follow',
			openGraph: {
				type: 'website',
				title,
				description,
				url: 'https://onyxproject.com',
				siteName: 'ONYX',
				locale: 'en_US',
				images: [
					{
						url: seo?.meta?.image?.url ?? FALLBACK.image,
						width: 1200,
						height: 630,
						alt: 'ONYX OpenGraph Image',
						type: 'image/jpeg',
					},
				],
			},
			twitter: {
				card: twitterCard,
				title,
				description,
				images: [
					{
						url: seo?.meta?.image?.url ?? FALLBACK.image,
						width: 1200,
						height: 630,
						alt: 'ONYX OpenGraph Image',
					},
				],
			},
		};
	} catch (error) {
		console.error('Failed to build homepage metadata from DatoCMS:', error);

		return {
			title: FALLBACK.title,
			metadataBase: new URL('https://onyxproject.com'),
			description: FALLBACK.desc,
			keywords:
				'ONYX, data, inventory, CTV, Video, Display, supply-side targeting, lower CPAs, higher win rates',
			robots: 'index, follow',
			openGraph: {
				type: 'website',
				title: FALLBACK.title,
				description: FALLBACK.desc,
				url: 'https://onyxproject.com',
				siteName: 'ONYX',
				locale: 'en_US',
				images: [
					{
						url: FALLBACK.image,
						width: 1200,
						height: 630,
						alt: 'ONYX OpenGraph Image',
						type: 'image/jpeg',
					},
				],
			},
			twitter: {
				card: FALLBACK.twitterCard,
				title: FALLBACK.title,
				description: FALLBACK.desc,
				images: [
					{
						url: FALLBACK.image,
						width: 1200,
						height: 630,
						alt: 'ONYX OpenGraph Image',
					},
				],
			},
		};
	}
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

Layout.displayName = 'Layout';
export default Layout;
