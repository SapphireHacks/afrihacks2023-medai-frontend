import { Children } from '@/types/index';
import { Grid, GridItem } from '@chakra-ui/react';
import Navigation from './Navigation';

const DesktopLayout = ({ children }: Children) => {
  return (
    <Grid
      templateColumns={'repeat(12, 1fr)'}
      gap={'1rem'}
      mx="auto"
      h="100vh"
      maxH="100vh"
      overflow="hidden"
    >
      <GridItem colSpan={3} bg="primary.50" maxH="100vh">
        <Navigation />
      </GridItem>
      <GridItem colSpan={9} position="relative" maxH="100vh">
        {children}
      </GridItem>
    </Grid>
  );
};

export default DesktopLayout;
