'use client';

// Imports
// ------------
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollAnimatedHeading from '@parts/ScrollAnimatedHeading';
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { NestedLenisContext } from '@parts/NestedLenis';
import { use, useRef, useState, useEffect } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { bezzy4 } from '@parts/AnimationPlugins/Curves';
import Member from './Member';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// GSAP Plugins
// ------------
gsap.registerPlugin(ScrollTrigger);

// Component
// ------------
const TeamMembers = ({ heading, desc, teamMembers }: I.TeamMembersProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// States
	const [memberWidth, setMemberWidth] = useState(0);

	// Effect – Track dimensions for animation; only on desktop (matches useAnimation isDesktop: 1024px)
	const DESKTOP_MEDIA = '(min-width: 1024px)';
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		let rafId: number | null = null;
		let pending = false;

		const updateWidth = () => {
			const firstLi = list.querySelector('li');
			const w = firstLi?.getBoundingClientRect().width ?? 0;
			setMemberWidth(w);
			pending = false;
		};

		const throttledUpdate = () => {
			if (pending) return;
			pending = true;
			rafId = requestAnimationFrame(updateWidth);
		};

		let observer: ResizeObserver | null = null;

		const startObserving = () => {
			updateWidth();
			observer = new ResizeObserver(throttledUpdate);
			observer.observe(list);
		};

		const stopObserving = () => {
			if (rafId !== null) cancelAnimationFrame(rafId);
			setMemberWidth(0);
			observer?.disconnect();
			observer = null;
		};

		const mq = window.matchMedia(DESKTOP_MEDIA);
		if (mq.matches) startObserving();

		const handleChange = (e: MediaQueryListEvent) => {
			if (e.matches) startObserving();
			else stopObserving();
		};

		mq.addEventListener('change', handleChange);
		return () => {
			mq.removeEventListener('change', handleChange);
			stopObserving();
		};
	}, []);

	// Animation Check
	const aniCheck =
		!bottomRef.current ||
		!listRef.current ||
		!scrollWrapper.current ||
		!lenisReady ||
		!teamMembers.length ||
		!memberWidth;

	// Animations
	useAnimation(
		({ isDesktop }) => {
			if (!isDesktop || aniCheck) return;

			const list = listRef.current;
			const bottom = bottomRef.current;
			const scroller = scrollWrapper.current;
			if (!list || !bottom || !scroller) return;

			// Kill existing ScrollTrigger for this section (avoids iterating all triggers)
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;

			// Reset list position before animating (prevents wrong initial state from previous runs)
			gsap.set(list, { x: 0 });

			const scrollDistance = (teamMembers.length - 1) * 100;
			const n = teamMembers.length;

			// Snap to nearest member: progress 0..1 maps to member 0..n-1
			const snapToNearestMember = (progress: number) => {
				if (n <= 1) return 0;
				const step = 1 / (n - 1);
				const index = Math.round(progress * (n - 1));
				return Math.max(0, Math.min(1, index * step));
			};

			const tween = gsap.to(list, {
				x: -(teamMembers.length - 1) * memberWidth,
				ease: 'none',
				scrollTrigger: {
					trigger: bottom,
					scroller,
					start: 'top top',
					end: `+=${scrollDistance}%`,
					pin: true,
					scrub: 0.5,
					snap: {
						snapTo: snapToNearestMember,
						duration: { min: 0.5, max: 1 },
						delay: 0,
						ease: bezzy4,
						directional: false,
					},
				},
			});
			scrollTriggerRef.current = tween.scrollTrigger ?? null;
		},
		{
			scope: jacketRef,
			dependencies: [lenisReady, teamMembers.length, memberWidth],
			revertOnUpdate: true,
		}
	);

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame isLight />

			<S.Top>
				<Frame className='top' isLight />
				<Grid>
					<S.Heading $l='3/11'>
						<ScrollAnimatedHeading text={heading} />
					</S.Heading>
					<S.Desc $l='3/11'>{desc}</S.Desc>
				</Grid>
			</S.Top>

			<S.Bottom ref={bottomRef}>
				<Frame className='top' isLight />

				<ul ref={listRef}>
					{teamMembers.map(({ id, name, role, linkedinUrl, email, image }) => (
						<Member
							key={id}
							name={name}
							role={role}
							linkedinUrl={linkedinUrl}
							email={email}
							image={image}
						/>
					))}
				</ul>

				<Frame className='bottom' isLight />
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
TeamMembers.displayName = 'TeamMembers';
export default TeamMembers;
