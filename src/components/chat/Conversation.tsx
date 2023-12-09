import { Message } from '@/types/chat';
import { UserBubble, AIBubble, AIBubbleLoading } from './ChatBubbles';
import { Flex } from '@chakra-ui/react';
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
    <Flex flexDirection="column" gap="16px" w="100%">
      {/* <button onClick={() => getHospitals('Ikoyi, Lagos')}>
        Get Hospitals
      </button> */}
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubble content={'placeholder'} />
      <UserBubble user={tempUser} content={'placeholder'} />
      <AIBubbleLoading />
    </Flex>
  );
}
