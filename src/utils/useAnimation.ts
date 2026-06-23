import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

type Breakpoints = Record<string, string>;

type MatchMediaConditions = Record<string, boolean>;

type AnimationCleanup = () => void;

/**
 * A callback function that receives the current match media conditions.
 * Return a cleanup function to revert SplitText, timelines, or other manual resources.
 */
type AnimationCallback = (
	conditions: MatchMediaConditions
) => void | AnimationCleanup;

type UseAnimationOptions = {
	scope?: RefObject<Element | null>;
	dependencies?: unknown[];
	revertOnUpdate?: boolean;
};

const DEFAULT_BREAKPOINTS: Breakpoints = {
	isDesktop: '(min-width: 1024px)',
	isMobile: '(max-width: 699px)',
	isTablet: '(min-width: 700px) and (max-width: 1023px)',
};

/**
 * React hook for running GSAP animations with responsive match media conditions.
 *
 * When `dependencies` are provided, `revertOnUpdate` defaults to `true` so ScrollTriggers
 * and tweens are torn down before re-running (e.g. when modal Lenis opens/closes).
 */
export function useAnimation(
	animationCallback: AnimationCallback,
	options: UseAnimationOptions = {},
	breakpoints: Breakpoints = {}
): void {
	const mergedBreakpoints: Breakpoints = { ...DEFAULT_BREAKPOINTS, ...breakpoints };
	const { dependencies, revertOnUpdate, scope } = options;

	const shouldRevertOnUpdate =
		revertOnUpdate ?? (Array.isArray(dependencies) && dependencies.length > 0);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(mergedBreakpoints, (context: { conditions?: MatchMediaConditions }) => {
				return animationCallback(context.conditions ?? {});
			});

			return () => mm.revert();
		},
		{ scope, dependencies, revertOnUpdate: shouldRevertOnUpdate }
	);
}
