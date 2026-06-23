// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Nav, getEase, getGap } from '@tackl';
import { bodyS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	type?: 'button';
	ariaLabel?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	$isModalOpen?: boolean;
	$isNavLocked?: boolean;
	inert?: boolean;
	id?: string;
	'aria-label'?: string;
}

// Exports
// ------------
export const Jacket = styled(Nav)<StylesInterface>(
	({ $isModalOpen, $isNavLocked }) => css`
        display: none;

        ${bp.l`
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);

            display: flex;
            align-items: center;
            justify-content: center;
            width: max-content;
            
            opacity: ${$isModalOpen ? 0 : 1};
            pointer-events: ${$isNavLocked ? 'none' : 'auto'};
            transition: opacity 0.5s ${getEase('bezzy3')};
            transition-delay: ${$isModalOpen ? 0 : 0.35}s;
        `}

        button {
            ${bodyS}
            cursor: pointer;
            padding: ${getGap('sm')};
            transition: opacity 0.5s ${getEase('bezzy3')};

            @media (hover: hover) and (pointer: fine) {
                &:hover {
                    opacity: 0.4;
                }

                &:active {
                    opacity: 0.2;
                    transition: opacity 0s linear;
                }
            }
        }
    `
);
