'use client';

import { useEffect } from 'react';
import { useContentLink } from 'react-datocms/use-content-link';

interface ContentLinkProps {
	currentPath: string;
	visualEditingEnabled: boolean;
	onNavigateTo: (path: string) => void;
}

export default function ContentLink({
	currentPath,
	visualEditingEnabled,
	onNavigateTo,
}: ContentLinkProps) {
	const { disableClickToEdit, enableClickToEdit, setCurrentPath } = useContentLink({
		onNavigateTo,
	});

	useEffect(() => {
		setCurrentPath(currentPath);
	}, [currentPath, setCurrentPath]);

	useEffect(() => {
		if (visualEditingEnabled) {
			enableClickToEdit();
			return;
		}

		disableClickToEdit();
	}, [disableClickToEdit, enableClickToEdit, visualEditingEnabled]);

	return null;
}
