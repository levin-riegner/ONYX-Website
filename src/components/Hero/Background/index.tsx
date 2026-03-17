'use client';

// Imports
// ------------
import { use, useCallback, useEffect, useRef } from 'react';
import { GlobalContext } from '@parts/Contexts';
import UnicornScene from 'unicornstudio-react/next';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// HAVE_CURRENT_DATA = 2, HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4
const READY_STATE_LOADED = 2;

// Component
// ------------
const Background = ({ sceneId }: I.BackgroundProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const hasFiredRef = useRef(false);

	const { setPageLoaded, isLoaderFinished, isModalOpen } = use(GlobalContext);

	const handleReady = useCallback(() => {
		if (hasFiredRef.current) return;
		hasFiredRef.current = true;
		setPageLoaded(true);
	}, [setPageLoaded]);

	// Handle cached video: loadeddata may fire before listener attaches
	useEffect(() => {
		const el = videoRef.current;
		if (!el) return;
		if (el.readyState >= READY_STATE_LOADED) {
			handleReady();
		}
	}, [handleReady]);

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{isLoaderFinished && (
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
			)}

			<S.Video
				ref={videoRef}
				src='/stone.mp4'
				autoPlay
				loop
				muted
				playsInline
				preload='auto'
				onLoadedData={handleReady}
				onCanPlay={handleReady}
			/>
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
