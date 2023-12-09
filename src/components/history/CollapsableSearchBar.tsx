import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  useBoolean,
  Flex,
  Box
} from '@chakra-ui/react';
import MicrophoneFilled from '@/assets/icons/microphoneFilled';
import { Children } from '@/types/index';
import { Fade } from '@chakra-ui/react';
import { useState, useCallback } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';

export default function CollapsableSearchBar({
  children,
  childrenWhenExpanded
}: Children & {
  childrenWhenExpanded?: Children['children'];
}) {
  const [showSearchBar, setShowSearchBar] = useBoolean(false);

  return (
    <Flex alignItems="center" bg="white">
      <Box position="relative" w={showSearchBar ? '100%' : ''}>
        <Button
          onClick={setShowSearchBar.toggle}
          display={showSearchBar ? 'none' : 'block'}
          bg="transparent"
        >
          {children}
        </Button>
      </Box>
      <Fade in={showSearchBar}>
        <Flex
          alignItems="center"
          justify={{ base: 'center', md: 'space-between' }}
          w={showSearchBar ? '100%' : '0'}
          pb={showSearchBar ? { md: '3.2rem', base: '1.4rem' } : '0'}
          pt={showSearchBar ? { md: '5.6rem', base: '2.4rem' } : '0'}
          bg="white"
          overflow="hidden"
          top="0"
          left="0"
          right="0"
          gap={{ base: '1.5rem', md: '1.6rem' }}
          position={showSearchBar ? 'absolute' : 'static'}
        >
          <Button bg="transparent" onClick={setShowSearchBar.toggle}>
            {childrenWhenExpanded || children}
          </Button>
          <SearchInput />
        </Flex>
      </Fade>
    </Flex>
  );
}

function SearchInput() {
  const [message, setMessage] = useState('');
  const { listening, startListening, stopListening, hasRecognitionSupport } =
    useSpeechRecognition(setMessage, () => message);

  const handleSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log(message);
    },
    [message]
  );

  return (
    <Box
      flexGrow="1"
      maxW={{ base: '70%', xs: '80%', md: '100%' }}
      as="form"
      onSubmit={handleSearch}
    >
      <InputGroup size="lg">
        <Input
          p="2rem"
          pr="4.5rem"
          type="text"
          placeholder="Enter a search"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          bg="white.500"
        />
        {hasRecognitionSupport && (
          <InputRightElement width="4.5rem" my="0.5rem">
            <Button
              type="button"
              bg="transparent"
              size="sm"
              onClick={listening ? stopListening : startListening}
            >
              <Icon as={MicrophoneFilled} w="2rem" h="2rem" />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}
