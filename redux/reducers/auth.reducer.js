import {
    WEB3_AUTH_SUCCESS,
    WEB3_AUTH_FAIL,
    UNIBEARS_COUNT_REQUEST_SUCCESS,
    UNIBEARS_COUNT_REQUEST_FAIL,
} from '../constants/constants';

const initialState = {
    address: '',
    unibearsCount: 0,
    errorMessage: '',
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEB3_AUTH_SUCCESS:
            return {
                ...state,
                address: action.payload.address,
            }
        case WEB3_AUTH_FAIL:
            return {
                ...state,
                errorMessage: 'Could not authenticate user. Please try again.',
            }
        case UNIBEARS_COUNT_REQUEST_SUCCESS: {
            return { 
                ...state,
                unibearsCount: action.payload.count,
                errorMessage: '',
            }
        }
        case UNIBEARS_COUNT_REQUEST_FAIL: {
            return { 
                ...state,
                unibearsCount: 0,
                errorMessage: "Could not get number of user's Unibears. Please try again.",
            }
        }
        default:
            return state;
    }
};