import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface AuthState {
    address: string;
    collectionItemsCount: number;
    errorMessage: string;
}

export const initialState: AuthState = {
    address: '',
    collectionItemsCount: 0,
    errorMessage: '',
};

export interface AuthSucessPayload {
    address: string;
}

export interface CollectionItemCountPayload {
    collectionItemsCount: number;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        web3AuthSuccess: (
            state: AuthState,
            action: { payload: AuthSucessPayload }
        ) => {
            state.address = action.payload.address;
        },
        web3AuthFail: (state: AuthState) => {
            state.errorMessage =
                'Could not authenticate user. Please try again.';
        },
        setCollectionItemCount: (
            state: AuthState,
            action: { payload: CollectionItemCountPayload }
        ) => {
            state.collectionItemsCount = action.payload.collectionItemsCount;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { web3AuthSuccess, web3AuthFail, setCollectionItemCount } =
    authSlice.actions;

export default authSlice.reducer;
