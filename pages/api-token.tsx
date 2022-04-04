import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Tooltip,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState, useMemo, useRef, useContext } from 'react';

import Dashboard from '../components/dashboard';
import DashboardTabs from '../components/tabs/dashboard-tabs'
import CodeSnippet from '../components/code-snippet'

import { IoTrashBinOutline, IoCopyOutline } from 'react-icons/io5';
import accountContext, { ApiKey } from '../utils/account-store-context';
import { callPostApiKey, callRemoveApiKey } from '../utils/call-api';
import Image from 'next/image';
import tokenStyles from '../styles/api-token.module.scss'

export default function GetAccessToken({ }) {
  const { accountStore } = useContext(accountContext);
  return (
    <Dashboard>
      <h1>API Token</h1>
      <div className="token_form">
        <div className="">
          <p className='subtitle'>
            You need an API Key (also known as an Authorization Token) to make calls to our REST API {accountStore.getRuntimeURL()}.
            See our{' '}
            <a
              target="_blank"
              href="https://docs.speechmatics.com"
              style={{ textDecoration: 'underline' }}
            >
              documentation
            </a>{' '}
            to find out how to make API calls.
          </p>
        </div>
        <div className='divide_line divide_line__top'></div>

        <GenerateTokenCompo />

        <PreviousTokens />
      </div>
    </Dashboard>
  );
}

const GenerateTokenCompo = observer(() => {
  const [genTokenStage, setGenTokenStage] = useState<
    'init' | 'inputName' | 'waiting' | 'generated' | 'error'
  >('init');

  const [chosenTokenName, setChosenTokenName] = useState('');
  const [generatedApikey, setGeneratedToken] = useState('');
  const [noNameError, setNoNameError] = useState(false);

  const { accountStore, tokenStore } = useContext(accountContext);
  const apiKeys = accountStore.getApiKeys();
  const idToken = tokenStore.tokenPayload?.idToken;

  const nameInputRef = useRef<HTMLInputElement>(null);
  const generatedApikeyinputRef = useRef<HTMLInputElement>(null);

  const requestToken = useCallback(() => {
    if (nameInputRef?.current?.value == '') {
      setNoNameError(true);
    } else {
      setNoNameError(false);

      setGenTokenStage('waiting');
      callPostApiKey(idToken, chosenTokenName, accountStore.getProjectId(), '')
        .then((resp) => {
          console.log('callPostApiKey resp', resp);
          setGeneratedToken(resp.key_value);
          setGenTokenStage('generated');
          accountStore.fetchServerState(idToken);
        })
        .catch((error) => {
          setGenTokenStage('error');
        });
    }
  }, [nameInputRef?.current?.value, idToken, chosenTokenName]);

  const generatedApikeyonClick = useCallback(() => {
    generatedApikeyinputRef.current.select();
  }, []);

  return (
    <section>
      <div className='content_wrapper mb-10'>

        <div className='toast_notification toast_notification__standard'>
          <div className='w-6 h-6 items-center justify-center shrink-0'>
            <Image
              src="/assets/icon-general.svg"
              alt="Intro Icon"
              width={24}
              height={24}
            />
          </div>
          <span>All usage is reported on a (UTC) calendar day basis and excludes the current day</span>
        </div>

        <div className='toast_notification toast_notification__success'>
          <div className='w-6 h-6 items-center justify-center shrink-0'>
            <Image
              src="/assets/icon-success.svg"
              alt="Intro Icon"
              width={24}
              height={24}
            />
          </div>
          <span>All usage is reported on a (UTC) calendar day basis and excludes the current day</span>
        </div>

        <div className='toast_notification toast_notification__medium'>
          <div className='w-6 h-6 items-center justify-center shrink-0'>
            <Image
              src="/assets/icon-medium-alert.svg"
              alt="Intro Icon"
              width={24}
              height={24}
            />
          </div>
          <span>All usage is reported on a (UTC) calendar day basis and excludes the current day</span>
        </div>

        <div className='toast_notification toast_notification__warning'>
          <div className='w-6 h-6 items-center justify-center shrink-0'>
            <Image
              src="/assets/icon-warning.svg"
              alt="Intro Icon"
              width={24}
              height={24}
            />
          </div>
          <span>All usage is reported on a (UTC) calendar day basis and excludes the current day</span>
        </div>

        {genTokenStage == 'init' && (
          <HStack>
            {apiKeys?.length >= 5 && (
              <Text>You already have 5 tokens, remove one before requesting new.</Text>
            )}
            <Button
              className="default_button"
              disabled={apiKeys?.length >= 5}
              onClick={() => setGenTokenStage('inputName')}
            >
              Generate new token
            </Button>
          </HStack>
        )}
        {genTokenStage == 'inputName' && (
          <HStack>
            <input
              type="text"
              placeholder="your token's name here"
              onChange={(ev) => setChosenTokenName(ev.target.value)}
              style={{ border: noNameError ? '1px solid red' : '' }}
              ref={nameInputRef}
            ></input>
            <Button className="default_button" onClick={() => requestToken()}>
              Ok
            </Button>
          </HStack>
        )}
        {genTokenStage == 'waiting' && (
          <HStack>
            <Box>
              Sending request for Your "{chosenTokenName}" token. Please do hold on for a second or
              two...
            </Box>
            <Spinner size="md" />
          </HStack>
        )}
        {genTokenStage == 'generated' && (
          <VStack alignItems="flex-start">
            <Box>All good! Your new token is:</Box>
            <Box fontSize={22} padding="20px 0px">
              <input
                id="apikeyValue"
                type="text"
                value={generatedApikey}
                readOnly
                onClick={generatedApikeyonClick}
                ref={generatedApikeyinputRef}
              />
              <Tooltip label="copy" placement="right">
                <IconButton
                  className="default_button"
                  aria-label="copy"
                  marginLeft={10}
                  icon={<IoCopyOutline />}
                  color="#bbb"
                  backgroundColor="#fff"
                  padding={5}
                  onClick={() => {
                    navigator?.clipboard?.writeText(generatedApikey);
                  }}
                  _hover={{ color: '#fff', backgroundColor: 'var(--main-navy)' }}
                />
              </Tooltip>
            </Box>
            <Box>
              Please copy it.{' '}
              <Text as="span" color="#D72F3F">
                You will see this token only once.
              </Text>
            </Box>
            <HStack>
              <Button className="default_button" onClick={() => setGenTokenStage('init')}>
                Great!
              </Button>
            </HStack>
          </VStack>
        )}
        {genTokenStage == 'error' && (
          <>
            <Box pb={3}>
              <Text as="span" color="#D72F3F">
                Sorry, something has gone wrong. We're on it! Please try again in a moment.
              </Text>
            </Box>
            <Button className="default_button" onClick={() => setGenTokenStage('init')}>
              Start over!
            </Button>
          </>
        )}

        {/* OS Instructions */}
        <div className={tokenStyles.curl_commands}>
          <DashboardTabs>
            <TabList>
              <Tab>Windows</Tab>
              <Tab>Linux</Tab>
              <Tab>Mac</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CodeSnippet>
                  Windows curl -L -X POST https://asr.api.speechmatics.com/v2/jobs/ -H  “Authorization:
                </CodeSnippet>
              </TabPanel>
              <TabPanel>
                <CodeSnippet>
                  Linux curl -L -X POST https://asr.api.speechmatics.com/v2/jobs/ -H  “Authorization:
                </CodeSnippet>
              </TabPanel>
              <TabPanel>
                <CodeSnippet>
                  Mac curl -L -X POST https://asr.api.speechmatics.com/v2/jobs/ -H  “Authorization:
                </CodeSnippet>
              </TabPanel>
            </TabPanels>
          </DashboardTabs>
        </div>
      </div>
    </section>
  );
});

const PreviousTokens = observer(() => {
  const [[apikeyIdToRemove, apikeyName], setApiKeyToRemove] = useState<[string, string]>(['', '']);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { accountStore, tokenStore } = useContext(accountContext);
  const apiKeys = accountStore.getApiKeys();
  const idToken = tokenStore.tokenPayload?.idToken;

  const aboutToRemoveOne = (el: ApiKey) => {
    console.log('aboutToRemoveOne', el, el.apikey_id);
    setApiKeyToRemove([el.apikey_id, el.name]);
    onOpen();
  };

  const onRemoveConfirm = () => {
    console.log('aboutToRemoveOne', apikeyIdToRemove);
    callRemoveApiKey(idToken, apikeyIdToRemove).then((res) =>
      accountStore.fetchServerState(idToken)
    );
    onClose();
  };

  return (
    <section>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image
              src="/assets/icon-warning.svg"
              alt="Intro Icon"
              width={128}
              height={128}
            />
          <ModalBody>Remove the token "{apikeyName}"?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onRemoveConfirm}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className='content_wrapper'>
        <h2>Current API Tokens</h2>
        {apiKeys &&
          <p className='mb-8'>You have currently used <span className="font-bold">{apiKeys?.length} / 5</span> of your available API Tokens</p>
        }

        <div className='table_data mt-2'>
          <div className='header_row'>
            <div className="w-1/3">ID</div>
            <div className='w-1/3'>Token Name</div>
            <div className='flex-1'>Created</div>
            <div className='shrink-0'>Delete</div>
          </div>
          {apiKeys?.length > 0 && apiKeys?.map((el: ApiKey, index) => (
          <div className='data_row'>
            <div className='w-1/3'>
              <Text>{el.name}</Text>
            </div>
            <div className="w-1/3">
              <Text>{el.apikey_id.slice(0, 15)}</Text>
            </div>
            <div className='flex-1'>
              <Text>{new Date(el.created_at).toUTCString()}</Text>
            </div>
            <div className='shrink-0 flex items-center'>
              <Image
                src="/assets/icon-delete.svg"
                alt="Speechmatics"
                width={20}
                height={20}
                onClick={() => aboutToRemoveOne(el)}
              />
            </div>
          </div>
          ))}

          {(typeof apiKeys === 'undefined' || !apiKeys || apiKeys?.length === 0) &&
            <div className="p-4 w-full text-center flex items-center justify-center">
              <Spinner className="mr-4" /> <Text>Loading API Keys...</Text>
            </div>
          }
        </div>
      </div>

    </section>
  );
});
