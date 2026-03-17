'use client';

// Imports
// ------------
import Logo from '@parts/Logo';
import gsap from 'gsap';
import Frame from '@parts/Frame';
import { use, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GlobalContext } from '@parts/Contexts';
import { useAnimation } from '@utils/useAnimation';
import { bezzy2, bezzy4 } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import * as S from './styles';

// Constants
// ------------
const PULSE_SETTINGS = {
	STAGGER: 0.15,
	EASE: bezzy4,
	BEFORE: {
		SCALE: 0.75,
		OPACITY: 0,
		DURATION: 0.5,
	},
	AFTER: {
		SCALE: 1,
		OPACITY: 1,
		DURATION: 0.75,
	},
};

const LINE_SETTINGS = {
	DURATION: 2,
	DELAY: 1,
	EASE: bezzy2,
	BEFORE: {
		SCALE: 0,
	},
	AFTER: {
		SCALE: 1,
	},
};

// Component
// ------------
const Loader = () => {
	// Contexts
	const { isLoaderFinished, setIsLoaderFinished, pageLoaded, areModalsReady } =
		use(GlobalContext);

	const allModalsReady =
		areModalsReady.activation &&
		areModalsReady.dataSupply &&
		areModalsReady.about &&
		areModalsReady.contact;

	// Pulse stops only when page + modals are ready (no font wait)
	const canStopPulse = pageLoaded && allModalsReady;

	// States
	const [shouldRender, setShouldRender] = useState(true);

	// Refs
	const jacketRef = useRef<HTMLElement>(null);
	const logoRef = useRef<SVGSVGElement>(null);
	const pulseRef = useRef<gsap.core.Timeline | null>(null);
	const topLineRef = useRef<HTMLDivElement>(null);
	const bottomLineRef = useRef<HTMLDivElement>(null);
	const leftVerticalRef = useRef<HTMLDivElement>(null);
	const rightVerticalRef = useRef<HTMLDivElement>(null);
	const topFirstPlusRef = useRef<HTMLSpanElement>(null);
	const topLastPlusRef = useRef<HTMLSpanElement>(null);
	const bottomFirstPlusRef = useRef<HTMLSpanElement>(null);
	const bottomLastPlusRef = useRef<HTMLSpanElement>(null);
	const frameRef = useRef<gsap.core.Timeline | null>(null);
	const hasStoppedPulseRef = useRef(false);

	// Set logo initial state before paint to prevent flash/pop (useAnimation runs after paint)
	useLayoutEffect(() => {
		if (!logoRef.current) return;
		const paths = logoRef.current.querySelectorAll('path');
		gsap.set(paths, {
			autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
			scale: PULSE_SETTINGS.BEFORE.SCALE,
			transformOrigin: 'center center',
		});
	}, []);

	// Pulse Animation
	useAnimation(
		() => {
			if (!logoRef.current) return;

			const paths = logoRef.current.querySelectorAll('path');

			gsap.set(paths, {
				autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
				scale: PULSE_SETTINGS.BEFORE.SCALE,
				transformOrigin: 'center center',
			});

			const tl = gsap.timeline({ repeat: -1 });

			tl.to(paths, {
				autoAlpha: PULSE_SETTINGS.AFTER.OPACITY,
				scale: PULSE_SETTINGS.AFTER.SCALE,
				duration: PULSE_SETTINGS.AFTER.DURATION,
				stagger: PULSE_SETTINGS.STAGGER,
				ease: PULSE_SETTINGS.EASE,
			});

			tl.to(
				paths,
				{
					autoAlpha: PULSE_SETTINGS.BEFORE.OPACITY,
					scale: PULSE_SETTINGS.BEFORE.SCALE,
					duration: PULSE_SETTINGS.BEFORE.DURATION,
					stagger: PULSE_SETTINGS.STAGGER,
					ease: PULSE_SETTINGS.EASE,
				},
				'>-0.5'
			);

			pulseRef.current = tl;
		},
		{ scope: jacketRef }
	);

	// Frame Animation — play once page is loaded
	useAnimation(
		() => {
			const horizontalLines = [topLineRef.current, bottomLineRef.current];
			const verticalLines = [leftVerticalRef.current, rightVerticalRef.current];
			const pluses = [
				topFirstPlusRef.current,
				topLastPlusRef.current,
				bottomFirstPlusRef.current,
				bottomLastPlusRef.current,
			];

			if (
				horizontalLines.some(el => !el) ||
				verticalLines.some(el => !el) ||
				pluses.some(el => !el)
			)
				return;

			gsap.set(horizontalLines, { scaleX: LINE_SETTINGS.BEFORE.SCALE });
			gsap.set(verticalLines, { scaleY: LINE_SETTINGS.BEFORE.SCALE });
			gsap.set(pluses, { autoAlpha: 0 });

			if (!pageLoaded) return;

			const tl = gsap.timeline({ delay: LINE_SETTINGS.DELAY });

			tl.to(horizontalLines, {
				scaleX: LINE_SETTINGS.AFTER.SCALE,
				duration: LINE_SETTINGS.DURATION,
				ease: LINE_SETTINGS.EASE,
			});

			tl.to(
				verticalLines,
				{
					scaleY: LINE_SETTINGS.AFTER.SCALE,
					duration: LINE_SETTINGS.DURATION,
					ease: LINE_SETTINGS.EASE,
				},
				'<'
			);

			tl.fromTo(
				pluses,
				{ autoAlpha: 0 },
				{
					autoAlpha: 1,
					duration: 0.5,
					ease: LINE_SETTINGS.EASE,
				},
				'>-0.3'
			);

			frameRef.current = tl;
		},
		{
			scope: jacketRef,
			dependencies: [pageLoaded],
		}
	);

	// Kill logo pulse when loader is hidden (shouldRender false)
	useEffect(() => {
		if (!shouldRender) {
			pulseRef.current?.kill();
			frameRef.current?.kill();
		}
	}, [shouldRender]);

	// Kill GSAP timelines on unmount to prevent memory leaks
	useEffect(
		() => () => {
			pulseRef.current?.kill();
			frameRef.current?.kill();
		},
		[]
	);

	// Stop pulse only when all modals are ready (no timeout — keeps pulsing if e.g. About is commented out)
	useEffect(() => {
		if (!canStopPulse || !pulseRef.current || hasStoppedPulseRef.current) return;

		hasStoppedPulseRef.current = true;
		const tl = pulseRef.current;
		const currentIteration = tl.iteration();
		// Always complete at least 1 full iteration so we never stop mid-pulse
		const remaining = Math.max(2 - currentIteration, 1);

		tl.repeat(remaining);
		tl.eventCallback('onComplete', () => setIsLoaderFinished(true));
	}, [canStopPulse, setIsLoaderFinished]);

	// Outro Animation — only fade out once all components are ready
	useAnimation(
		() => {
			if (!isLoaderFinished || !allModalsReady || !jacketRef.current) return;

			gsap.to(jacketRef.current, {
				autoAlpha: 0,
				duration: 1,
				ease: 'sine.inOut',
				onComplete: () => setShouldRender(false),
			});
		},
		{
			scope: jacketRef,
			dependencies: [isLoaderFinished, allModalsReady],
		}
	);

	if (!shouldRender) return null;

	return (
		<S.Jacket ref={jacketRef}>
			<S.Frame>
				<Frame
					isLight
					className='top'
					lineRef={topLineRef}
					firstPlusRef={topFirstPlusRef}
					lastPlusRef={topLastPlusRef}
				/>
				<Frame
					isLight
					className='bottom'
					lineRef={bottomLineRef}
					firstPlusRef={bottomFirstPlusRef}
					lastPlusRef={bottomLastPlusRef}
				/>
				<S.Vertical $isLeft ref={leftVerticalRef} />
				<S.Vertical ref={rightVerticalRef} />
			</S.Frame>

			<Logo ref={logoRef} />
		</S.Jacket>
	);
};

// Exports
// ------------
Loader.displayName = 'Loader';
export default Loader;
