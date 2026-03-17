'use client';

// Imports
// ------------
import dynamic from 'next/dynamic';
import { use, useCallback } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Lazy load: only the rendered component's bundle is fetched
// const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });
const Video = dynamic(() => import('./Video'), { ssr: false });

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ sceneId, video }: I.BackgroundProps) => {
	// Contexts
	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Event Handlers (stable ref to avoid MobileVideo effect churn)
	const handleLoad = useCallback(() => setPageLoaded(true), [setPageLoaded]);

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{/* Video + Unicorn load when device is known */}
			{/* {isReady && isDesktop && (
				<UnicornScene
					className='unicorn'
					projectId={sceneId}
					width='100%'
					height='100%'
					lazyLoad={true}
					production={true}
					dpi={1}
					fps={60}
				/>
			)} */}

			<Video data={video ?? undefined} onReady={handleLoad} isModalOpen={isModalOpen} />
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
