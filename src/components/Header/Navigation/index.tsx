'use client';

import { stripStega } from '@datocms/content-link';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import type * as I from './interface';
import * as S from './styles';

const Navigation = ({ menuItems }: I.NavigationProps) => {
	const { setIsModalOpen, isModalOpen, setModalActive } = use(GlobalContext);

	const handleClick = (id: string) => {
		setIsModalOpen(true);
		setModalActive(id);
	};

	return (
		<S.Jacket $isModalOpen={isModalOpen}>
			{menuItems.map(({ id, label }) => {
				const cleanLabel = stripStega(label);

				return (
					<button
						key={id}
						data-hover
						data-datocms-content-link-source={label}
						type='button'
						aria-label={`Open ${cleanLabel}`}
						onClick={() => handleClick(id)}
					>
						{cleanLabel}
					</button>
				);
			})}
		</S.Jacket>
	);
};

Navigation.displayName = 'Navigation';
export default Navigation;
