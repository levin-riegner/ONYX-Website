'use client';

// Imports
// ------------
import { MODAL_ANIMATION_MS } from '@/constants/modal';
import { use, useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
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
	const [isContentOpen, setIsContentOpen] = useState(false);
	const [canClose, setCanClose] = useState(false);

	// Check if modal is open
	const isOpen = isModalOpen && modalActive === title;

	useEffect(() => {
		if (!isOpen) {
			setCanClose(false);
			return;
		}

		setCanClose(false);
		const timeout = setTimeout(() => setCanClose(true), MODAL_ANIMATION_MS);

		return () => clearTimeout(timeout);
	}, [isOpen]);

	// Handle Close
	const handleClose = useCallback(() => {
		if (!canClose) return;

		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}

		setIsModalOpen(false);
		closeTimeoutRef.current = setTimeout(() => {
			setModalActive('home');
			closeTimeoutRef.current = null;
		}, MODAL_ANIMATION_MS);
	}, [canClose, setIsModalOpen, setModalActive]);

	const handleBackdropClick = () => {
		if (!isOpen || !canClose) return;
		handleClose();
	};

	const handleCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (!canClose) return;
		handleClose();
	};

	const handleContentClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || !canClose) return;
			event.preventDefault();
			handleClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, canClose, handleClose]);

	useEffect(() => {
		if (isOpen) {
			setIsContentOpen(true);
			return;
		}

		// Keep content scroll/animations alive until close transition ends.
		if (modalActive === title) {
			const timeout = setTimeout(() => {
				setIsContentOpen(false);
			}, MODAL_ANIMATION_MS);

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
		<S.Jacket
			$isOpen={isOpen}
			$canClose={canClose}
			role='dialog'
			aria-modal={isOpen}
			aria-label={title}
			onClick={handleBackdropClick}
		>
			<S.CloseButton
				$isOpen={isOpen}
				$canClose={canClose}
				aria-label='Close modal'
				type='button'
				data-hover
				disabled={!canClose}
				aria-disabled={!canClose}
				onClick={handleCloseClick}
			>
				<Icon type='close' />
			</S.CloseButton>

			<S.Copyright $isOpen={isOpen}>ONYX &copy; {year}</S.Copyright>

			<S.Content onClick={handleContentClick}>
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
