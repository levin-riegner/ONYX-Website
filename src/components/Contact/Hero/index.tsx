'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import AnimatedHeading from '@parts/AnimatedHeading';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Form from './Form';
import AnimatedDescription from '@parts/AnimatedDescription';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, heading, desc }: I.HeroProps) => {
	// Context
	const { isModalOpen, modalActive } = use(GlobalContext);

	// Animation Checker
	const isReady = isModalOpen && modalActive === title;

	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />
			<Frame className='bottom' />

			<S.Top>
				<Grid>
					<S.TitlePosition>
						<SectionTitle text={title} />
					</S.TitlePosition>
				</Grid>

				<Grid>
					<S.Heading $l='1/6'>
						<AnimatedHeading isReady={isReady}>{heading}</AnimatedHeading>
					</S.Heading>

					<AnimatedDescription isReady={isReady} text={desc} l='6/13' />
				</Grid>

				<Frame className='bottom' />
			</S.Top>

			<Form />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
