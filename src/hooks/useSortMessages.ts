import { useMemo } from "react"
import { CommunityMessage, Message } from "@/types/chat"

export default function useSortMessages (
  messages: (Message | CommunityMessage)[],
) {
  return useMemo(() => {
    return [...messages].map(it => ({
      ...it,
      createdAt: new Date(it.createdAt as string)
    })).sort((a, b) => {
       return (
              a.createdAt.getTime() -
              b.createdAt.getTime()
            )
      })
  }, [messages]) as any
}
