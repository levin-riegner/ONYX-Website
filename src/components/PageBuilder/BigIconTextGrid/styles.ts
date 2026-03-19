// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H2, P } from '@tackl';
import { bodyL, headlineS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
        position: relative;
        z-index: 0;
        background: ${getGlobal('luxuryWhite')};
        padding-block: var(--mobile-pad);
        overflow: clip;


        ${bp.l`
            padding-block: ${getGap('sm')};
        `}

        .side-frame {
            z-index: 0;
        }
    `
);

export const Top = styled(Section)(
	() => css`
		position: relative;
        padding-block: ${getGap('m')};

        ${bp.l`
            padding-block: ${getGap('xxl')} ${getGap('l')};
        `}


        waffl-grid {
            row-gap: ${getGap('m')};

            ${bp.l`
                row-gap: ${getGap('xxl')};
            `}
        }
	`
);

export const Heading = styled(Div)(
	() => css`
	
	`
);

export const Description = styled(P)(
	() => css`
		${bodyL}
        color: ${getGlobal('black', 60)};
	`
);

export const Bottom = styled(Section)(
	() => css`
        background: ${getBrand('bc5')};
        overflow: clip;

        ul {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
	`
);
