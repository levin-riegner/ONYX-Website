'use client';

import ContentLink from '@parts/ContentLink';
import { use } from 'react';
import { useMemo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuerySubscription } from 'react-datocms/use-query-subscription';
import { GlobalContext } from '@parts/Contexts';
import HomePageContent from './HomePageContent';
import { buildHeaderMenuItems, type HomePageQueryResult } from './query';
import * as S from './HomepageDraftPreview.styles';

interface HomepageDraftPreviewProps {
	initialData: HomePageQueryResult;
	query: string;
	token: string;
	baseEditingUrl: string;
}

const VISUAL_EDITING_SESSION_KEY = 'homepage-visual-editing-enabled';
const DISABLE_DRAFT_MODE_URL = '/api/draft-mode/disable?redirect=/';

const HomepageDraftPreview = ({
	initialData,
	query,
	token,
	baseEditingUrl,
}: HomepageDraftPreviewProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { setHomeMenuItemsOverride } = use(GlobalContext);
	// Keep the overlay preference stable across refreshes without leaving draft mode enabled forever.
	const [visualEditingEnabled, setVisualEditingEnabled] = useState<boolean>(() => {
		if (typeof window === 'undefined') {
			return false;
		}

		return window.sessionStorage.getItem(VISUAL_EDITING_SESSION_KEY) === 'true';
	});

	const { data, error } = useQuerySubscription<HomePageQueryResult>({
		query,
		token,
		initialData,
		includeDrafts: true,
		excludeInvalid: true,
		contentLink: 'v1',
		baseEditingUrl,
	});

	const pageData = useMemo(() => data ?? initialData, [data, initialData]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.sessionStorage.setItem(VISUAL_EDITING_SESSION_KEY, String(visualEditingEnabled));
	}, [visualEditingEnabled]);

	useEffect(() => {
		setHomeMenuItemsOverride(buildHeaderMenuItems(pageData));
	}, [pageData, setHomeMenuItemsOverride]);

	useEffect(() => {
		return () => {
			setHomeMenuItemsOverride(null);
		};
	}, [setHomeMenuItemsOverride]);

	const handleExitDraftMode = () => {
		if (typeof window !== 'undefined') {
			window.sessionStorage.removeItem(VISUAL_EDITING_SESSION_KEY);
		}

		setVisualEditingEnabled(false);
		window.location.assign(DISABLE_DRAFT_MODE_URL);
	};

	return (
		<>
			<ContentLink
				currentPath={pathname}
				visualEditingEnabled={visualEditingEnabled}
				onNavigateTo={path => {
					router.push(path);
				}}
			/>

			<S.Toolbar aria-label='Draft mode toolbar'>
				<S.Actions>
					<S.ToggleButton
						type='button'
						aria-pressed={visualEditingEnabled}
						onClick={() => {
							setVisualEditingEnabled(currentValue => !currentValue);
						}}
					>
						{visualEditingEnabled ? 'Disable visual editing' : 'Enable visual editing'}
					</S.ToggleButton>

					<S.ExitLink type='button' onClick={handleExitDraftMode}>
						Exit draft
					</S.ExitLink>
				</S.Actions>

				{error ? <S.ErrorText>{error.message}</S.ErrorText> : null}
			</S.Toolbar>

			<HomePageContent data={pageData} />
		</>
	);
};

HomepageDraftPreview.displayName = 'HomepageDraftPreview';
export default HomepageDraftPreview;
