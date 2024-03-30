// userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk to fetch user data from the database
export const fetchUserData = createAsyncThunk('user/fetchUserData', async ({ email }) => {
  console.log(email);
  try {
    // Make a request to fetch user data from the database based on the email
    const response = await fetch(`https://goodfood-909g.onrender.com/api/users/:${email}`); // Use the correct API endpoint
    console.log(response)
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw Error('Failed to fetch user data'); // Throw an error if fetching fails
  }
});


const initialState = {
  email: '',
  role: '',
  providerid:'',
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProviderId: (state, action) => {
      state.providerid = action.payload;
    },
    clearUser: (state) => {
      state.email = '';
      state.role = '';
      state.providerid='';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

export const loginUser = (email) => async (dispatch) => {
  try {
    dispatch(fetchUserData({ email })); // Pass email as an object
  } catch (error) {
    console.error('Error logging in user:', error);
    // Handle error or dispatch error action
  }
};
export const { clearUser,setUserProviderId } = userSlice.actions;
export const user = state => state.user

