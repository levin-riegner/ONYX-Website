'use client';

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import { pushGtmModalView } from '@utils/gtm';
import { use, useEffect, useRef } from 'react';

// Component
// ------------
/**
 * Pushes `modal_view` to the data layer when `modalActive` / modal open state changes.
 * Skips the first run so the initial shell load does not duplicate the GTM page load.
 */
const GoogleTagManagerModalTracking = () => {
	const { modalActive, isModalOpen } = use(GlobalContext);
	const isFirstRun = useRef(true);

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		pushGtmModalView(modalActive, isModalOpen);
	}, [modalActive, isModalOpen]);

	return null;
};

// Exports
// ------------
GoogleTagManagerModalTracking.displayName = 'GoogleTagManagerModalTracking';
export default GoogleTagManagerModalTracking;
