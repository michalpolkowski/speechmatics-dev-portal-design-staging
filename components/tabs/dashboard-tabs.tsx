import { 
  Tabs, 
  Box, 
  Grid, 
  GridItem, 
  Text, 
  TabList, 
  TabPanels, 
  TabPanel, 
  Tab, 
  tokenToCSSVar 
} from '@chakra-ui/react';

const DashboardTabs = ({ children }) => {
    return (
        <Tabs 
          colorScheme="navy" 
          variant="enclosed-colored"
          >
          {children}
        </Tabs>
    )
}

export default DashboardTabs;