'use client';

// Imports
// ------------
import { useCallback, useEffect, useState } from 'react';
import { VideoPlayer } from 'react-datocms';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Optimized poster: ~1000px width for displayed ~988x556 (saves ~32KB vs default 2048px)
const getPosterUrl = (muxPlaybackId: string) =>
	`https://image.mux.com/${muxPlaybackId}/thumbnail.webp?width=1000&fit_mode=smartcrop`;

// Component
// ------------
const Video = ({ data, onReady, isModalOpen }: I.VideoProps) => {
	// Delayed pause: wait 1100ms after modal opens (matches modal close animation) before pausing
	const [isPaused, setIsPaused] = useState(false);
	// Fallback to poster when Mux fails (invalid playback ID, CORS, format, etc.)
	const [hasMuxError, setHasMuxError] = useState(false);

	const handleLoadedData = useCallback(() => onReady(), [onReady]);
	const handleMuxError = useCallback(() => setHasMuxError(true), []);

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

	// Mux-only: no video data or no playback ID
	if (!data?.muxPlaybackId) return null;

	const posterUrl = getPosterUrl(data.muxPlaybackId);

	// Mux errored: show poster image
	if (hasMuxError) {
		return (
			<S.Jacket>
				<S.Poster src={posterUrl} alt="" onLoad={handleLoadedData} />
			</S.Jacket>
		);
	}

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
				onError={handleMuxError}
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
};

// Exports
// ------------
Video.displayName = 'Video';
export default Video;
