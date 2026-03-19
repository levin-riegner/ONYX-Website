'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import GridItem from './GridItem';
import { Fragment } from 'react';
import ScrollAnimatedHeading from '@parts/ScrollAnimatedHeading';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SplitFeatureGrid = ({ heading, features, isReady }: I.SplitFeatureGridProps) => {
	return (
		<S.Jacket>
			<SideFrame />

			<S.Top>
				<Frame className='top' />

				<Grid>
					<S.Heading>
						<ScrollAnimatedHeading text={heading} />
					</S.Heading>
				</Grid>

				<Frame className='bottom' />
			</S.Top>

			<S.Bottom>
				{features?.map((feature, index) => {
					// is Odd check
					const isEven = index % 2 === 0;

					return (
						<Fragment key={feature.heading}>
							<GridItem
								heading={feature.heading}
								desc={feature.desc}
								media={feature.media}
								isEven={isEven}
								isReady={isReady}
							/>

							<Frame className='bottom' />
						</Fragment>
					);
				})}
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
SplitFeatureGrid.displayName = 'SplitFeatureGrid';
export default SplitFeatureGrid;
