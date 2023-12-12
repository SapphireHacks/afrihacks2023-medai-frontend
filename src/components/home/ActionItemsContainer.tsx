import { Wrap, WrapItem } from '@chakra-ui/react';
import { useCallback } from 'react';
import ActionItem from './Actionitem';
import { useAppDispatch } from '@/redux/hooks';
import { setShowHospitalSearch } from '@/redux/hospital-search/slice';
import { updateMessgeToSend } from "@/redux/conversations/slice";

export default function ActionItemsList() {
  const actionItems = useGetActionItems()();

  return (
    <Wrap
      spacing={{ base: '1.6rem', md: '2.4rem' }}
      align="stretch"
      justify="center"
      w="100%"
    >
      {actionItems.map(item => (
        <WrapItem
          w={{ base: '100%', md: 'calc(50% - 1.2rem)' }}
          key={item.content}
        >
          <ActionItem onClick={item.onClick}>{item.content}</ActionItem>
        </WrapItem>
      ))}
    </Wrap>
  );
}

function useGetActionItems() {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    return [
      new ActionableItem(
        'How are you feeling today? Any specific symptoms bothering you?',
        () => {
          dispatch(updateMessgeToSend({
            content: "Doc MedAI, I'd like to talk to you about my health.",
            conversationId: null
          }))
        }
      ),
      new ActionableItem(
        'Interested in exploring health tips or stories shared by our community?',
        () => {
          dispatch(updateMessgeToSend({
            content: "Doc MedAI, I'd like to get health tips and stories.",
            conversationId: null
          }))
        }
      ),
      new ActionableItem(
        'Need information on nearby health facilities like hospitals or clinics?',
        () => {
          dispatch(setShowHospitalSearch(true));
        }
      ),
      new ActionableItem(
        'Want to know more about staying fit or maintaining a healthy lifestyle?',
        () => {
          dispatch(updateMessgeToSend({
            content: "Doc MedAI, How can I lead a healthier life",
            conversationId: null
          }))
        }
      )
    ];
  }, []);
}

class ActionableItem {
  content: string;
  onClick: () => void;
  constructor(content: string, onClick: () => void) {
    this.content = content;
    this.onClick = onClick;
  }
}
