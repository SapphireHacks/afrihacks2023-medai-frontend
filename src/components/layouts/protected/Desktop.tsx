import { Children } from '@/types/index';
import { Grid, GridItem, } from '@chakra-ui/react';
import Navigation from './Navigation';

const DesktopLayout = ({ children }: Children) => {
  return (
    <Grid templateColumns={'repeat(12, 1fr)'} gap={'1rem'} mx="auto">
      <GridItem colSpan={3} bg="primary.50">
        <Navigation />
      </GridItem>
      <GridItem colSpan={9}>{children}</GridItem>
    </Grid>
  );
};

export default DesktopLayout;
