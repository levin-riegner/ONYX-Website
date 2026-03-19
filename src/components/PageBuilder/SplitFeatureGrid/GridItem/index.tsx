'use client';

// Imports
// ------------
import Image from 'next/image';
import { use, useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { NestedLenisContext } from '@parts/NestedLenis';
import gsap from 'gsap';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const GridItem = ({ heading, desc, media, isEven, isReady }: I.GridItemProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const mediaRef = useRef<HTMLImageElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Animations
	useAnimation(
		({ isDesktop }) => {
			if (
				!jacketRef.current ||
				!mediaRef.current ||
				!scrollWrapper.current ||
				!lenisReady ||
				!isReady
			)
				return;

			gsap.set(mediaRef.current, {
				autoAlpha: 0,
				scale: 1.2,
			});

			gsap.to(mediaRef.current, {
				autoAlpha: 1,
				scale: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'top 60%',
					scrub: true,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady, isReady] }
	);

	return (
		<S.Jacket $isEven={isEven} ref={jacketRef}>
			<S.FeatureMedia $isEven={isEven}>
				<S.FeaturedMediaAnimation ref={mediaRef}>
					<Image
						src={media.url}
						alt={media.alt}
						width={360}
						height={360}
						loading='eager'
						fetchPriority='high'
					/>
				</S.FeaturedMediaAnimation>
			</S.FeatureMedia>

			<S.Vertical />

			<S.FeatureContent>
				<S.FeatureHeading>{heading}</S.FeatureHeading>
				<S.FeatureDesc>{desc}</S.FeatureDesc>
			</S.FeatureContent>
		</S.Jacket>
	);
};

// Exports
// ------------
GridItem.displayName = 'GridItem';
export default GridItem;
