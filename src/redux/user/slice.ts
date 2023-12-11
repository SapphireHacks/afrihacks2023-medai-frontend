import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
  data: {
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
    location: {
      type: string;
      coordinates: number[];
    };
    previousHealthConditions: string[];
    currentHealthConditions: string[];
    dob: string;
    emailVerificationToken: string;
    passwordResetToken: string;
    expireAt: string;
    isVerified: boolean;
    hasAcceptedCommunityTerms: boolean;
  } | null;
  token: string | null;
}

const initialState: User = {
  data: null,
  token: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log('setting user', action.payload);
      state.data = action.payload.data;
      state.token = action.payload.token;
    },
    clearUser: state => {
      state.data = null;
      state.token = null;
    },
    acceptCommunityTerms: state => {
      if (state.data) {
        state.data.hasAcceptedCommunityTerms = true;
      }
    }
  }
});

export const { setUser, clearUser, acceptCommunityTerms } = userSlice.actions;

export default userSlice.reducer;
