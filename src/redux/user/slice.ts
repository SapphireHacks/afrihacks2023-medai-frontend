import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
    data: {
      profileImage: string,
    firstName: string,
    lastName: string
    email: string,
    location: {
      type: string,
      coordinates: number[],
    },
    previousHealthConditions: string[],
    currentHealthConditions: string[],
    dob: string,
    emailVerificationToken: string,
    passwordResetToken: string,
    expireAt: string,
    isVerified: boolean
  } | null
}

const initialState: User = {
  data: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
})

export const { } = userSlice.actions

export default userSlice.reducer