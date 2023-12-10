import { Message } from '@/types/chat';
import { UserBubble, AIBubble, AIBubbleLoading } from './ChatBubbles';
import { Flex, Button } from '@chakra-ui/react';
import { getCoordinates, getNearbyHospitals } from '@/utils/getPlacesHelpers';
import { useState } from 'react';

export default function Conversation({ messages }: { messages: Message[] }) {
  const tempUser = {
    firstName: 'Haley',
    lastName: 'Thomas',
    profileImage: ''
  };

  // to ensure we don't make unnecessary API calls while testing
  const [hospitals, setHospitals] = useState(null);
  const [lastLocation, setLastLocation] = useState('');

  const getHospitals = async (location: string) => {
    if (location !== lastLocation) {
      setHospitals(null);
      setLastLocation(location);
    }

    if (hospitals !== null) {
      return;
    }

    const { lat, lng } = await getCoordinates(location);
    if (lat !== 0 && lng !== 0) {
      const response = await getNearbyHospitals(lat, lng);
      if ('data' in response) {
        setHospitals(response.data.places);
      } else {
        console.log('Could not get hospitals.');
      }
    } else {
      console.log('Could not get coordinates for the provided address.');
    }
  };

  return (
    <Flex flexDirection="column" gap="16px" w="100%" position="relative">
      {/* <Button
        position="sticky" 
        w="fit-content" 
        mx="auto" 
        top="0" 
        px="1.2rem" 
        py="1.6rem" 
        fontSize="1.6rem"
        onClick={() => getHospitals('Ikoyi, Lagos')}>
        Find Hospitals
      </Button> */}
      {messages.map(msg => {
        if(msg.role === "user") return <UserBubble key={msg._id} user={tempUser} content={msg.content} />
        else return <AIBubble key={msg._id} content={msg.content} />
      })}
    </Flex>
  );
}
