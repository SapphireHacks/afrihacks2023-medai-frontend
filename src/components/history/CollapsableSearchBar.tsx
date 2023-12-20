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
import { useState, useRef, MutableRefObject, useEffect } from 'react';
import useSpeechRecognition from '@/utils/speechRecognition';
import { pulse } from "../chat/ChatInput";

export default function CollapsableSearchBar({
  children,
  childrenWhenExpanded,
  disabled,
  handleTyping,
  expandSearchBarAlways
}: Children & {
  childrenWhenExpanded?: Children['children'];
  disabled: boolean;
  handleTyping: (value: string) => void
  expandSearchBarAlways?: boolean
}) {
  const [showSearchBar, setShowSearchBar] = useBoolean(expandSearchBarAlways ? true : false);
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    showSearchBar && inputRef.current?.focus()
  }, [showSearchBar])

  return (
    <Flex alignItems="center">
      <Box position="relative" w={showSearchBar ? '100%' : ''}>
        <Button
          onClick={disabled ?  setShowSearchBar.off : setShowSearchBar.toggle}
          display={showSearchBar ? 'none' : 'block'}
          bg="transparent"
          opacity={disabled ? '0.4' : '1'}
          p="0"
          h="max-content"
        >
          {children}
        </Button>
      </Box>
      <Fade in={showSearchBar}>
        <Flex
          alignItems="center"
          justify={{ base: 'center', md: 'space-between' }}
          w={showSearchBar ? '100%' : '0'}
          overflow="hidden"
          top="0"
          left="0"
          right="0"
          gap={{ base: '1.5rem', md: '1.6rem' }}
          position={showSearchBar ? 'absolute' : 'static'}
        >
          <Button as={expandSearchBarAlways ? "span" : "button"} bg="transparent" onClick={!expandSearchBarAlways ? setShowSearchBar.toggle : undefined}>
            {childrenWhenExpanded || children}
          </Button>
          <SearchInput inputRef={inputRef} handleTyping={handleTyping} />
        </Flex>
      </Fade>
    </Flex>
  );
}

function SearchInput({ handleTyping, inputRef }: {
  handleTyping: (search: string) => void,
  inputRef: MutableRefObject<HTMLInputElement | null>,
}) {
  const [message, setMessage] = useState('');
  const { listening, startListening, stopListening, hasRecognitionSupport } =
    useSpeechRecognition((value) => {
      setMessage(value),
      handleTyping(value)
    }, () => message)

  return (
    <Box
      flexGrow="1"
      maxW={{ base: '70%', xs: '80%', md: '100%' }}
    >
      <InputGroup size="lg">
        <Input
          ref={inputRef}
          p="2rem"
          pr="4.5rem"
          type="text"
          fontFamily="accent"
          _focusVisible={{ border: "1px solid", borderColor: "primary.800", outline: "0"}}
          placeholder="Enter a search"
          value={message}
          onChange={e => {
            setMessage(e.target.value)
            handleTyping(e.target.value)
          }}
          bg={"white.500"}
        />
        {hasRecognitionSupport && (
          <InputRightElement width="4.5rem" my="0.5rem">
            <Button
              type="button"
              bg="transparent"
              p="0"
              h="unset"
              size="lg"
              transform={{ base: "scale(1)", md: "scale(1.1)"}}
              onClick={listening ? stopListening : startListening}
              color={listening ? "primary.800" : "black"}
              animation={listening ? `${pulse} 1000ms linear infinite` : "none"}
            >
              <Icon as={MicrophoneFilled} w="2rem" h="2rem" />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}
