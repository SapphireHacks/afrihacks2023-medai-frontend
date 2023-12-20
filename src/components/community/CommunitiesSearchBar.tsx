import SearchIcon from "@/assets/icons/search";
import CollapsableSearchBar from "../history/CollapsableSearchBar";
import { useAppDispatch } from "@/redux/hooks";
import { searchSuggestedCommunities } from "@/redux/communities/slice";
import { useCallback } from "react";



export default function CommunitiesSearchBar(){
  const dispatch = useAppDispatch()
  const handleSearch = useCallback((value: string) => {
    dispatch(searchSuggestedCommunities(value))
  }, [])
  return(
    <>
    <CollapsableSearchBar expandSearchBarAlways disabled={false} handleTyping={handleSearch}>
      <SearchIcon />
    </CollapsableSearchBar>  
    </>
  )
}