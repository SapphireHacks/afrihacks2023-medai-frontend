import { handleSearch } from "@/redux/conversations/slice";
import debounce from "@/utils/debounce";
import { useCallback } from "react";
import { useDispatch } from "react-redux";


export default function useSearchConversations() {
  const dispatch = useDispatch()
  const search = useCallback((searchTerm: string) => {
    dispatch(handleSearch(searchTerm))
  }, [dispatch])
  return debounce(search, 500)
}