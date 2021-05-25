import {ERROR_HIDE, ERROR_SHOW, LOADER_HIDE, LOADER_SHOW} from '../types/types';

const initialState = {
    loading: true,
    error: false,
    errorText: ''
}

export const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER_SHOW:
            return {...state, loading: true}
        case LOADER_HIDE:
            return {...state, loading: false}
        case ERROR_SHOW:
            return {...state, error: true, errorText: action.payload}
        case ERROR_HIDE:
            return {...state, error: false, errorText: ''}
        default: return state
    }
}