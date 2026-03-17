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

// LCP: poster URL for hero video (same as Video component)
const getPosterUrl = (muxPlaybackId: string) =>
	`https://image.mux.com/${muxPlaybackId}/thumbnail.webp?width=1000&fit_mode=smartcrop`;

// Component
// ------------
const Background = ({ sceneId, video }: I.BackgroundProps) => {
	// Contexts
	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Event Handlers (stable ref to avoid MobileVideo effect churn)
	const handleLoad = useCallback(() => setPageLoaded(true), [setPageLoaded]);

	// LCP: render poster immediately when we have video data (don't wait for useResponsive)
	const posterUrl = video?.muxPlaybackId ? getPosterUrl(video.muxPlaybackId) : null;

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{/* LCP: poster in DOM on first paint so Lighthouse measures it early */}
			{posterUrl && (
				<S.PosterWrapper>
					<S.Poster src={posterUrl} alt='' fetchPriority='high' onLoad={handleLoad} />
				</S.PosterWrapper>
			)}

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
