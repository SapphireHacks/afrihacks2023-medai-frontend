import { VStack, Text, Show } from '@chakra-ui/react';
import Image from 'next/image';
import ActionItemsList from "./ActionItemsContainer";

export default function Hero() {

  return (
    <>
      <VStack spacing="1.6rem">
        <Show above="md">
          <Image
            src="/hero-desktop.png"
            alt="MedAI Logo"
            width={146}
            height={167}
          />
        </Show>
        <Show below="md">  
          <Image
            src="/hero-mobile.png"
            alt="MedAI Logo"
            width={80}
            height={91}
          />
        </Show>
        <Text
          fontSize={{ base: '2rem', md: '3rem' }}
          fontWeight="600"
          lineHeight="125%"
        >
          How can I help you today?
        </Text>
      </VStack>
      <ActionItemsList/>
    </>
  );
}
