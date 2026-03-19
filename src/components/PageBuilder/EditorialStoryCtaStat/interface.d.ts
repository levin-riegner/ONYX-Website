// Imports
// ------------
import type { StatisticProps } from '../StatisticsGrid/Statistic/interface';

// Exports
// ------------
export interface EditorialStoryCtaStatProps {
	contactTitle?: string | null;
	heading: string;
	animatedText?: string;
	isReady?: boolean;
	inlineCallToAction?: {
		description?: string;
		buttonLabel?: string;
		heading?: string;
		overrideBackground?: boolean;
		backgroundImage?: {
			url: string;
			alt: string;
			blur?: string;
		};
	};
	statistics?: StatisticProps[];
}
