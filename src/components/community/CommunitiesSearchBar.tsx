import SearchIcon from "@/assets/icons/search";
import CollapsableSearchBar from "../history/CollapsableSearchBar";



export default function CommunitiesSearchBar(){
  const handleSearch = () => {}
  return(
    <>
    <CollapsableSearchBar expandSearchBarAlways disabled={false} handleTyping={handleSearch}>
      <SearchIcon />
    </CollapsableSearchBar>  
    </>
  )
}