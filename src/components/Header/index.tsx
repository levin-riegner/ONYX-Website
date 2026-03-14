'use client';

import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Home from './Home';
import Contact from './Contact';
import Navigation from './Navigation';
import type * as I from './interface';
import * as S from './styles';

const Header = ({ menuItems }: I.HeaderProps) => {
	const { isLoaderFinished, isModalOpen, homeMenuItemsOverride } = use(GlobalContext);
	const resolvedMenuItems = homeMenuItemsOverride ?? menuItems;

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			<Home />
			<Navigation menuItems={resolvedMenuItems} />
			<Contact />
		</S.Jacket>
	);
};

Header.displayName = 'Header';
export default Header;
