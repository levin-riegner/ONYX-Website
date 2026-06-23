'use client';

// Imports
// ------------
import Icon from '@parts/Icon';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Contact = ({ contactTitle }: I.ContactProps) => {
	// Contexts
	const { openModal, isNavLocked, isModalOpen } = use(GlobalContext);

	// Handle Click
	const handleClick = (label: string) => {
		if (isNavLocked) return;
		openModal(label);
	};

	return (
		<S.Jacket
			data-hover
			type='button'
			aria-label={`Open ${contactTitle}`}
			inert={isNavLocked ? true : undefined}
			$isModalOpen={isModalOpen}
			$isNavLocked={isNavLocked}
			onClick={() => handleClick(contactTitle)}
		>
			<Icon type='mail' />
			<span>{contactTitle}</span>
		</S.Jacket>
	);
};

// Exports
// ------------
Contact.displayName = 'Contact';
export default Contact;
