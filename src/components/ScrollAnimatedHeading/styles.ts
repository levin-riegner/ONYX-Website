// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H2 } from '@tackl';
import { headlineS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(H2)<StylesInterface>(
	() => css`
        ${headlineS}
        color: ${getGlobal('black')};
        text-wrap: balance;
        text-align: center;

        ${bp.l`
            text-align: left;
        `}

        * {
            color: ${getGlobal('black')};
        }
    `
);
