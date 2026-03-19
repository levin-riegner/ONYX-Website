// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getGap, H3, H4, P, Picture } from '@tackl';
import { bodyL, headlineS, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isEven?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
        position: relative;
        padding-bottom: var(--mobile-pad);

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}

        .side-frame {
            z-index: 1;
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;


        > .frame {
            position: absolute;
            z-index: 2;

            &.top {
                top: var(--mobile-pad);

                ${bp.l`
                    top: ${getGap('sm')};
                `}
            }
            &.bottom { bottom: 0; }
        }
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
    ${headlineS}
    color: ${getGlobal('black')};
    text-wrap: balance;
    text-align: center;
    padding-block: ${getGap('xl')} ${getGap('l')};

    ${bp.l`
        text-align: left;
        padding-block: ${getGap('huge')} ${getGap('xxl')};
    `}
`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        display: flex;
        flex-direction: column;

        .frame.bottom {
            z-index: 2;
        }
	`
);
