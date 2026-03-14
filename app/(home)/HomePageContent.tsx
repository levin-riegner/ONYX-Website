'use client';

import Hero from '@parts/Hero';
import Activation from '@parts/Activation';
import { buildHeroMenuItems, type HomePageQueryResult } from './query';

interface HomePageContentProps {
	data: HomePageQueryResult;
}

const HomePageContent = ({ data }: HomePageContentProps) => {
	const menuItems = buildHeroMenuItems(data);

	return (
		<main>
			<Hero
				menuItems={menuItems}
				title={data.home.title}
				description={data.home.desc}
				logos={data.home.partnerLogos}
				unicornId={data.home.unicornId}
				video='/stone-desktop.mp4'
			/>

			<Activation title={data.activation.title} />
		</main>
	);
};

HomePageContent.displayName = 'HomePageContent';
export default HomePageContent;
