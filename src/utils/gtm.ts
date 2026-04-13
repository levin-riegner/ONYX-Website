/**
 * Push any payload to `window.dataLayer` (used by Google Tag Manager).
 * In GTM, create a **Custom Event** trigger matching `event` (e.g. `button_click`).
 *
 * @example
 * pushGtmEvent('button_click', { button_id: 'header-contact', label: 'Contact' });
 */
export const pushGtmDataLayer = (payload: Record<string, unknown>) => {
	if (typeof window === 'undefined') return;

	window.dataLayer = window.dataLayer ?? [];
	window.dataLayer.push(payload);
};

export const pushGtmEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
	pushGtmDataLayer({ event: eventName, ...eventParams });
};

/**
 * Virtual page view for client-side navigations (App Router).
 * Configure a **History Change** or **Custom Event** (`page_view`) trigger in GTM as needed.
 */
export const pushGtmPageView = (pagePath: string) => {
	pushGtmDataLayer({
		event: 'page_view',
		page_path: pagePath,
		page_title: typeof document !== 'undefined' ? document.title : '',
	});
};

/**
 * Fires when the user changes the active modal/section (single-page app).
 * In GTM, create a **Custom Event** trigger for `modal_view`, or map to GA4 `page_view` using
 * `page_path` / `modal_name` Data Layer variables.
 */
export const pushGtmModalView = (modalName: string, isModalOpen: boolean) => {
	const slug = modalName.trim().toLowerCase().replace(/\s+/g, '-');
	const pagePath = `/modal/${slug}`;

	pushGtmDataLayer({
		event: 'modal_view',
		modal_name: modalName,
		is_modal_open: isModalOpen,
		page_path: pagePath,
		page_title: modalName === 'home' ? document.title : modalName,
		page_location: typeof window !== 'undefined' ? window.location.href : '',
	});
};
