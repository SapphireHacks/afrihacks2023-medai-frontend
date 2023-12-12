import HospitalChatInput from './HospitalChatInput';
import { Box } from '@chakra-ui/react';
import { AIBubble, AIBubbleLoading, UserBubble } from '../chat/ChatBubbles';
import { getCoordinates, getNearbyHospitals } from '@/utils/getPlacesHelpers';
import { useState } from 'react';

const HospitalSearch = () => {
  const [location, setLocation] = useState('');
  const [messages, setMessages] = useState<
    {
      sender: 'AI' | 'USER';
      content: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getHospitals = async (location: string) => {
    setLoading(true);

    try {
      const { lat, lng } = await getCoordinates(location);
      if (lat === 0 && lng === 0) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: 'AI',
            content: 'Could not get coordinates for the provided address.'
          }
        ]);
        setLoading(false);
        return;
      }

      const response = await getNearbyHospitals(lat, lng);
      if ('data' in response) {
        console.log('response.data.places', response.data);
        const hospitalList = response.data.places
          .map(
            (
              hospital: {
                displayName: { text: string };
                formattedAddress: string;
              },
              index: number
            ) => `${index + 1}. ${hospital.displayName.text}`
          )
          .join('\n');
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: 'AI',
            content: `Here are the hospitals near your location:\n${hospitalList}`
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
          content: 'An error occurred while fetching hospitals.'
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
            <UserBubble key={index} content={message.content} user={null} />
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
