'use client';

// Imports
// ------------
import { createContext, useMemo, useState } from 'react';
import { PerformanceProvider } from './Performance';
import { useScrollPerformance } from '@utils/useScrollPerformance';

// Interface
// ------------
import type * as I from './interface';

// Context Definition
// ------------
export const GlobalContext = createContext({
	isModalOpen: false,
	setIsModalOpen: (_value: boolean) => {},

	isLoaderFinished: false,
	setIsLoaderFinished: (_value: boolean) => {},

	pageLoaded: false,
	setPageLoaded: (_value: boolean) => {},

	modalActive: '',
	setModalActive: (_value: string) => {},

	areModalsReady: {
		home: false,
		activation: false,
		dataSupply: false,
		about: false,
		contact: false,
	},
	setAreModalsReady: ((
		_value: React.SetStateAction<{
			home: boolean;
			activation: boolean;
			dataSupply: boolean;
			about: boolean;
			contact: boolean;
			legal: boolean;
		}>
	) => {}) as React.Dispatch<
		React.SetStateAction<{
			home: boolean;
			activation: boolean;
			dataSupply: boolean;
			about: boolean;
			contact: boolean;
			legal: boolean;
		}>
	>,
	isFontsLoaded: false,
	setIsFontsLoaded: (_value: boolean) => {},
});

// Component
// ------------
const Contexts = ({ children }: I.ContextsProps) => {
	// Disable hover during scroll to reduce repaints (CSS in global.css)
	useScrollPerformance();

	// States
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoaderFinished, setIsLoaderFinished] = useState<boolean>(false);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);
	const [modalActive, setModalActive] = useState<string>('home');
	const [isFontsLoaded, setIsFontsLoaded] = useState<boolean>(false);
	const [areModalsReady, setAreModalsReady] = useState<{
		home: boolean;
		activation: boolean;
		dataSupply: boolean;
		about: boolean;
		contact: boolean;
		legal: boolean;
	}>({
		home: false,
		activation: false,
		dataSupply: false,
		about: true,
		contact: true,
		legal: true,
	});

	// Context Values
	const contextValue = useMemo(
		() => ({
			isModalOpen,
			setIsModalOpen,
			isLoaderFinished,
			setIsLoaderFinished,
			pageLoaded,
			setPageLoaded,
			modalActive,
			setModalActive,
			areModalsReady,
			setAreModalsReady,
			isFontsLoaded,
			setIsFontsLoaded,
		}),
		[isModalOpen, isLoaderFinished, pageLoaded, modalActive, areModalsReady, isFontsLoaded]
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};

// Exports
// ------------
export default Contexts;
