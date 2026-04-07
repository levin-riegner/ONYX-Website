'use client';

// Imports
// ------------
import { useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
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
const AnimatedDescription = ({ isReady, text, l }: I.AnimatedDescriptionProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Animations
	useAnimation(
		() => {
			if (!jacketRef.current) return;

			const split = SplitText.create(jacketRef.current, {
				type: 'lines',
				linesClass: 'line',
				aria: 'none',
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
		<S.Jacket ref={jacketRef} $l={l ?? '1/9'}>
			{text}
		</S.Jacket>
	);
};

// Exports
// ------------
AnimatedDescription.displayName = 'AnimatedDescription';
export default AnimatedDescription;
