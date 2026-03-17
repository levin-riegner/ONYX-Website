'use client';

// Imports
// ------------
import { use, useCallback, useEffect, useRef } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// HAVE_CURRENT_DATA = 2, HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4
const READY_STATE_LOADED = 2;

// Component
// ------------
const Video = ({ videoSrc }: I.VideoProps) => {
	// Refs
	const videoRef = useRef<HTMLVideoElement>(null);
	const hasFiredRef = useRef(false);

	// Contexts
	const { setPageLoaded } = use(GlobalContext);

	// Handle Ready
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
		<S.Jacket>
			<video
				ref={videoRef}
				src={videoSrc}
				autoPlay
				loop
				muted
				playsInline
				preload='auto'
				onLoadedData={handleReady}
				onCanPlay={handleReady}
			></video>
		</S.Jacket>
	);
};

// Exports
// ------------
Video.displayName = 'Video';
export default Video;
