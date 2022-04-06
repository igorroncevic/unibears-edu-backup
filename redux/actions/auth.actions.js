import {
    WEB3_AUTH_SUCCESS,
    WEB3_AUTH_FAIL,
    SET_UNIBEARS_COUNT
} from '../constants/constants';
import solanaService from '@/services/solana.service';

export const authSuccess = (payload) => (dispatch) => {
    return dispatch({ type: WEB3_AUTH_SUCCESS, payload });
}

export const authFail = (payload) => (dispatch) => {
    return dispatch({ type: WEB3_AUTH_FAIL, payload });
}

export const setUnibearsCount = (payload) => async (dispatch) => {
    return dispatch({ type: SET_UNIBEARS_COUNT, payload });
}

// export const getUnibearsCount = (address) => async (dispatch) => {
//     try {
//         const count = await solanaService.getUnibearsCount(address)
//         dispatch({
//             type: UNIBEARS_COUNT_REQUEST_SUCCESS,
//             payload: { count }
//         });
//     } catch (error) {
//         dispatch({ type: UNIBEARS_COUNT_REQUEST_FAIL });
//     }
// }