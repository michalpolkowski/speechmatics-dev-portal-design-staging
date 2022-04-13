import Link from 'next/link';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import Dashboard from '../components/dashboard';
import DashboardTabs from '../components/tabs/dashboard-tabs'
import { Box, Grid, GridItem, Text, Tabs, TabList, TabPanels, TabPanel, Tab, tokenToCSSVar } from '@chakra-ui/react';
import { callGetUsage } from '../utils/call-api';
import accountContext, { accountStore } from '../utils/account-store-context';
import { observer } from 'mobx-react-lite';
import Image from 'next/image'

export default observer(function Usage() {
  const [usageJson, setUsageJson] = useState<any>({});
  const { accountStore, tokenStore } = useContext(accountContext);
  const idToken = tokenStore.tokenPayload?.idToken;

  useEffect(() => {
    let isActive = true;
    console.log(`Usage useEff`, !!idToken, !!accountStore.account);
    if (idToken && accountStore.account) {
      callGetUsage(idToken, accountStore.getContractId(), accountStore.getProjectId())
        .then((respJson) => {
          if (isActive && !!respJson && 'aggregate' in respJson) {
            setUsageJson({ ...respJson });
          }
        })
        .catch(console.error);
    }
    return () => {
      isActive = false;
    };
  }, [idToken, accountStore.account]);

  const { aggregate, breakdown } = usageJson;

  const currentUsage = prepCurrentUsage(aggregate);

  return (
    <Dashboard>
      <h1>Usage</h1>
      <p className='subtitle'>Usage for the period: {currentUsage?.billingRange}</p>
      <div className='divide_line divide_line__top'></div>

      <div className="">
        <DashboardTabs>
          <TabList>
            <Tab>Limits</Tab>
            <Tab>Summary</Tab>
            <Tab>Details</Tab>
          </TabList>
          <TabPanels>
            {/* Limits */}
            <TabPanel>
              <div className='content_wrapper mb-10'>
                <h2>Usage Limits</h2>
                <p className='mini_title'>Hours of audio per month</p>

                <div className='model_holder'>

                  <div className='model_compare model_standard'>
                    <div className='model_info padding'>
                      <div className='model_info_gap'>
                        <img src="/assets/model-balloon.svg" />
                        <div className='model_title'>
                          <p>Standard Model</p>
                          <h3>2 hours / month</h3>
                        </div>
                      </div>
                    </div>
                    <div className='model_description padding'>
                      <p>Speechmatics Standard Model provides high accuracy with reduced turnaround times.</p>
                    </div>
                  </div>

                  <div className='model_compare model_enhanced'>
                    <div className='model_info padding'>
                      <div className='model_info_gap'>
                        <img src="/assets/model-rocket.svg" />
                        <div className='model_title'>
                          <p>Enhanced Model</p>
                          <h3>2 hours / month</h3>
                        </div>
                      </div>
                    </div>
                    <div className='model_description padding'>
                      <p>Speechmatics Enhanced Model provides our very highest level of accuracy.</p>
                    </div>
                  </div>

                </div>

                <div className='cta_callout'>
                  <div className='icon'>
                    <img src="/assets/icon-limits.svg" />
                  </div>
                  <div className='cta_text'>
                    <h4>Increase usage limits</h4>
                    <p>Add Payment Card in order to increase these limits</p>
                  </div>
                  <a href='#' className='button button__extended button__white shrink-0'>Add a card</a>
                </div>

                <div className='center_cta mt-8'>
                  <img className='w-9 h-9 block' src="/assets/icon-pricing.svg" />
                  <h2>View our pricing</h2>
                  <a className='button button__primary-outline extended'>Update Card</a>
                </div>

              </div >

            </TabPanel>
            {/* Summary */}
            <TabPanel>
              <div className='content_wrapper'>
                <h2>Usage metrics</h2>
                <p className='mini_title'>01 February 2022 to 08 February 2022</p>
                <div className='table_data data_usage_summary'>
                  <div className='header_row'>
                    <div className='w-3/12'>Model</div>
                    <div className='w-3/12'>Limit (hours / month)</div>
                    <div className='w-3/12'>Hours used</div>
                    <div className='w-3/12'>Requests made</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-3/12'>Standard Model</div>
                    <div className='w-3/12'>3.2 hours</div>
                    <div className='w-3/12'>3.3 hours</div>
                    <div className='w-3/12'>44</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-3/12'>Standard Model</div>
                    <div className='w-3/12'>3.2 hours</div>
                    <div className='w-3/12'>3.3 hours</div>
                    <div className='w-3/12'>44</div>
                  </div>
                </div>

                <Grid className='gap-8' templateColumns="repeat(4, 1fr)">
                  <GridItem>Model</GridItem>
                  <GridItem>Limit (hours / month)</GridItem>
                  <GridItem>Hours used</GridItem>
                  <GridItem>Requests made</GridItem>

                  <GridItem>Standard Model</GridItem>
                  <GridItem>{accountStore.getContractLimitHrs()} hours</GridItem>
                  <GridItem data-qa="usage-standard">
                    {Number(currentUsage?.usageStandard).toFixed(1)} hours
                  </GridItem>
                  <GridItem data-qa="requests-standard">{currentUsage?.countStandard}</GridItem>

                  <GridItem>Enhanced Model</GridItem>
                  <GridItem>{accountStore.getContractLimitHrs()} hours</GridItem>
                  <GridItem data-qa="usage-enhanced">
                    {Number(currentUsage?.usageEnhanced).toFixed(1)} hours
                  </GridItem>
                  <GridItem data-qa="requests-enhanced">{currentUsage?.countEnhanced}</GridItem>
                </Grid>
              </div>
            </TabPanel>
            {/* Details */}
            <TabPanel>
              <div className='content_wrapper'>
                <h2>Usage metrics</h2>
                <p className='mini_title'>01 February 2022 to 08 February 2022</p>
                <div className='table_data data_usage_details '>
                  <div className='header_row'>
                    <div className='w-4/12'>Date</div>
                    <div className='w-4/12'>Hours used</div>
                    <div className='w-4/12'>Requests made</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-4/12'>Standard Model</div>
                    <div className='w-4/12'>3.2 hours</div>
                    <div className='w-4/12'>44</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-4/12'>Standard Model</div>
                    <div className='w-4/12'>3.2 hours</div>
                    <div className='w-4/12'>44</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-4/12'>Standard Model</div>
                    <div className='w-4/12'>3.2 hours</div>
                    <div className='w-4/12'>44</div>
                  </div>
                  <div className='data_row'>
                    <div className='w-4/12'>Standard Model</div>
                    <div className='w-4/12'>3.2 hours</div>
                    <div className='w-4/12'>44</div>
                  </div>
                </div>


                <div className='pagination-holder'>
                  <p>Showing <span className='font-bold'>2 of 2</span> periods</p>
                  <div className='pagination-holder__pagination'>
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li className='pagination__selected'>3</li>
                      <li>4</li>
                      <li>5</li>
                    </ul>
                  </div>
                </div>

                <div className='toast_notification toast_notification__standard mt-8'>
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

                <Grid templateColumns="repeat(2, 1fr)" gap={5} marginTop="2em">
                  <GridItem>Day</GridItem>
                  <GridItem>Hours used</GridItem>

                  {breakdown?.map((el: UsageUnit) => {
                    // const usg = prepCurrentUsage(el);
                    return (
                      <React.Fragment key={el.since}>
                        <GridItem>{el.since}</GridItem>
                        <GridItem>{el.total_hrs}</GridItem>
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </div>
            </TabPanel>
          </TabPanels>
        </DashboardTabs>
      </div>
    </Dashboard>
  );
});

const prepCurrentUsage = (aggregate: UsageUnit) => {
  return {
    billingRange: `${aggregate?.since} - ${aggregate?.until}`,
    usageStandard:
      aggregate?.summary.find((s) => s.type == 'transcription' && s.operating_point == 'standard')
        ?.duration_hrs || 0,
    usageEnhanced:
      aggregate?.summary.find((s) => s.type == 'transcription' && s.operating_point == 'enhanced')
        ?.duration_hrs || 0,
    countStandard:
      aggregate?.summary.find((s) => s.type == 'transcription' && s.operating_point == 'standard')
        ?.count || 0,
    countEnhanced:
      aggregate?.summary.find((s) => s.type == 'transcription' && s.operating_point == 'enhanced')
        ?.count || 0,
  };
};

type UsageRespJson = { aggregate: UsageUnit; breakdown: UsageUnit[] };

type SummaryItem = {
  mode: 'batch' | 'real-time';
  type: 'transcription' | 'alignment';
  operating_point?: 'standard' | 'enhanced';
  count: number;
  duration_hrs: number;
};

type UsageUnit = {
  since: string;
  until: string;
  total_hrs: number;
  summary: SummaryItem[];
};
