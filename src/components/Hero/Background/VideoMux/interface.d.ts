// Imports
// ------------

// Exports
// ------------
export type DatoVideoData = {
	muxPlaybackId?: string;
	streamingUrl?: string;
	mp4High?: string;
	mp4Med?: string;
	mp4Low?: string;
	width?: number;
	height?: number;
	blurUpThumb?: string;
};

export type VideoProps = {
	/** DatoCMS/Mux video object for VideoPlayer */
	data?: DatoVideoData | null;
	onReady: () => void;
	isModalOpen: boolean;
};
