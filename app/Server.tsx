import Header from '@parts/Header';
import { getHomepageData } from './(home)/data';
import { buildHeaderMenuItems } from './(home)/query';

const FALLBACK_MENU_ITEMS = [
	{ id: 'activation', label: 'Activation' },
	{ id: 'dataSupply', label: 'Data Supply' },
	{ id: 'about', label: 'About' },
] as const;

const Server = async ({ children }: { children: React.ReactNode }) => {
	try {
		const data = await getHomepageData();
		const menuItems = buildHeaderMenuItems(data);

		return (
			<>
				<Header menuItems={menuItems} />
				{children}
			</>
		);
	} catch (error) {
		console.error('Failed to fetch header data from DatoCMS:', error);

		return (
			<>
				<Header menuItems={[...FALLBACK_MENU_ITEMS]} />
				{children}
			</>
		);
	}
};

Server.displayName = 'Server';
export default Server;
