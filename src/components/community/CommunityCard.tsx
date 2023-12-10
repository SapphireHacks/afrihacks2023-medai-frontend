import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import CardBg from '@/assets/images/community-card-bg.png';
import CardAvatar from '@/assets/images/community-card-avatar.png';

const CommunityCard = () => {
  return (
    <Box
      h="100%"
      w="100%"
      border="solid 1px #E9EBF8"
      borderRadius="1rem"
      pos="relative"
      _hover={{
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Box h="30%" w="100%">
        <Image
          src={CardBg}
          alt="Community Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem'
          }}
        />
      </Box>
      <Box h="70%" w="100%" textAlign="center" mt="4rem">
        <Text fontWeight="550" fontSize="base">
          Effects of Drug Abuse
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur. Mauris condimentum tincidunt
          semper lobortis lacus.
        </Text>
      </Box>
      <Box
        pos="absolute"
        top="calc(30% - 1.75rem)"
        right="calc(50% - 2.75rem)"
        h="4.5rem"
        w="4.5rem"
        mr="1rem"
        mb="1rem"
      >
        <Image
          src={CardAvatar}
          alt="Community Avatar"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1rem'
          }}
        />
      </Box>
    </Box>
  );
};

export default CommunityCard;
