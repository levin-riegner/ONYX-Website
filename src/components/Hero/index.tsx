'use client';

import { stripStega } from '@datocms/content-link';
import Background from './Background';
import LogoMarquee from './LogoMarquee';
import MobileNav from './MobileNav';
import Frame from '@parts/Frame';
import { useAnimation } from '@utils/useAnimation';
import { use, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GlobalContext } from '@parts/Contexts';
import { bezzy3, bezzy4 } from '@parts/AnimationPlugins/Curves';
import type * as I from './interface';
import * as S from './styles';

const Hero = ({ menuItems, title, description, logos, unicornId, video }: I.HeroProps) => {
	const { isLoaderFinished, isModalOpen } = use(GlobalContext);

	const jacketRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const descRef = useRef<HTMLParagraphElement>(null);
	const textTimelineRef = useRef<gsap.core.Timeline | null>(null);
	const cleanTitle = useMemo(() => stripStega(title), [title]);
	const cleanDescription = useMemo(() => stripStega(description), [description]);

	useAnimation(
		() => {
			if (!isLoaderFinished || !headingRef.current || !descRef.current) return;

			const headingSplit = SplitText.create(headingRef.current, {
				type: 'lines,chars',
				linesClass: 'line',
				charsClass: 'char',
			});
			const descSplit = SplitText.create(descRef.current, {
				type: 'lines',
				linesClass: 'line',
			});

			const headingChars = headingSplit.chars as HTMLElement[];
			const descLines = descSplit.lines as HTMLElement[];

			if (!headingChars.length || !descLines.length) {
				descSplit.revert();
				return () => headingSplit.revert();
			}

			const tl = gsap.timeline();
			textTimelineRef.current = tl;

			gsap.set(headingChars, { autoAlpha: 0 });
			gsap.set(descLines, { autoAlpha: 0, y: 24 });

			tl.to(headingChars, {
				autoAlpha: 1,
				duration: 0.75,
				stagger: { each: 0.02, from: 'random' },
				ease: bezzy4,
			});

			tl.to(
				descLines,
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.6,
					stagger: { each: 0.12, from: 'start' },
					ease: bezzy3,
				},
				'-=0.5'
			);

			return () => {
				textTimelineRef.current = null;
				headingSplit.revert();
				descSplit.revert();
			};
		},
		{ scope: jacketRef, dependencies: [cleanDescription, cleanTitle, isLoaderFinished] }
	);

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
				<h1 ref={headingRef} data-datocms-content-link-source={title}>
					{cleanTitle}
				</h1>
				<p ref={descRef} data-datocms-content-link-source={description}>
					{cleanDescription}
				</p>
			</S.Content>

			<LogoMarquee logos={logos} />

			<MobileNav menuItems={menuItems} />
		</S.Jacket>
	);
};

Hero.displayName = 'Hero';
export default Hero;
