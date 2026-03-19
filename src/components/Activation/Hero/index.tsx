'use client';

// Imports
// ------------
import Grid from '@waffl';
import SectionTitle from '@parts/SectionTitle';
import LogoMarquee from './LogoMarquee';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import AnimatedHeading from '@parts/AnimatedHeading';
import AnimatedDescription from '@parts/AnimatedDescription';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Hero = ({ logoMarquee, title, heading, desc, isReady }: I.HeroProps) => {
	return (
		<S.Jacket>
			<SideFrame />

			<Frame className='top' />

			<S.Top $pad>
				<Grid>
					<S.Col $l='1/13'>
						<SectionTitle text={title} />
					</S.Col>

					<S.Heading $l='1/12'>
						<AnimatedHeading isReady={isReady}>{heading}</AnimatedHeading>
					</S.Heading>

					<AnimatedDescription isReady={isReady} text={desc} l='1/9' />
				</Grid>
			</S.Top>

			<S.Bottom $isReady={isReady}>
				<Frame className='top' />
				<LogoMarquee logoMarquee={logoMarquee} />
				<Frame className='bottom' />
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
