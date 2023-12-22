import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import CommunityBg from '@/assets/images/community-header-bg.png';
import CardAvatar from '@/assets/images/community-card-avatar.png';
import { Community } from "@/types";
import Link from "next/link";
import BackArrow from "@/assets/icons/back";

export default function CommunityChatHeading({ community }: {
  community?: Community
}){
  if(!community) return null
  return (
   <>
   <Box as={Link} display="block" mb={{ base: "2rem", md: "3rem"}} href="/community"><BackArrow/></Box>
      <Flex 
        bg={`url(${community.primaryCoverImage !== '' ? community.primaryCoverImage : "/community-header-bg.png"})`} 
        backgroundSize="cover"
        backgroundPosition="center" 
        borderRadius="0.8rem" 
        overflow="hidden" position="relative" h={{ base: "5rem", md: "17rem" }} boxShadow="3px 3px inset rgba(255, 255, 255, 0.5)">
        <Box
          pos="absolute"
          top="50%" left="50%"
          transform="translate(-50%, -50%)"
          borderRadius="0.8rem"
          w="100%"
          h="100%"
          borderX={{ base: "1.6rem solid rgba(255, 255, 255, 0.5)", md: "4.3rem solid rgba(255, 255, 255, 0.5)" }}
          borderY={{ base: "0.7rem solid rgba(255, 255, 255, 0.5)", md: "1.9rem solid rgba(255, 255, 255, 0.5)" }}
        ></Box>
        <Flex
          alignItems="flex-end"
          gap="1rem"
          pos="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          px={{ base: "2.2rem", md: "5.9rem" }}
        >
          <Flex bg="inherit" w={{ base: "3rem", md: "8rem" }} h={{ base: "3rem", md: "8rem" }}>
            <Image
              src={
                community.secondaryCoverImage !== '' ? community.secondaryCoverImage : CardAvatar
              }
              alt="Community Avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '1rem'
              }}
            />
          </Flex>
          <Text
            color="white.main"
            fontSize={{ base: "1rem", md: "2.4rem" }} fontWeight="600"
          >
            {community.name}
          </Text>
        </Flex>
      </Flex>
   </>
  )
}