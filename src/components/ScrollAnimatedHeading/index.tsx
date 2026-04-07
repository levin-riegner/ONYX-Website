'use client';

// Imports
// ------------
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { NestedLenisContext } from '@parts/NestedLenis';
import { useRef, use } from 'react';
import { useAnimation } from '@utils/useAnimation';

// Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// GSAP Plugins
// ------------
gsap.registerPlugin(CustomEase, SplitText);

// Component
// ------------
const ScrollAnimatedHeading = ({ text, l }: I.ScrollAnimatedHeadingProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Animations
	useAnimation(
		() => {
			if (!jacketRef.current || !lenisReady || !scrollWrapper.current) return;

			// Split container content into lines and chars
			const split = SplitText.create(jacketRef.current, {
				type: 'lines,chars',
				linesClass: 'line',
				charsClass: 'char',
				aria: 'none',
			});

			const chars = split.chars as HTMLElement[];

			// If either split failed, bail and clean up immediately
			if (!chars.length) {
				split.revert();
				return;
			}

			gsap.set(chars, { autoAlpha: 0 });

			gsap.to(chars, {
				autoAlpha: 1,
				stagger: { each: 0.02, from: 'random' },
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'top 50%',
					scrub: 0.5,
					markers: false,
				},
			});

			// Cleanup on unmount / dependency change
			return () => {
				split.revert();
			};
		},
		{
			scope: jacketRef,
			dependencies: [lenisReady],
		}
	);

	return (
		<S.Jacket ref={jacketRef} $l={l ?? '1/-1'}>
			{text}
		</S.Jacket>
	);
};

// Exports
// ------------
ScrollAnimatedHeading.displayName = 'ScrollAnimatedHeading';
export default ScrollAnimatedHeading;
