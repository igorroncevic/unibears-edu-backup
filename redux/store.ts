import authReducer, { authSlice } from './reducers/auth.reducer';
import courseReducer, { courseSlice } from './reducers/course.reducer';
import userReducer, { userSlice } from './reducers/user.reducer';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
    configureStore({
        reducer: {
            [authSlice.name]: authReducer,
            [userSlice.name]: userReducer,
            [courseSlice.name]: courseReducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
