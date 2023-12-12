import HospitalChatInput from './HospitalChatInput';
import { Box } from '@chakra-ui/react';
import { AIBubble, AIBubbleLoading, UserBubble } from '../chat/ChatBubbles';
import { getCoordinates, getNearbyHospitals } from '@/utils/getPlacesHelpers';
import { ReactNode, useState } from 'react';
import HospitalList from './HospitalsList';
import { useAppSelector } from '@/redux/hooks';

const HospitalSearch = () => {
  const [location, setLocation] = useState('');
  const [messages, setMessages] = useState<
    {
      sender: 'AI' | 'USER';
      content: ReactNode;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(state => state.user.data);

  const getHospitals = async (location: string) => {
    setLoading(true);

    try {
      const { lat, lng } = await getCoordinates(location);
      if (lat === 0 && lng === 0) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: 'AI',
            content:
              'Could not get coordinates for the provided address. Please check the address and try again.'
          }
        ]);
        setLoading(false);
        return;
      }

      const response = await getNearbyHospitals(lat, lng);
      if ('data' in response) {
        // console.log('response.data.places', response.data.places);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: 'AI',
            content: <HospitalList hospitals={response.data.places} />
          }
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: 'AI', content: 'Could not get hospitals.' }
        ]);
      }
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: 'AI',
          content:
            'An error occurred while fetching hospitals. Please try again.'
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <Box w="100%" h="100%" p="2rem" pos="relative">
      <Box
        h="80%"
        overflowY="auto"
        pr="2rem"
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
        <AIBubble content="Of course! I can assist you with finding health facilities in your area. May I know your location or the area you're interested in?" />

        {messages.map((message, index) =>
          message.sender === 'AI' ? (
            <AIBubble key={index} content={message.content} />
          ) : (
            <UserBubble key={index} content={message.content} user={user} />
          )
        )}
        {loading && <AIBubbleLoading />}
      </Box>
      <HospitalChatInput
        message={location}
        setMessage={setLocation}
        fetchHospitals={getHospitals}
        setMessages={setMessages}
        messages={messages}
      />
    </Box>
  );
};

export default HospitalSearch;
