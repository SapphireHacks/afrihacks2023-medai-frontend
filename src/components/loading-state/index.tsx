import { Flex } from '@chakra-ui/react';
import { DotLoader } from 'react-spinners';

const LoadingState: React.FC = () => {
  return (
    <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
      <DotLoader color="#184445" />
    </Flex>
  );
};
export default LoadingState;
