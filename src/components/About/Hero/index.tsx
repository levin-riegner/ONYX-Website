'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import AnimatedHeading from '@parts/AnimatedHeading';
import BackgroundPulses from './BackgroundPulses';
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { bezzy3 } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// GSAP Plugins
// ------------
gsap.registerPlugin(SplitText);

// Component
// ------------
const Hero = ({ title, heading, desc, isReady }: I.HeroProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);

	useAnimation(
		() => {
			if (!jacketRef.current || !descRef.current) return;

			const split = SplitText.create(descRef.current, {
				type: 'lines',
				linesClass: 'line',
			});

			const lines = split.lines as Element[];

			if (isReady) {
				// Animate in
				lines.forEach(line => {
					gsap.set(line, {
						autoAlpha: 0,
						yPercent: 100,
					});
				});

				gsap.to(lines, {
					autoAlpha: 1,
					yPercent: 0,
					stagger: {
						each: 0.1,
						from: 'start',
					},
					duration: 1,
					delay: 0.5,
					ease: bezzy3,
				});
			} else {
				// Animate out (reverse)
				gsap.to(lines, {
					autoAlpha: 0,
					yPercent: 50,
					stagger: {
						each: 0.05,
						from: 'end',
					},
					duration: 0.5,
					ease: bezzy3,
				});
			}
		},
		{
			scope: jacketRef,
			dependencies: [isReady],
		}
	);

	return (
		<S.Jacket ref={jacketRef}>
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

					<S.Desc $l='1/9' ref={descRef}>
						{desc}
					</S.Desc>
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
