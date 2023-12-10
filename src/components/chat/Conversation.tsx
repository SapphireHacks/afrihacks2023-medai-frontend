import { Message } from '@/types/chat';
import { UserBubble, AIBubble, AIBubbleLoading } from './ChatBubbles';
import { Flex } from '@chakra-ui/react';
import { getCoordinates, getNearbyHospitals } from '@/utils/getPlacesHelpers';
import { useState } from 'react';
import useSortMessages from "@/hooks/useSortMessages"
import { User } from "@/redux/user/slice"

export default function Conversation({ messages, messageToSend, user, }: 
  { messages: Message[], messageToSend: {
  content: string,
  conversationId: string | null

} | null ;  user: User["data"] | null}) {
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

  const sortedMessages = useSortMessages(messages)
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
      {sortedMessages.map(msg => {
        if(msg.role === "user") return <UserBubble key={msg._id} user={user} content={msg.content} />
        else return <AIBubble key={msg._id} content={msg.content} />
      })}
      { messageToSend !== null && <UserBubble user={user} content={messageToSend.content} />}
      { messageToSend !== null && <AIBubbleLoading />}
    </Flex>
  );
}
