'use client';

// Imports
// ------------
import { useRef, useEffect, useCallback, useState } from 'react';
import { VideoPlayer } from 'react-datocms';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Video = ({ data, src, onReady, isModalOpen }: I.VideoProps) => {
	// Refs
	const videoRef = useRef<HTMLVideoElement>(null);

	// Delayed pause: wait 1100ms after modal opens (matches modal close animation) before pausing
	const [isPaused, setIsPaused] = useState(false);

	const handleLoadedData = useCallback(() => onReady(), [onReady]);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (video.readyState >= 2) {
			onReady();
		} else {
			video.addEventListener('loadeddata', onReady, { once: true });
		}

		return () => {
			video.removeEventListener('loadeddata', onReady);
		};
	}, [onReady]);

	// When modal opens, schedule pause after 1100ms; when it closes, resume immediately
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;

		if (isModalOpen) {
			timer = setTimeout(() => setIsPaused(true), 1100);
		} else {
			setIsPaused(false);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isModalOpen]);

	// Sync isPaused to native video element (fallback path only)
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (isPaused) video.pause();
		else video.play();
	}, [isPaused]);

	// Use VideoPlayer when we have DatoCMS/Mux data
	if (data?.muxPlaybackId) {
		// Optimized poster: ~1000px width for displayed ~988x556 (saves ~32KB vs default 2048px)
		const posterUrl = `https://image.mux.com/${data.muxPlaybackId}/thumbnail.webp?width=1000&fit_mode=smartcrop`;

		return (
			<S.Jacket>
				<VideoPlayer
					data={data}
					poster={posterUrl}
					theme='minimal'
					autoPlay
					loop
					muted
					playsInline
					paused={isPaused}
					onLoadedData={handleLoadedData}
					minResolution='720p'
					renditionOrder='desc'
					style={
						{
							'--controls': 'none',
							'--media-object-fit': 'cover',
							'--media-object-position': 'center',
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
						} as React.CSSProperties & Record<`--${string}`, string>
					}
					aria-label='Background video'
				/>
			</S.Jacket>
		);
	}

	// Fallback to native video when no Mux data
	if (!src) return null;

	return (
		<S.Jacket>
			<video
				ref={videoRef}
				src={src}
				autoPlay
				loop
				muted
				playsInline
				aria-label='Background video'
			>
				<track kind='captions' src='/captions-empty.vtt' srcLang='en' label='English' />
			</video>
		</S.Jacket>
	);
};

// Exports
// ------------
Video.displayName = 'Video';
export default Video;
