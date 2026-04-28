'use client';

// Imports
// ------------
import { use, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Icon from '@parts/Icon';
import NestedLenis from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Modal = ({ children, title, isDark }: I.ModalProps) => {
	// Contexts
	const { setIsModalOpen, setModalActive, modalActive, isModalOpen } = use(GlobalContext);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const CLOSE_ANIMATION_MS = 1200;
	const [isContentOpen, setIsContentOpen] = useState(false);

	// Handle Close
	const handleClose = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}

		setIsModalOpen(false);
		closeTimeoutRef.current = setTimeout(() => {
			setModalActive('home');
			closeTimeoutRef.current = null;
		}, CLOSE_ANIMATION_MS);
	};

	// Check if modal is open
	const isOpen = isModalOpen && modalActive === title;

	useEffect(() => {
		if (isOpen) {
			setIsContentOpen(true);
			return;
		}

		// Keep content scroll/animations alive until close transition ends.
		if (modalActive === title) {
			const timeout = setTimeout(() => {
				setIsContentOpen(false);
			}, CLOSE_ANIMATION_MS);

			return () => clearTimeout(timeout);
		}

		setIsContentOpen(false);
	}, [isOpen, modalActive, title]);

	useEffect(() => {
		return () => {
			if (!closeTimeoutRef.current) return;
			clearTimeout(closeTimeoutRef.current);
		};
	}, []);

	// Get the current year
	const year = new Date().getFullYear();

	return (
		<S.Jacket $isOpen={isOpen}>
			<S.CloseButton
				$isOpen={isOpen}
				aria-label='Close modal'
				type='button'
				data-hover
				onClick={() => handleClose()}
			>
				<Icon type='close' />
			</S.CloseButton>

			<S.Copyright $isOpen={isOpen}>ONYX &copy; {year}</S.Copyright>

			<S.Content>
				<S.VerticalLine $isOpen={isOpen}>
					<S.VerticalLinePlus />
					<S.VerticalLinePlus $isEnd />
				</S.VerticalLine>

				<S.Clip $isOpen={isOpen} $isDark={isDark}>
					<NestedLenis isOpen={isContentOpen}>{children}</NestedLenis>
				</S.Clip>
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
Modal.displayName = 'Modal';
export default Modal;
