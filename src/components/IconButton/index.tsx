'use client';

// Imports
// ------------
import Icon from '@parts/Icon';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const getDefaultAriaLabel = (icon: string): string => {
	switch (icon) {
		case 'linkedin':
			return 'Visit LinkedIn profile';
		case 'mail':
			return 'Send email';
		default:
			return 'Open link';
	}
};

const IconButton = ({ icon, to, ariaLabel }: I.IconButtonProps) => {
	const label = ariaLabel ?? getDefaultAriaLabel(icon);
	return (
		<S.Jacket
			href={to}
			target='_blank'
			rel='noopener noreferrer'
			data-hover
			aria-label={label}
		>
			<Icon type={icon} />
		</S.Jacket>
	);
};

// Exports
// ------------
IconButton.displayName = 'IconButton';
export default IconButton;
