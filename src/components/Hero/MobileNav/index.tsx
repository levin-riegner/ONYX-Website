'use client';

import { stripStega } from '@datocms/content-link';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Icon from '@parts/Icon';
import type * as I from './interface';
import * as S from './styles';

const MobileNav = ({ menuItems }: I.MobileNavProps) => {
	const { setIsModalOpen, setModalActive } = use(GlobalContext);

	const handleClick = (id: string) => {
		setIsModalOpen(true);
		setModalActive(id);
	};

	return (
		<S.Jacket>
			{menuItems.map(({ id, label, icon }) => {
				const cleanLabel = stripStega(label);

				return (
					<li key={id}>
						<button
							data-datocms-content-link-source={label}
							onClick={() => handleClick(id)}
							type='button'
							aria-label={`Open ${cleanLabel}`}
						>
							<Icon type={icon} />
							<span>{cleanLabel}</span>
						</button>
					</li>
				);
			})}
		</S.Jacket>
	);
};

MobileNav.displayName = 'MobileNav';
export default MobileNav;
