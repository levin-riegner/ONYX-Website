'use client';

// Imports
// ------------
import { useAnimation } from '@utils/useAnimation';
import { useRef, use, useState } from 'react';
import { NestedLenisContext } from '@parts/NestedLenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// GSAP Plugins
// ------------
gsap.registerPlugin(ScrollTrigger);

// Component
// ------------
const CompanyMarquee = ({ speed, companies }: I.CompanyMarqueeProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// States
	const [canPlay, setCanPlay] = useState(false);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Animations • Pause marquee until needed
	useAnimation(
		() => {
			if (!jacketRef.current || !scrollWrapper.current || !lenisReady) return;

			ScrollTrigger.create({
				trigger: jacketRef.current,
				scroller: scrollWrapper.current,
				start: 'top bottom',
				end: 'bottom top',
				scrub: false,
				markers: true,
				onEnter: () => setCanPlay(true),
				onEnterBack: () => setCanPlay(true),
				onLeave: () => setCanPlay(false),
				onLeaveBack: () => setCanPlay(false),
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket
			$speed={speed}
			$isMarquee={companies.length > 4}
			$canPlay={canPlay}
			ref={jacketRef}
		>
			<ul>
				{companies.map(({ heading, id }) => (
					<li key={id ?? heading}>{heading}</li>
				))}
			</ul>

			<ul aria-hidden='true'>
				{companies.map(({ heading, id }) => (
					<li key={id ?? heading}>{heading}</li>
				))}
			</ul>
		</S.Jacket>
	);
};

// Exports
// ------------
CompanyMarquee.displayName = 'CompanyMarquee';
export default CompanyMarquee;
