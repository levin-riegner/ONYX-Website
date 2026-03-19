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
	Picture,
	H4,
	P,
} from '@tackl';
import { bodyL, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isEven?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	({ $isEven }) => css`
        --aspect: 1/1;

		position: relative;
        display: flex;
        flex-flow: column;
        
        padding-inline: 1.2rem;
        background: ${getGlobal('luxuryWhite')};

        ${bp.l`
            flex-direction: ${$isEven ? 'row' : 'row-reverse'};
            padding-inline: ${getGap('sm')};
        `}

        .frame.bottom {
            position: absolute;
            inset: auto 0 0 0;
            z-index: 3;;
        }

	`
);

export const Vertical = styled.span<StylesInterface>(
	() => css`
        flex: 0 0 1px;
		background: ${getBrand('bc5')};

        display: none;
        ${bp.l` display: block; `}
	`
);

export const FeatureMedia = styled(Div)<StylesInterface>(
	() => css`
        width: 100%;
        aspect-ratio: var(--aspect);
		position: relative;
        display: block;
        background: ${getGlobal('luxuryWhite')};
        overflow: hidden;
        
        ${bp.l`
            flex: 1 1 50%;
        `}
	`
);

export const FeaturedMediaAnimation = styled(Picture)<StylesInterface>(
	() => css`
        position: absolute;
        inset: 0;
        mix-blend-mode: multiply;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
	`
);

export const FeatureContent = styled(Div)<StylesInterface>(
	() => css`
        
		position: relative;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: ${getGap('sm')};
        padding: ${getGap('sm')} var(--mobile-pad) ${getGap('l')};
        width: 100%;

        ${bp.l`
            flex: 1 1 50%;
            aspect-ratio: var(--aspect);
            gap: 0;
            padding: ${getGap('l')};
        `}
	`
);

export const FeatureHeading = styled(H4)<StylesInterface>(
	() => css`
        ${titleL}
		position: relative;
        color: ${getGlobal('black')};
        
        width: 100%;
        text-align: center;

        ${bp.l`
            text-align: left;
        `}
	`
);

export const FeatureDesc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
		position: relative;
        color: ${getGlobal('black', 50)};

        text-align: center;
        width: 100%;

        ${bp.l`
            text-align: left;
        `}
	`
);
