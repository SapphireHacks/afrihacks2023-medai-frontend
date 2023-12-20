import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Community } from '@/types';
import type { Message } from '@/types/chat';

export interface StoreCommunity extends Community {
  messages?: Message[];
  hasOlderMessages: boolean;
  hasFetchedInitialMessages: boolean;
  page: number;
}

export interface CommunitiesState {
  joinedCommunities: StoreCommunity[],
  hasFetchedJoinedCommunities: boolean,
  suggestedCommunities: Community[]
  hasFetchedSuggestedCommunities: boolean,
  suggestedCommunitiesPage: number
  hasMoreSuggestedCommunities: boolean
  activeCommunityId: string | null
  searchResults: StoreCommunity[]
  searchTerm: string
}

const initialState: CommunitiesState = {
  joinedCommunities: [],
  hasFetchedJoinedCommunities: false,
  suggestedCommunities: [],
  hasFetchedSuggestedCommunities: false,
  suggestedCommunitiesPage: 1,
  hasMoreSuggestedCommunities: true,
  activeCommunityId: null,
  searchResults: [],
  searchTerm: ""
};

export const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    updateJoinedCommunities: (state, action: PayloadAction<{ communities: Community[], page: number, hasMore: boolean}>) => {
      state.hasFetchedJoinedCommunities = true
      state.joinedCommunities = [...Array.from(
         new Set(
          [...state.joinedCommunities
            , ...action.payload.communities
          ].map(el =>
            JSON.stringify(el)
          )
        )
      )]
      .map(el => JSON.parse(el))
      .map((community: StoreCommunity) => {
          return {
            ...community,
            messages: Array.isArray(community.messages) ? community.messages : [],
            hasOlderMessages:
              typeof community.hasOlderMessages === 'boolean'
                ? community.hasOlderMessages
                : true,
            hasFetchedInitialMessages:
              typeof community.hasFetchedInitialMessages === 'boolean'
                ? community.hasFetchedInitialMessages
                : false,
            page: typeof community.page === 'number' ? community.page : 1
          };
        });
    },
    updateSuggestedCommunities: (state, action: PayloadAction<Community[]>) => {
      state.hasFetchedSuggestedCommunities = true
      state.suggestedCommunities = [...Array.from(
         new Set(
          [...state.suggestedCommunities
            , ...action.payload
          ].map(el =>
            JSON.stringify(el)
          )
        )
      )]
      .map(el => JSON.parse(el))
    },
    searchSuggestedCommunities: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.searchResults = (state.suggestedCommunities as StoreCommunity[]).filter(it => {
        if(it.name.toLowerCase().includes(action.payload.toLowerCase())) return true
        else if(it.description.toLowerCase().includes(action.payload.toLowerCase())) return true
        else return false
      })
    }
  }
});

export const {
  updateJoinedCommunities,
  updateSuggestedCommunities,
  searchSuggestedCommunities,
} = communitiesSlice.actions;

export default communitiesSlice.reducer;
