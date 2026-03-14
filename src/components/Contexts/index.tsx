'use client';

import type { LenisRef } from 'lenis/react';
import { createContext, useMemo, useRef, useState } from 'react';
import { PerformanceProvider } from './Performance';
import type { NavItem as HeaderNavItem } from '@parts/Header/Navigation/interface';
import type * as I from './interface';

export const GlobalContext = createContext({
	lenisRef: { current: null } as React.RefObject<LenisRef | null>,

	isModalOpen: false,
	setIsModalOpen: (_value: boolean) => {},

	isLoaderFinished: false,
	setIsLoaderFinished: (_value: boolean) => {},

	pageLoaded: false,
	setPageLoaded: (_value: boolean) => {},

	modalActive: '',
	setModalActive: (_value: string) => {},

	homeMenuItemsOverride: null as HeaderNavItem[] | null,
	setHomeMenuItemsOverride: (_value: HeaderNavItem[] | null) => {},
});

const Contexts = ({ children }: I.ContextsProps) => {
	const lenisRef = useRef<LenisRef | null>(null);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoaderFinished, setIsLoaderFinished] = useState<boolean>(false);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);
	const [modalActive, setModalActive] = useState<string>('home');
	const [homeMenuItemsOverride, setHomeMenuItemsOverride] = useState<HeaderNavItem[] | null>(
		null
	);

	const contextValue = useMemo(
		() => ({
			lenisRef,
			isModalOpen,
			setIsModalOpen,
			isLoaderFinished,
			setIsLoaderFinished,
			pageLoaded,
			setPageLoaded,
			modalActive,
			setModalActive,
			homeMenuItemsOverride,
			setHomeMenuItemsOverride,
		}),
		[isModalOpen, isLoaderFinished, pageLoaded, modalActive, homeMenuItemsOverride]
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};

export default Contexts;
