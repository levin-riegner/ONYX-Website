'use client';

// Imports
// ------------
import Grid from '@waffl';
import Image from 'next/image';
import Subheading from '@parts/Subheading';
import { StructuredText } from 'react-datocms/structured-text';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import { useRef, use } from 'react';
import { NestedLenisContext } from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SectionGrid = ({ subHeading, heading, desc, icon, isLast }: I.SectionGridProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	useAnimation(
		() => {
			if (!jacketRef.current || !lenisReady || !scrollWrapper.current) return;

			if (!isLast) {
				gsap.to(jacketRef.current, {
					opacity: 0,
					yPercent: -50,
					ease: 'none',
					scrollTrigger: {
						trigger: jacketRef.current,
						scroller: scrollWrapper.current,
						start: 'top 0%',
						end: 'bottom 0%',
						scrub: true,
						markers: false,
					},
				});
			} else {
				gsap.to(jacketRef.current, {
					opacity: 0,
					yPercent: 50,
					ease: 'none',
					scrollTrigger: {
						trigger: jacketRef.current,
						scroller: scrollWrapper.current,
						start: 'top 0%',
						end: 'bottom 0%',
						scrub: true,
						markers: false,
					},
				});
			}
		},
		{
			scope: jacketRef,
			dependencies: [lenisReady],
		}
	);

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame />
			<Frame className='top' />

			<Grid>
				<S.Icon $l='3/11'>
					<Image
						src={icon.url}
						alt={icon.alt}
						blurDataURL={icon.blur}
						width={534}
						height={534}
					/>
				</S.Icon>
			</Grid>

			<Grid>
				<Subheading>
					<h3>{subHeading}</h3>
				</Subheading>
			</Grid>

			<Grid>
				<S.Heading $l='1/6'>{heading}</S.Heading>

				<S.Description $l='7/13'>
					<StructuredText data={desc.value} />
				</S.Description>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
SectionGrid.displayName = 'SectionGrid';
export default SectionGrid;
