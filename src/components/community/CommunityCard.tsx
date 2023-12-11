import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import CardBg from '@/assets/images/community-card-bg.png';
import CardAvatar from '@/assets/images/community-card-avatar.png';

const CommunityCard = ({
  _id,
  name,
  description,
  primaryCoverImage,
  secondaryCoverImage
}: {
  _id: string;
  name: string;
  description: string;
  primaryCoverImage: string;
  secondaryCoverImage: string;
}) => {
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
          src={primaryCoverImage !== '' ? primaryCoverImage : CardBg}
          alt="Community Image"
          width={500}
          height={500}
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
          {name}
        </Text>
        <Text>
          {description.length > 100
            ? `${description.substring(0, 80)}...`
            : description}
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
          src={secondaryCoverImage !== '' ? secondaryCoverImage : CardAvatar}
          alt="Community Avatar"
          width={500}
          height={500}
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
