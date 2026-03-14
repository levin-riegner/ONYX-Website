'use client';

import { stripStega } from '@datocms/content-link';
import { use, useMemo } from 'react';
import { GlobalContext } from '@parts/Contexts';
import Modal from '@parts/Modal';
import type * as I from './interface';
import * as S from './styles';

const Activation = ({ title }: I.ActivationProps) => {
	const { modalActive } = use(GlobalContext);
	const cleanTitle = useMemo(() => stripStega(title), [title]);

	return (
		<Modal isOpen={modalActive === 'activation'}>
			<S.Jacket>
				<h2 data-datocms-content-link-source={title}>{cleanTitle}</h2>

				<div className='example'></div>
			</S.Jacket>
		</Modal>
	);
};

Activation.displayName = 'Activation';
export default Activation;
