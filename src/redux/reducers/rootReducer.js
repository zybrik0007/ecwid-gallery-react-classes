import {combineReducers} from 'redux';
import {photosReducer} from './photosReducer';
import {systemReducer} from './systemReducer'

export const rootReducer = combineReducers({
    photos: photosReducer,
    system: systemReducer
})