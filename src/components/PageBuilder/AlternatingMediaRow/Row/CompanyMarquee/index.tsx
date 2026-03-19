'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const CompanyMarquee = ({ speed, companies }: I.CompanyMarqueeProps) => {
	return (
		<S.Jacket $speed={speed} $isMarquee={companies.length > 4}>
			<ul>
				{companies.map(({ heading, id }) => (
					<li key={id ?? heading}>{heading}</li>
				))}
			</ul>

			<ul aria-hidden='true'>
				{companies.map(({ heading, id }) => (
					<li key={id ?? heading}>{heading}</li>
				))}
			</ul>
		</S.Jacket>
	);
};

// Exports
// ------------
CompanyMarquee.displayName = 'CompanyMarquee';
export default CompanyMarquee;
