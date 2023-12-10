import { useMemo } from "react"
import { Message } from "@/types/chat"

export default function useSortMessages (
  messages: Message[],
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
  }, [messages])
}
