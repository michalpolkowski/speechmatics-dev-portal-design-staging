import '../styles/global.scss';
import { useRouter } from 'next/router';
import { MsalProvider } from '@azure/msal-react';
import { CustomNavigationClient } from '../utils/navigation-client';
import { ChakraProvider } from '@chakra-ui/react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from '../utils/auth-config';
import theme from '../static_data/theme';
import AccountContext, { accountStore, tokenStore } from '../utils/account-store-context';
import Head from 'next/head';
import Image from 'next/image';
import HeaderStyles from '../styles/components/header.module.scss';
import dynamic from 'next/dynamic';



export const msalInstance = new PublicClientApplication(msalConfig);

// console.log('msalInstance', msalConfig);



// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);

  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && (event.payload as any).account) {
      const account = (event.payload as any).account;
      msalInstance.setActiveAccount(account);
    }
  });

  const HeaderProf = dynamic(() => import('../components/profile/header-profile'), { ssr: false });

  return (
    <AccountContext.Provider value={{ accountStore, tokenStore }}>
      <ChakraProvider resetCSS={true} theme={theme}>
        <MsalProvider instance={msalInstance}>
          <div className="all_container">
            <div className={HeaderStyles.header}>
              <div className='speechmatics_logo'>
                <Image
                  src="/assets/speech-logo-symbol.svg"
                  alt="Speechmatics Symbol"
                  className='speechmatics_logo__symbol'
                  width={64}
                  height={16}
                />
                <div className='hidden md:flex items-center'>
                  <Image
                    src="/assets/speech-logo-wording.svg"
                    className='speechmatics_logo__wording'
                    alt="Speechmatics"
                    width={135}
                    height={20}
                  />
                </div>
              </div>
              <HeaderProf accounts={accounts} />
            </div>
            <div className="content">
              <Head>
                <title>Speechmatics Portal</title>
              </Head>
              <Component {...pageProps} />
            </div>

          </div>
        </MsalProvider>
      </ChakraProvider>
    </AccountContext.Provider>
  );
}
