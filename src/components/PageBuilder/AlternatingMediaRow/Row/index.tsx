'use client';

// Imports
// ------------
import Image from 'next/image';
import CompanyMarquee from './CompanyMarquee';
import { useAnimation } from '@utils/useAnimation';
import { NestedLenisContext } from '@parts/NestedLenis';
import gsap from 'gsap';
import { useRef, use } from 'react';

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
				scale: isDesktop ? 2 : 1.2,
				xPercent: isDesktop ? (isEven ? -100 : 100) : 0,
			});

			gsap.to(mediaRef.current, {
				autoAlpha: 1,
				scale: 1,
				xPercent: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'top 50%',
					scrub: 0.5,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady, isReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Content $isEven={isEven}>
				<S.Media>
					<S.MediaAnimation ref={mediaRef}>
						<Image
							src={iconImage.url}
							alt={iconImage.alt}
							fill
							sizes='(max-width: 1023px) 100vw, 23vw'
							loading='eager'
							fetchPriority='high'
						/>
					</S.MediaAnimation>
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
