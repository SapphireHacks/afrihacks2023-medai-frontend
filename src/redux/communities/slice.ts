import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Community } from '@/types';
import type { CommunityMessage, } from '@/types/chat';

export interface StoreCommunity extends Community {
  messages?: CommunityMessage[];
  hasOlderMessages: boolean;
  hasFetchedInitialMessages: boolean;
  page: number;
}

export interface Membership {
  member: string,
  community: string
}

export interface CommunitiesState {
  memberships: Membership[],
  hasFetchedMemberships: boolean,
  communities: StoreCommunity[]
  hasFetchedCommunities: boolean,
  communitiesPage: number
  hasMoreCommunities: boolean
  activeCommunityId: string | null
  searchResults: StoreCommunity[]
  searchTerm: string
}

const initialState: CommunitiesState = {
  memberships: [],
  hasFetchedMemberships: false,
  communities: [],
  hasFetchedCommunities: false,
  communitiesPage: 1,
  hasMoreCommunities: true,
  activeCommunityId: null,
  searchResults: [],
  searchTerm: ""
};

export const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    updateMemberships: (state, action: PayloadAction<Membership[]>) => {
      state.hasFetchedMemberships = true
      state.memberships = [...Array.from(
         new Set(
          [...state.memberships
            , ...action.payload
          ].map(el =>
            JSON.stringify(el)
          )
        )
      )]
      .map(el => JSON.parse(el))
    },
    updateCommunities: (state, action: PayloadAction<Community[]>) => {
      state.hasFetchedCommunities = true
      const communitiesInStore = [...state.communities]
      action.payload.forEach((community: Community) => {
          const communityInStore = communitiesInStore.find(it => it._id === community._id)
          if(!communityInStore){
            communitiesInStore.push({
            ...community,
            messages: [],
            hasOlderMessages: true,
            hasFetchedInitialMessages: false,
            page: 1
          })   
          }
      }) 
      state.communities = communitiesInStore    
     },
    searchCommunities: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.searchResults = (state.communities as StoreCommunity[]).filter(it => {
        if(it.name.toLowerCase().includes(action.payload.toLowerCase())) return true
        else if(it.description.toLowerCase().includes(action.payload.toLowerCase())) return true
        else return false
      })
    }
  }
});

export const {
  updateMemberships,
  updateCommunities,
  searchCommunities,
} = communitiesSlice.actions;

export default communitiesSlice.reducer;
