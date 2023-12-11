

import { Wrap, WrapItem } from '@chakra-ui/react'
import { useCallback } from "react"
import ActionItem from "./Actionitem"

export default function ActionItemsList(){
  const actionItems = useGetActionItems()()

  return(
    <Wrap 
      spacing={{ base: "1.6rem", md: "2.4rem"}} 
      align="stretch" justify="center"
      w="100%">
      {
        actionItems.map(item => (
          <WrapItem w={{ base: "100%", md: "calc(50% - 1.2rem)"}} key={item.content}>
              <ActionItem onClick={item.onClick}>{item.content}</ActionItem>
          </WrapItem>
        ))
      }
    </Wrap>
  )
}


function useGetActionItems(){
  return useCallback(() => {
    return [
      new ActionableItem(
        "How are you feeling today? Any specific symptoms bothering you?",
         () => {}
     ),
      new ActionableItem(
        "Interested in exploring health tips or stories shared by our community?",
         () => {}
      ),
      new ActionableItem(
        "Need information on nearby health facilities like hospitals or clinics?",
         () => {}
      ),
      new ActionableItem(
        "Want to know more about staying fit or maintaining a healthy lifestyle?",
         () => {}
      ),
    ]
  }, [])
}

class ActionableItem{
  content: string
  onClick: () => void
  constructor(content: string, onClick: () => void){
    this.content = content
    this.onClick = onClick
  }
}