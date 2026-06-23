'use client';

// Imports
// ------------
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Lenis from 'lenis';
import { useRef, useLayoutEffect, createContext, useState } from 'react';

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

	// States
	const [lenisReady, setLenisReady] = useState(false);

	// Create Lenis only while the modal scroller is open (avoids 5 idle instances on page load)
	useLayoutEffect(() => {
		if (!isOpen) {
			setLenisReady(false);
			return;
		}

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

		const stopRaf = () => {
			if (rafIdRef.current === null) return;
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		};

		const startRaf = () => {
			if (rafIdRef.current !== null) return;
			const raf = (time: number) => {
				lenis.raf(time);
				rafIdRef.current = requestAnimationFrame(raf);
			};
			rafIdRef.current = requestAnimationFrame(raf);
		};

		const resetScroll = () => {
			lenis.scrollTo(0, { immediate: true });
			wrapper.scrollTop = 0;
			ScrollTrigger.refresh();
		};

		startRaf();
		resetScroll();
		setLenisReady(true);

		return () => {
			setLenisReady(false);
			stopRaf();
			lenis.off('scroll', ScrollTrigger.update);
			ScrollTrigger.scrollerProxy(wrapper, {});
			lenis.destroy();
			lenisInstance.current = null;
		};
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
