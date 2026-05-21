'use client';

// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';
import CallToAction from '@parts/CallToAction';
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const About = ({
	title,
	heading,
	desc,
	pageBuilder,
	isCtaOverridden,
	ctaOverrideHeading,
	ctaOverrideButtonLabel,
	ctaHeading,
	ctaButtonLabel,
	email,
	linkedin,
	twitter,
	contactTitle,
	legalTitle,
}: I.AboutProps) => {
	// Contexts
	const { modalActive, setAreModalsReady } = use(GlobalContext);

	// Keep About animations in their "open" state until close transition completes.
	// `modalActive` is reset to `home` after modal close animation in `Modal`.
	const isReady = modalActive === title;

	// Set Modal ready on mount
	useEffect(() => {
		setAreModalsReady(prev => ({ ...prev, about: true }));
	}, [setAreModalsReady]);

	return (
		<Modal title={title}>
			<Hero title={title} heading={heading} desc={desc} isReady={isReady} />

			{pageBuilder && (
				<PageBuilder
					pageBuilder={pageBuilder}
					contactTitle={contactTitle}
					isReady={isReady}
				/>
			)}

			<CallToAction
				heading={ctaHeading}
				buttonLabel={ctaButtonLabel}
				isCtaOverridden={isCtaOverridden}
				overrideHeading={ctaOverrideHeading}
				overrideButtonLabel={ctaOverrideButtonLabel}
				email={email}
				linkedin={linkedin}
				twitter={twitter}
				contactTitle={contactTitle}
				legalTitle={legalTitle}
			/>
		</Modal>
	);
};

// Exports
// ------------
About.displayName = 'About';
export default About;
