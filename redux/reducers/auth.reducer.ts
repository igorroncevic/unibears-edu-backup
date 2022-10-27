import {
    AuthAction,
    AuthSucessPayload,
    CollectionItemCountPayload,
} from '../actions/auth.actions';
import {
    WEB3_AUTH_SUCCESS,
    WEB3_AUTH_FAIL,
    SET_COLLECTION_ITEMS_COUNT,
} from '../constants/constants';

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

export const authReducer = (
    state: AuthState = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case WEB3_AUTH_SUCCESS:
            const { address } = action.payload as AuthSucessPayload;
            return {
                ...state,
                address,
            };
        case WEB3_AUTH_FAIL:
            return {
                ...state,
                errorMessage: 'Could not authenticate user. Please try again.',
            };
        case SET_COLLECTION_ITEMS_COUNT: {
            const { collectionItemsCount } =
                action.payload as CollectionItemCountPayload;
            return {
                ...state,
                collectionItemsCount,
            };
        }
        default:
            return state;
    }
};
