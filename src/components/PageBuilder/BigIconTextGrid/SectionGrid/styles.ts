// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
	ListItem,
	Picture,
	H3,
	H2,
	P,
} from '@tackl';
import { bodyL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(ListItem)<StylesInterface>(
	() => css`
        position: relative;
        z-index: 0;
        display: flex;
        flex-direction: column;
        gap: ${getGap('sm')};
        padding-bottom: ${getGap('l')};
        background: ${getGlobal('luxuryWhite')};
        

        ${bp.l`
            position: sticky;
            top: 0;
            left: 0;
            gap: ${getGap('l')};
            padding-bottom: ${getGap('xxl')};
        `}

        .frame.top {
            position: absolute;
            left: 0;
            top: var(--mobile-pad);
            z-index: 2;

            ${bp.l`
                top: ${getGap('sm')};
            `}
        }
    `
);

export const Icon = styled(Picture)(
	() => css`
		position: relative;

		width: 100%;
		height: 100%;
        aspect-ratio: 1/1;
        background: ${getGlobal('luxuryWhite')};
        
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply;

        }
	`
);

export const Heading = styled(H2)(
	() => css`
		${titleL}
		color: ${getGlobal('black')};
        margin-bottom: ${getGap('sm')};

        ${bp.l`
            margin-bottom: none;
        `}
	`
);

export const Description = styled(Div)(
	() => css`
        
        

        p {
            ${bodyL}
            color: ${getGlobal('black', 60)};
            text-wrap: pretty;
        }
    `
);
