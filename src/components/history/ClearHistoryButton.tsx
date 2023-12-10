import { Icon, Button } from '@chakra-ui/react';
import { clearConversations } from '@/redux/conversations/slice';
import TrashIcon from '@/assets/icons/trash';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react';
import { Children } from '@/types/index';
import { useAppDispatch } from '@/redux/hooks';

export default function ClearHistoryButton({
  children,
  disabled,
}: Children & {
  disabled?: boolean;
}) {
  const dispatch = useAppDispatch();
  if (disabled) return <>{children}</>;
  return (
    <Popover placement="left-start">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent bg="white.main">
        <PopoverBody>
          <ConfirmDeletePopover
            confirmDelete={() => dispatch(clearConversations())}
          >
            <Button
              _hover={{ bg: 'white.500' }}
              fontSize="1.6rem"
              py="2rem"
              w="100%"
              bg="transparent"
            >
              Clear History
            </Button>
          </ConfirmDeletePopover>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export const ConfirmDeletePopover = ({
  confirmDelete,
  children
}: Children & {
  confirmDelete: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontSize="1.4rem" fontWeight="600" textAlign="center">
          Are you sure?
        </PopoverHeader>
        <PopoverBody>
          <Button
            color="red"
            mx="auto"
            bg="transparent"
            fontSize="1.4rem"
            display="block"
            onClick={confirmDelete}
          >
            Yes, delete
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
