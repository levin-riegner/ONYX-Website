// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getGlobal, getGap, Picture } from '@tackl';
import { bodyM, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isEven?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        position: relative;
        background: ${getGlobal('luxuryWhite')};
    `
);

export const Content = styled(Div)<StylesInterface>(
	({ $isEven }) => css`
        --aspect: 1/1;
        --desktop-padd: ${getGap('uber')};

        display: flex;
        flex-flow: column;
        
        gap: ${getGap('sm')};
        width: 100%;
        padding-inline: var(--mobile-extra-pad);
        padding-bottom: ${getGap('l')};

        ${bp.m`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: '${$isEven ? 'media text' : 'text media'}';
            gap: ${getGap('l')};
            padding-inline: ${$isEven ? `0 var(--desktop-padd)` : `var(--desktop-padd) 0`};
            padding-bottom: 0;
        `}
    `
);

export const Media = styled(Div)(
	() => css`
        grid-area: media;

        position: relative;
        display: flex;
        aspect-ratio: var(--aspect);
        overflow: hidden;
    `
);

export const MediaAnimation = styled(Picture)(
	() => css`
        position: absolute;
        inset: 0;
        mix-blend-mode: multiply;

        img {
            display: block;
            object-fit: contain;
            width: 100%;
            height: 100%;
            
        }
    `
);

export const Texts = styled(Div)(
	() => css`
        grid-area: text;

        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: ${getGap('sm')};
        text-align: center;
        overflow: hidden;

        ${bp.l`
            align-items: flex-start;
            gap: ${getGap('l')};
            text-align: left;
        `}

        h3 {
            ${titleL}
            color: ${getGlobal('black')};
            text-wrap: balance;
        }

        p {
            ${bodyM}
            color: ${getGlobal('black', 60)};
            text-wrap: balance;
        }
    `
);
