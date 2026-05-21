const DEFAULT_GTM_CONTAINER_ID = 'GTM-MC37B7RV';

/**
 * Resolves the GTM container id. Empty `NEXT_PUBLIC_GTM_ID` falls back to the default
 * (empty string would otherwise disable the snippet).
 */
export const getGtmContainerId = (): string => {
	const raw = process.env.NEXT_PUBLIC_GTM_ID;
	if (raw === undefined || raw === null) return DEFAULT_GTM_CONTAINER_ID;

	const t = String(raw).trim();
	return t === '' ? DEFAULT_GTM_CONTAINER_ID : t;
};

/** Inline bootstrap snippet (Google’s standard install). */
export const getGtmBootstrapInlineScript = (containerId: string) =>
	`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`;

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
