'use client';

// Imports
// ------------
import { useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import { bezzy3, slow } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const PULSE_COUNT = 7;

const PULSE_RING_KEYS = Array.from(
	{ length: PULSE_COUNT },
	(_, index) => `pulse-ring-${index + 1}`
);

// Component
// ------------
const BackgroundPulses = ({ isReady }: I.BackgroundPulsesProps) => {
	const jacketRef = useRef<HTMLDivElement>(null);
	const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

	const handleSpanRef = useCallback((index: number) => {
		return (el: HTMLSpanElement | null) => {
			spanRefs.current[index] = el;
		};
	}, []);

	useAnimation(
		() => {
			const spans = spanRefs.current.filter((el): el is HTMLSpanElement => el !== null);

			if (!jacketRef.current || spans.length === 0) return;

			gsap.killTweensOf(spans);

			if (isReady) {
				gsap.to(spans, {
					scale: 1,
					duration: 1.2,
					ease: slow,
					transformOrigin: '50% 50%',
					stagger: { each: 0.1 },
				});
			} else {
				gsap.to(spans, {
					scale: 0,
					duration: 1,
					ease: bezzy3,
					stagger: { each: 0.1, from: 'end' },
				});
			}
		},
		{ scope: jacketRef, dependencies: [isReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			{PULSE_RING_KEYS.map((key, index) => (
				<div key={key}>
					<span ref={handleSpanRef(index)} />
				</div>
			))}
		</S.Jacket>
	);
};

// Exports
// ------------
BackgroundPulses.displayName = 'BackgroundPulses';
export default BackgroundPulses;
