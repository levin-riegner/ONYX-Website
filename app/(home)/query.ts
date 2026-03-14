export const EVERYTHING = `
    query {
        home {
            title
            desc
            unicornId
            partnerLogos {
                id
                url
                alt
            }
        }

        activation {
            title
        }
        dataSupply {
            title
        }
        about {
            title
        }

        seo {
            meta: metadata {
                image {
                    url
                }
                desc: description
                title
                twitterCard
            }
        }
    }
`;

export type HomeSectionId = 'activation' | 'dataSupply' | 'about';

export interface HomePageQueryResult {
	home: {
		title: string;
		desc: string;
		unicornId: string;
		partnerLogos: {
			id: string;
			url: string;
			alt: string | null;
		}[];
	};
	activation: {
		title: string;
	};
	dataSupply: {
		title: string;
	};
	about: {
		title: string;
	};
	seo: {
		meta: {
			image: {
				url: string;
			} | null;
			desc: string;
			title: string;
			twitterCard: string | null;
		} | null;
	};
}

export interface HeaderMenuItem {
	id: HomeSectionId;
	label: string;
}

export interface HeroMenuItem extends HeaderMenuItem {
	icon: HomeSectionId;
}

export function buildHeaderMenuItems(
	data: Pick<HomePageQueryResult, 'activation' | 'dataSupply' | 'about'>
): HeaderMenuItem[] {
	return [
		{ id: 'activation', label: data.activation.title },
		{ id: 'dataSupply', label: data.dataSupply.title },
		{ id: 'about', label: data.about.title },
	];
}

export function buildHeroMenuItems(
	data: Pick<HomePageQueryResult, 'activation' | 'dataSupply' | 'about'>
): HeroMenuItem[] {
	return [
		{ id: 'activation', label: data.activation.title, icon: 'activation' },
		{ id: 'dataSupply', label: data.dataSupply.title, icon: 'dataSupply' },
		{ id: 'about', label: data.about.title, icon: 'about' },
	];
}
