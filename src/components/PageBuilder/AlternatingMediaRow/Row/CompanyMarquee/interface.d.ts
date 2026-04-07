// Imports
// ------------

// Exports
// ------------
export interface CompanyMarqueeProps {
	speed: number;
	companies: CompanyName[];
}

export interface CompanyName {
	heading: string;
	id?: string;
}
