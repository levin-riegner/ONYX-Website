// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import { captionL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$speed?: number;
	$isMarquee?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	({ $speed, $isMarquee }) => css`
        --gap: 1rem;
        
        display: flex;
        width: 100%;
        overflow: hidden;
        user-select: none;
        gap: var(--gap);

        mask-image: linear-gradient(
			270deg,
			${getGlobal('white', 0)} 0%,
			${getGlobal('white')} 10%,
			${getGlobal('white')} 50%,
			${getGlobal('white')} 90%,
			${getGlobal('white', 0)} 100%
		);

        @keyframes company-scroll {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(calc(-100% - var(--gap)));
            }
        }

        ul {
            flex-shrink: 0;
            display: flex;
            justify-content: space-around;
            gap: var(--gap);

            

            animation: company-scroll ${($speed ?? 1) * 10}s linear infinite;

            li {
                ${captionL}

                display: block;
                color: ${getBrand('bc3')};
                min-width: max-content;

                &:after {
                    content: '•';
                    margin-left: ${getGap('xs')};
                }
            }
        }
    `
);
