'use client';

// Imports
// ------------
import Contexts from '@parts/Contexts';
// import CookieBar from '@parts/CookieBar';
import { GlobalStyle, theme } from '@theme';
import { neueHaas, pp } from '@theme/fonts';
import StyledComponentsRegistry from '@utils/registry';
import { ThemeProvider } from 'styled-components';

// Component
// ------------
const Client = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' className={`${neueHaas.variable} ${pp.variable}`} suppressHydrationWarning>
			<body>
				<StyledComponentsRegistry>
					<ThemeProvider theme={theme} key='themeprovider'>
						<GlobalStyle />

						{/* CookieBar only rendered in production environment */}
						{/* {process.env.NODE_ENV === 'production' && <CookieBar />} */}

						<Contexts>{children}</Contexts>
					</ThemeProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
};

// Exports
// ------------
Client.displayName = 'Client';
export default Client;
