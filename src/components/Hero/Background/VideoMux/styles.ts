// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Poster = styled.img(() => css``);

export const Jacket = styled(Div)(
	() => css`
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		width: 120lvh;
		aspect-ratio: 48/27;
		overflow: visible;

		${bp.l`
			top: auto;
			bottom: 0;
			transform: translate(-50%, 60%) rotate(90deg);
			width: 120vw;
			mix-blend-mode: screen;
		`}

		video,
		mux-player,
		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	`
);
