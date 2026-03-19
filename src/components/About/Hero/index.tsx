'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import AnimatedHeading from '@parts/AnimatedHeading';
import BackgroundPulses from './BackgroundPulses';
import AnimatedDescription from '@parts/AnimatedDescription';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ title, heading, desc, isReady }: I.HeroProps) => {
	return (
		<S.Jacket>
			<BackgroundPulses isReady={isReady} />

			<SideFrame />
			<Frame className='top' />

			<S.Top $padTop>
				<Grid>
					<S.SectionTitlePosition>
						<SectionTitle text={title} />
					</S.SectionTitlePosition>
				</Grid>
			</S.Top>

			<S.Bottom $padBottom>
				<Grid>
					<S.Heading $l='1/10'>
						<AnimatedHeading isReady={isReady}>{heading}</AnimatedHeading>
					</S.Heading>

					<AnimatedDescription isReady={isReady} text={desc} l='1/9' />
				</Grid>
			</S.Bottom>

			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
