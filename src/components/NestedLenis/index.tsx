'use client';

// Imports
// ------------
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useLayoutEffect, useEffect, createContext, useState } from 'react';

// Styles (lenis rules inlined in global.css to reduce render-blocking requests)
// ------------
import type * as I from './interface';
import * as S from './styles';

// Scroll Context
// ------------
export const NestedLenisContext = createContext({
	lenisInstance: { current: null } as React.RefObject<Lenis | null>,
	scrollWrapper: { current: null } as React.RefObject<HTMLDivElement | null>,
	scrollContent: { current: null } as React.RefObject<HTMLDivElement | null>,
	lenisReady: false,
});

// Component
// ------------
const NestedLenis = ({ children, isOpen }: I.NestedLenisProps) => {
	// Refs
	const scrollWrapper = useRef<HTMLDivElement>(null);
	const scrollContent = useRef<HTMLDivElement>(null);
	const lenisInstance = useRef<Lenis | null>(null);
	const rafIdRef = useRef<number | null>(null);
	const rafControlRef = useRef<{ start: () => void; stop: () => void } | null>(null);

	// States
	const [lenisReady, setLenisReady] = useState(false);

	// Setup: create Lenis once (RAF controlled by isOpen in separate effect)
	useLayoutEffect(() => {
		const wrapper = scrollWrapper.current;
		const content = scrollContent.current;

		if (!wrapper || !content) return;

		const lenis = new Lenis({
			wrapper,
			content,
			allowNestedScroll: true,
		});

		lenisInstance.current = lenis;

		ScrollTrigger.scrollerProxy(wrapper, {
			scrollTop(value?: number) {
				if (value !== undefined) {
					lenis.scrollTo(value, { immediate: true });
				} else {
					return lenis.scroll;
				}
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: wrapper.clientWidth,
					height: wrapper.clientHeight,
				};
			},
			pinType: 'transform',
		});

		lenis.on('scroll', ScrollTrigger.update);

		const startRaf = () => {
			if (rafIdRef.current !== null) return;
			const raf = (time: number) => {
				lenis.raf(time);
				rafIdRef.current = requestAnimationFrame(raf);
			};
			rafIdRef.current = requestAnimationFrame(raf);
		};

		const stopRaf = () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
				rafIdRef.current = null;
			}
		};

		rafControlRef.current = { start: startRaf, stop: stopRaf };

		ScrollTrigger.refresh();

		return () => {
			stopRaf();
			lenis.off('scroll', ScrollTrigger.update);
			ScrollTrigger.scrollerProxy(wrapper, {});
			lenis.destroy();
			lenisInstance.current = null;
			rafControlRef.current = null;
		};
	}, []);

	// Start RAF when modal opens, stop when closed (prevents 5 concurrent RAF loops draining CPU)
	useLayoutEffect(() => {
		const control = rafControlRef.current;
		if (!control) return;

		if (isOpen) {
			control.start();
			setLenisReady(true);
			// Reset scroll when opening so modal always starts at top (fixes reopen-after-scroll-down)
			requestAnimationFrame(() => {
				lenisInstance.current?.scrollTo(0, { immediate: true });
			});
		} else {
			control.stop();
			setLenisReady(false);
		}
	}, [isOpen]);

	// When modal closes, reset scroll to top so it opens at top next time
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!isOpen) {
				lenisInstance.current?.scrollTo(0, {});
			}
		}, 1100);

		return () => clearTimeout(timeout);
	}, [isOpen]);

	return (
		<NestedLenisContext.Provider
			value={{
				lenisInstance,
				scrollWrapper,
				scrollContent,
				lenisReady,
			}}
		>
			<S.Jacket ref={scrollWrapper}>
				<S.Content ref={scrollContent}>{children}</S.Content>
			</S.Jacket>
		</NestedLenisContext.Provider>
	);
};

// Exports
// ------------
NestedLenis.displayName = 'NestedLenis';
export default NestedLenis;
