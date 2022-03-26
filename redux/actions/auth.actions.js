import {
    WEB3_AUTH_SUCCESS,
    WEB3_AUTH_FAIL,
    UNIBEARS_COUNT_REQUEST_SUCCESS,
    UNIBEARS_COUNT_REQUEST_FAIL
} from '../constants/constants';

export const authSuccess = (payload) => (dispatch) => {
    return dispatch({ type: WEB3_AUTH_SUCCESS, payload });
}

export const authFail = (payload) => (dispatch) => {
    return dispatch({ type: WEB3_AUTH_FAIL, payload });
}

export const getUnibearsCount = (payload) => async (dispatch) => {
    try {
        const { data } = await axios.get('moralis url');
        dispatch({
            type: UNIBEARS_COUNT_REQUEST_SUCCESS,
            payload: {
                count: data.count,
            }
        });
    } catch (error) {
        dispatch({ type: UNIBEARS_COUNT_REQUEST_FAIL });
    }
}