import ProtectedLayout from '@/components/layouts/protected/DefaultLayout';
import {
  Box,
  useDisclosure,
  Checkbox,
  Text,
  Button,
  Flex,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
  InputLeftElement,
  Grid,
  GridItem
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CommunityImg from '@/assets/images/community-image.png';
import SendIcon from '@/assets/icons/send';
import MicIcon from '@/assets/icons/microphone';
import useSpeechRecognition from '@/utils/speechRecognition';
import SearchIcon from '@/assets/icons/search';
import CommunityCard from '@/components/community/CommunityCard';
import Link from 'next/link';

const Community = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   onOpen();
  // }, []);

  const [searchText, setSearchText] = useState('');
  const {
    text,
    listening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition(setSearchText, () => searchText);

  return (
    <>
      {isOpen && (
        <Flex
          pos="absolute"
          bg="white"
          flexDir="column"
          gap="1.5rem"
          w="100%"
          h="calc(100vh - 6rem)"
          zIndex="100"
          mt="6rem"
          textAlign="center"
          py={{
            base: '0',
            md: '4rem'
          }}
          px={{
            base: '2rem',
            md: '15rem'
          }}
        >
          <Box
            w={{
              base: '80%',
              md: '40%'
            }}
            mx="auto"
            mt="2.5rem"
          >
            <Image
              src={CommunityImg}
              alt="Community illustration"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </Box>
          <Text
            fontSize={{
              base: '2xl',
              md: '3xl'
            }}
            fontWeight="550"
          >
            Welcome to Our Health Community: Sharing Tips and Testimonies
          </Text>
          <Text
            fontSize={{
              base: 'sm',
              md: 'lg'
            }}
          >
            Join our dynamic Health Community, where members exchange valuable
            health tips, share inspiring testimonies, and support one another on
            their wellness journeys.
          </Text>
          <FormLabel
            htmlFor="join-community"
            fontSize={{
              base: 'xs',
              md: 'sm'
            }}
            textAlign="center"
            mt="1rem"
            display="flex"
            alignItems="flex-start"
          >
            <input
              type="checkbox"
              name="join-community"
              style={{
                marginRight: '0.5rem',
                marginTop: '0.2rem',
                width: '1.5rem',
                height: '1.5rem'
              }}
            />
            By selecting this, you acknowledge and agree to adhere to our
            community&apos;s guidelines, fostering a positive and supportive
            environment for all members.
          </FormLabel>

          <Box>
            <Button
              h="4rem"
              w={{
                base: '100%',
                md: '50%'
              }}
              borderRadius="0.5rem"
              fontSize="lg"
              fontWeight="400"
              bg="primary.900"
              mt="2rem"
              color="white"
              _hover={{ bg: 'primary.700' }}
              onClick={onClose}
            >
              Join our community
            </Button>
          </Box>
        </Flex>
      )}
      <Box
        w="100%"
        h="100vh"
        p="2rem"
        pt={{
          base: '0',
          md: '2rem'
        }}
        mt={{
          base: '-0.8rem',
          md: '0'
        }}
        overflow="auto"
        sx={{
          '::-webkit-scrollbar': {
            width: '10px'
          },
          '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '6px'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: 'darkgray'
          }
        }}
      >
        <Box
          h="4rem"
          textAlign="center"
          display={{
            base: 'none',
            md: 'block'
          }}
        >
          <Text as="h2" fontSize="2xl" fontWeight="550">
            Community
          </Text>
        </Box>

        <InputGroup
          h={{
            base: '4rem',
            md: '6rem'
          }}
          mt="2rem"
        >
          <InputLeftElement
            m={{
              base: '0.8rem',
              md: '1.55rem'
            }}
          >
            <IconButton
              aria-label="Search"
              icon={<SearchIcon height={18} width={18} />}
              bg="none"
            />
          </InputLeftElement>

          <Input
            h="100%"
            placeholder="Search"
            fontSize="lg"
            pl="5rem"
            pr="5rem"
            borderRadius="0.5rem"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <InputRightElement
            m={{
              base: '0.5rem',
              md: '1.55rem'
            }}
          >
            {hasRecognitionSupport && (
              <IconButton
                // to do: change icon when listening, need recording icon
                icon={listening ? <SendIcon /> : <MicIcon />}
                aria-label="Send message"
                bg="none"
                onClick={listening ? stopListening : startListening}
              />
            )}
          </InputRightElement>
        </InputGroup>

        <Box mt="2rem">
          <Text
            fontSize={{
              base: 'base',
              md: 'xl'
            }}
            fontWeight="550"
          >
            Discover Communities
          </Text>
          <Text
            fontSize={{
              base: 'sm',
              md: 'lg'
            }}
            fontWeight="500"
          >
            Communities you might like
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)'
          }}
          gap="2.5rem"
          mt="2rem"
          h="100%"
        >
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
          <GridItem h="100%">
            <Link href="/community/1">
              <CommunityCard />
            </Link>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

Community.requireAuth = true;
Community.getLayout = (page: any) => (
  <ProtectedLayout title="Community">{page}</ProtectedLayout>
);
export default Community;
