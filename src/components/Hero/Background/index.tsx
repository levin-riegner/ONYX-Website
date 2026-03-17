'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import UnicornScene from 'unicornstudio-react/next';
import Video from './Video';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Background = ({ sceneId }: I.BackgroundProps) => {
	const { isLoaderFinished, isModalOpen } = use(GlobalContext);

	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished} $isModalOpen={isModalOpen}>
			{isLoaderFinished && (
				<UnicornScene
					className='unicorn'
					projectId={sceneId}
					width='100%'
					height='100%'
					lazyLoad={true}
					production={true}
					dpi={1}
					fps={60}
				/>
			)}

			<Video videoSrc='/stone.mp4' />
		</S.Jacket>
	);
};

// Exports
// ------------
Background.displayName = 'Background';
export default Background;
