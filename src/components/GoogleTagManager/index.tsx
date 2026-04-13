// Imports
// ------------
import Script from 'next/script';

// Config
// ------------
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-MC37B7RV';

// Component
// ------------
const GoogleTagManager = () => {
	if (!GTM_ID) return null;

	return (
		<>
			<Script id='google-tag-manager' strategy='afterInteractive'>
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
			</Script>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
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
