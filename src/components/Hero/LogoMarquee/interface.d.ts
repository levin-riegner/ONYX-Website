// Imports
// ------------

// Exports
// ------------
export interface LogoMarqueeProps {
	logos: Logo[];
}

export interface Logo {
	id: string | number;
	url: string;
	alt: string | null;
}
