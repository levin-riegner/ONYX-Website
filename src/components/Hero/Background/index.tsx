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
					production={true}
					dpi={1}
					fps={60}
					sdkUrl='https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js'
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
