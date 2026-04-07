// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        position: absolute;
        inset: 0;
        z-index: -1;
        background: ${getGlobal('luxuryWhite')};
        overflow: hidden;

        &:after {
            content: '';
            position: absolute;
            z-index: 6;
            inset: 0;
            background: linear-gradient(to top, ${getGlobal('luxuryWhite')}, transparent);
        }

        div{
            --size: 25vw;
            --increments: 0.423s;

            position: absolute;
            top: 0%;
            right: 0%;
            transform: translate(50%,-50%) scale(1);
            overflow: visible;

            width: var(--size);
            height: var(--size);


            &:nth-child(1) {
                --size: 25vh;
                z-index: 6;
                animation-delay: 0s;

                ${bp.l`
                    --size: 25vw;
                `}
            }

            &:nth-child(2) {
                --size: 50vh;
                z-index: 5;
                animation-delay: var(--increments);

                ${bp.l`
                    --size: 50vw;
                `}
            }

            &:nth-child(3) {
                --size: 75vh;
                z-index: 4;

                animation-delay: calc(var(--increments) * 2);

                ${bp.l`
                    --size: 75vw;
                `}
            }

            &:nth-child(4) {
                --size: 100vh;
                z-index: 3;

                animation-delay: calc(var(--increments) * 3);

                ${bp.l`
                    --size: 100vw;
                `}
            }

            &:nth-child(5) {
                --size: 125vh;
                z-index: 2;

                animation-delay: calc(var(--increments) * 4);

                ${bp.l`
                    --size: 125vw;
                `}
            }

            &:nth-child(6) {
                --size: 150vh;
                z-index: 1;

                animation-delay: calc(var(--increments) * 5);

                ${bp.l`
                    --size: 150vw;
                `}
            }

            &:nth-child(7) {
                --size: 175vh;
                z-index: 0;

                animation-delay: calc(var(--increments) * 6);

                ${bp.l`
                    --size: 175vw;
                `}
            }

            span {
                position: relative;
                z-index: 1;
                display: block;
                transform: scale(0);
                transform-origin: center center;

                width: var(--size);
                height: var(--size);

                background: ${getGlobal('luxuryWhite')};
                border-radius: 50%;
                box-shadow: -1.2rem 1.2rem 12rem 0 ${getBrand('bc4', 50)};
            }
        }

        
    `
);
