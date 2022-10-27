import { Dispatch } from 'redux';
import {
    WEB3_AUTH_SUCCESS,
    WEB3_AUTH_FAIL,
    SET_COLLECTION_ITEMS_COUNT,
} from '../constants/constants';

export interface AuthSucessPayload {
    address: string;
}

export interface CollectionItemCountPayload {
    collectionItemsCount: number;
}

type AuthPayload = AuthSucessPayload | CollectionItemCountPayload;

export type AuthAction = {
    type: // typescript will convert these types into strings because
    // they are defined as constants which means their value never change
    | typeof WEB3_AUTH_SUCCESS
        | typeof WEB3_AUTH_FAIL
        | typeof SET_COLLECTION_ITEMS_COUNT;
    payload: AuthPayload;
};

export const authSuccess = (payload: AuthPayload) => (dispatch: Dispatch) => {
    return dispatch({ type: WEB3_AUTH_SUCCESS, payload });
};

export const authFail = () => (dispatch: Dispatch) => {
    return dispatch({ type: WEB3_AUTH_FAIL });
};

export const setCollectionItemCount =
    (payload: AuthPayload) => async (dispatch: Dispatch) => {
        return dispatch({ type: SET_COLLECTION_ITEMS_COUNT, payload });
    };
