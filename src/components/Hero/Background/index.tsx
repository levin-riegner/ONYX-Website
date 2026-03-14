'use client';

// Imports
// ------------
import { stripStega } from '@datocms/content-link';
import UnicornScene from 'unicornstudio-react/next';
import { useResponsive } from '@utils/useResponsive';
import { use, useMemo } from 'react';
import { GlobalContext } from '@parts/Contexts';
import MobileVideo from './MobileVideo';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ sceneId, video }: I.BackgroundProps) => {
	// Responsive Hook
	const { isDesktop } = useResponsive();

	// Contexts
	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);
	const cleanSceneId = useMemo(() => stripStega(sceneId), [sceneId]);

	// Event Handlers
	const handleLoad = () => setPageLoaded(true);

	return (
		<S.Jacket
			$isLoaderFinished={isLoaderFinished}
			$isModalOpen={isModalOpen}
			data-datocms-content-link-source={sceneId}
		>
			{isDesktop ? (
				<UnicornScene
					className='unicorn'
					projectId={cleanSceneId}
					width='100%'
					height='100%'
					onLoad={handleLoad}
					lazyLoad={true}
					production={true}
					fps={120}
				/>
			) : (
				<MobileVideo src={video} onReady={handleLoad} />
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
