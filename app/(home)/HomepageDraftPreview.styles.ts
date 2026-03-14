import styled, { css } from 'styled-components';
import { bp, getGlobal, getRadius } from '@tackl';

export const Toolbar = styled.aside(
	() => css`
        position: fixed;
        right: 1.6rem;
        bottom: 1.6rem;
        z-index: 1001;

        display: grid;
        gap: 1.2rem;

        width: max-content;
        max-width: calc(100vw - 3.2rem);
        padding: 1.2rem;

        color: ${getGlobal('black')};
        background: ${getGlobal('luxuryWhite')};
        border: 1px solid ${getGlobal('black', 12)};
        border-radius: ${getRadius('s')};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

        ${bp.l`
            right: 2.4rem;
            bottom: 2.4rem;
        `}
    `
);

export const Actions = styled.div(
	() => css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        width: max-content;
        max-width: 100%;
    `
);

const actionStyles = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3.6rem;
    padding: 0 1.2rem;
    border-radius: ${getRadius('s')};
    font-size: 1.3rem;
    line-height: 1;
    transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
`;

export const ToggleButton = styled.button(
	() => css`
        ${actionStyles}

        color: ${getGlobal('luxuryWhite')};
        background: ${getGlobal('black')};
        cursor: pointer;
    `
);

export const ExitLink = styled.button(
	() => css`
        ${actionStyles}

        color: ${getGlobal('black')};
        background: ${getGlobal('luxuryWhite')};
        border: 1px solid ${getGlobal('black', 16)};
    `
);

export const ErrorText = styled.p(
	() => css`
        font-size: 1.2rem;
        line-height: 1.5;
        color: ${getGlobal('black', 70)};
    `
);
