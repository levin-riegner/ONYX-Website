// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, P } from '@tackl';
import { bodyL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
        color: ${getGlobal('black', 50)};

        user-select: none;
        pointer-events: none;

        * {
            color: ${getGlobal('black', 50)};
        }
    `
);
