import {
    createAsyncThunk,
    createSelector,
    createSlice,
  } from '@reduxjs/toolkit';

import { publicRequest } from '../requestMethod';
import { 
    failureReducer,
    loadingReducer,
    Status,  
} from '../../utils/utils';

export const register = createAsyncThunk(
    'auth/register',
    async ({fullName, email, password, phone}, thunkApi) => {
        try {
            const {data} = await publicRequest.post( "auth/register" ,{user:{fullName, email, password, phone}})
            const {user: {token,...user}} = data
            return {token, user}
        }
        catch(error) {
            return thunkApi.rejectWithValue(error.response.data);
        }

    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkApi) => {
        try{
            const {data} = await publicRequest.post("auth/login",{user: {email, password}})
            
            console.log(data);
            const {user: {token,...user}} = data
            return {token, user};

        }
        catch(error){
            console.log(error.response.data);
            return thunkApi.rejectWithValue(error.response.data);
        } 
    }
)
const initialState = {
    status: Status.IDLE,

}
function successReducer(state, action) {
    localStorage.setItem("token", action.payload.token)
    state.status = Status.SUCCESS;
    state.token = action.payload.token;
    state.user = action.payload.user;
    delete state.error
  }
  
const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            logout: () => {
                localStorage.removeItem('token')
                return initialState
            },
            setToken(state, action){
                state.token = action.payload;
            }
        },
        extraReducers(builder){
            builder.addCase(login.pending,loadingReducer)

            builder
                .addCase(login.fulfilled, successReducer)
                .addCase(register.fulfilled, successReducer)
            builder
                .addCase(login.rejected, failureReducer)
                .addCase(register.rejected, failureReducer)
        }
    }
)


export const { setToken, logout } = authSlice.actions;
const selectAuthSlice = (state) => state.auth;
export const selectUser = (state) => selectAuthSlice(state).user;

export const selectErrors = (state) => selectAuthSlice(state).error;

export const selectIsLoading = (state) =>
  selectAuthSlice(state).status === Status.LOADING;

export const selectIsAuthenticated = createSelector(
    (state) => selectAuthSlice(state).token,
    selectUser,
    (token, user) => Boolean(token && user)
  );
  
export default authSlice.reducer;
  