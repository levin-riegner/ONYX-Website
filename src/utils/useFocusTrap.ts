import { type RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR =
	'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (container: HTMLElement) =>
	Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
		element => !element.closest('[inert]')
	);

export const useFocusTrap = (
	containerRef: RefObject<HTMLElement | null>,
	isActive: boolean
) => {
	useEffect(() => {
		const container = containerRef.current;
		if (!isActive || !container) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;

			const focusable = getFocusableElements(container);
			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
				return;
			}

			if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		container.addEventListener('keydown', handleKeyDown);

		return () => container.removeEventListener('keydown', handleKeyDown);
	}, [containerRef, isActive]);
};
