'use client';

// Imports
// ------------
import Image from 'next/image';
import CompanyMarquee from './CompanyMarquee';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Row = ({
	heading,
	desc,
	companyNames,
	showCompanyNames,
	showDescription,
	iconImage,
	isEven,
	isReady,
}: I.RowProps) => {
	return (
		<S.Jacket>
			<S.Content $isEven={isEven}>
				<S.Media>
					{isReady && (
						<Image
							src={iconImage.url}
							alt={iconImage.alt}
							fill
							sizes='(max-width: 1023px) 100vw, 23vw'
							loading='eager'
							fetchPriority='high'
						/>
					)}
				</S.Media>

				<S.Texts>
					<h3>{heading}</h3>
					{showDescription && <p>{desc}</p>}
					{showCompanyNames && <CompanyMarquee speed={1} companies={companyNames} />}
				</S.Texts>
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
Row.displayName = 'Row';
export default Row;
