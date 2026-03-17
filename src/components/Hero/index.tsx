'use client';

// Imports
// ------------
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import Background from './Background';
import LogoMarquee from './LogoMarquee';
import MobileNav from './MobileNav';
import Frame from '@parts/Frame';
import { useAnimation } from '@utils/useAnimation';
import { use, useEffect, useRef } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { bezzy3, bezzy4 } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';
gsap.registerPlugin(useGSAP, CustomEase, SplitText);

// Component
// ------------
const Hero = ({ menuItems, title, description, logos, unicornId, video }: I.HeroProps) => {
	// Contexts
	const { isLoaderFinished, isModalOpen } = use(GlobalContext);

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const textTimelineRef = useRef<gsap.core.Timeline | null>(null);

	// Animations
	useAnimation(
		() => {
			if (!isLoaderFinished || !headingRef.current || !descRef.current) return;

			// Split desc first (no animation – included in heading's onSplit)
			const descSplit = SplitText.create(descRef.current, {
				type: 'lines',
				linesClass: 'line',
				aria: 'none',
				autoSplit: true,
			});

			// Split heading with onSplit – create combined timeline
			const headingSplit = SplitText.create(headingRef.current, {
				type: 'lines,chars',
				linesClass: 'line',
				charsClass: 'char',
				aria: 'none',
				autoSplit: true,
				onSplit: self => {
					const headingChars = self.chars as HTMLElement[];
					const descLines = descSplit.lines as HTMLElement[];
					if (!headingChars?.length || !descLines?.length) {
						descSplit.revert();
						self.revert();
						return;
					}

					const tl = gsap.timeline();
					tl.from(headingChars, {
						autoAlpha: 0,
						duration: 0.75,
						stagger: { each: 0.02, from: 'random' },
						ease: bezzy4,
					});
					tl.from(
						descLines,
						{
							autoAlpha: 0,
							y: 24,
							duration: 0.6,
							stagger: { each: 0.12, from: 'start' },
							ease: bezzy3,
						},
						'-=0.5'
					);

					textTimelineRef.current = tl;
					return tl;
				},
			});

			return () => {
				textTimelineRef.current = null;
				headingSplit.revert();
				descSplit.revert();
			};
		},
		{ scope: jacketRef, dependencies: [isLoaderFinished] }
	);

	// Reverse text timeline when modal opens, play forward when it closes
	useEffect(() => {
		const tl = textTimelineRef.current;
		if (!tl) return;
		if (isModalOpen) {
			tl.reverse();
		} else {
			tl.play();
		}
	}, [isModalOpen]);

	return (
		<S.Jacket ref={jacketRef}>
			<Background sceneId={unicornId} video={video} />

			<S.FullFrame>
				<Frame isLight className='top' />
				<Frame isLight className='bottom' />
			</S.FullFrame>

			<S.Content>
				<h1 ref={headingRef}>{title}</h1>
				<p ref={descRef}>{description}</p>
			</S.Content>

			<LogoMarquee logos={logos} />

			<MobileNav menuItems={menuItems} />
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
