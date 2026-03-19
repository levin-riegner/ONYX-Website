// Imports
// ------------
import type { ImageProps } from 'next/image';

// Exports
// ------------
export interface GridItemProps {
	heading: string;
	desc: string;
	media: {
		url: string;
		alt: string;
		blur?: string;
	};
	isEven: boolean;
	isReady?: boolean;
}
