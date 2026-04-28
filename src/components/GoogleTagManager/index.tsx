// Imports
// ------------
import { getGtmBootstrapInlineScript, getGtmContainerId } from '@utils/gtm';
import Script from 'next/script';

// Component
// ------------
/** Google Tag Manager via `next/script` + `<noscript>` iframe (Google’s install pattern). */
const GoogleTagManager = () => {
	const gtmId = getGtmContainerId();
	if (!gtmId) return null;

	return (
		<>
			<Script id='google-tag-manager' strategy='afterInteractive'>
				{getGtmBootstrapInlineScript(gtmId)}
			</Script>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
					height={0}
					width={0}
					title='Google Tag Manager'
					style={{ display: 'none', visibility: 'hidden' }}
				/>
			</noscript>
		</>
	);
};

// Exports
// ------------
GoogleTagManager.displayName = 'GoogleTagManager';
export default GoogleTagManager;
export { default as GoogleTagManagerModalTracking } from './ModalTracking';
