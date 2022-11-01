/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export type Lang = 'sr' | 'en';

export interface LangObj {
    en: 'en';
    sr: 'sr';
}

export const LANGUAGE_CODES: LangObj = {
    en: 'en',
    sr: 'sr',
};

export interface UserState {
    langCode: Lang;
}

export const initialState: UserState = {
    langCode: 'sr',
};

interface UserPayload {
    langCode: Lang;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        languageChange: (
            state: UserState,
            action: { payload: UserPayload }
        ) => {
            state.langCode = action.payload.langCode;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.user,
            };
        },
    },
});

export const { languageChange } = userSlice.actions;

export default userSlice.reducer;
