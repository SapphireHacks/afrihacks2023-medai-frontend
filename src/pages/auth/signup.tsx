import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import LoginImage from '@/assets/images/login-image.png';

const SignUp = () => {
  return (
    <Box>
      <Box>
        <Image src={LoginImage} alt="login illustration" />
      </Box>
    </Box>
  );
};

export default SignUp;
