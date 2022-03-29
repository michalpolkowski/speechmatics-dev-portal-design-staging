import { useRouter } from 'next/router';
import Link from 'next/link';
import menuData from '../static_data/menu-data';
import { useContext, useEffect, useState } from 'react';
import { ExternalLink, AccountIcon, LogoutIcon } from './Icons';
import { Tooltip, Link as ChakraLink, Button, Box, useDisclosure, Spinner } from '@chakra-ui/react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import TestApiBlock from './call-test';
import { useB2CToken } from '../utils/get-b2c-token-hook';
import accountContext from '../utils/account-store-context';
import { accountsFlow } from '../utils/call-api';
import { observer } from 'mobx-react-lite';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import dashStyles from '../styles/components/dashboard.module.scss';
import sidenavStyles from '../styles/components/sidenav.module.scss';

export default observer(function Dashboard({ children }) {
  const router = useRouter();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure({ isOpen: false });

  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    let st: number;
    console.log('dashboard eff redirect', { inProgress, isAuthenticated });
    if (!isAuthenticated) {
      st = window.setTimeout(() => router.push('/login/'), 2000);
    }
    return () => window.clearTimeout(st);
  }, [isAuthenticated]);

  const { accountStore, tokenStore } = useContext(accountContext);

  const { token: tokenPayload, error: b2cError } = useB2CToken(instance);

  useEffect(() => {
    let st: number;
    console.log('dashboard eff redirect 2', { b2cError });
    if (!!b2cError) {
      st = window.setTimeout(() => router.push('/login/'), 2000);
    }
    return () => window.clearTimeout(st);
  }, [b2cError]);

  const isSettingUpAccount = (val: boolean) => {
    if (val) onModalOpen();
    //else onModalClose();
  };

  useEffect(() => {
    console.log('Dashboard effect accountFlow', accountStore.account, isAuthenticated);
    if (!accountStore.account && isAuthenticated && tokenPayload?.idToken) {
      tokenStore.setTokenPayload(tokenPayload);
      accountsFlow(tokenPayload.idToken, isSettingUpAccount)
        .then((resp) => {
          accountStore.assignServerState(resp);
          onModalClose();
        })
        .catch(console.error);
    }
  }, [isAuthenticated, tokenPayload?.idToken]);

  const [showTestTools, setShowTestTools] = useState(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    setShowTestTools(event.ctrlKey);
  };

  const account = instance.getActiveAccount();

  const logout = () => {
    accountStore.clear();
    instance.logoutRedirect({ account: account });
  };

  if (!isAuthenticated) {
    return <NotLoggedin />;
  }

  return (
    <div className={dashStyles.dashboard_container} onKeyDown={onKeyDown} tabIndex={0}>
      <Modal isOpen={isModalOpen} onClose={onModalClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Just one or two seconds more...</ModalHeader>
          <ModalBody textAlign={'center'}>
            Setting up the account for You! <Spinner ml={2} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <div className={sidenavStyles.dashboard_sidenav}>
        <div className={`${sidenavStyles.nav_menu}`}>
          {menuData.map((item) => (
            <MenuElem item={item} key={item.path} selected={router.asPath == item.path} />
          ))}
        </div>

        {showTestTools && <TestApiBlock tokenPayload={tokenPayload} />}
      </div>
      <div className={`${dashStyles.dashboard_content}`}>
        <div className={dashStyles.dashboard_content_wrapper}>
          {children}
        </div>
      </div>
    </div >
  );
});

function MenuElem({ item, selected }) {
  return (
    <Link href={item.path}>
      <div className={`${sidenavStyles.menu_elem} ${selected ? sidenavStyles.selected : ''}`}>
        <div>{item.icon({})}</div>
        <div>{item.title}</div>
      </div>
    </Link>
  );
}

function NotLoggedin() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        paddingTop: '100px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      not logged in, redirecting...
    </div>
  );
}
