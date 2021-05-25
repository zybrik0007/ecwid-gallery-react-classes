import {GET_PHOTOS, GET_COUNT_PHOTOS, GET_PHOTOS_SCROLL, GET_PHOTO_ID, DELETE_PHOTO_ID, GET_PHOTO_ID_PAGE } from '../types/types';

const initialState = {
    photos: [],
    countPhotos: 0,
    photo: null
}

export const photosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS:
            return {...state, photos: action.payload}
        case GET_PHOTOS_SCROLL:
            return {...state, photos: state.photos.concat(action.payload)}
        case GET_COUNT_PHOTOS:
            return {...state, countPhotos: action.payload}
        case GET_PHOTO_ID:
            return {...state, photos: action.payload}
        case DELETE_PHOTO_ID:
            return {...state, photos: state.photos.filter(photo => photo['id'] !== action.payload)}
        case GET_PHOTO_ID_PAGE:
            return {...state, photo: action.payload}
        default: return state
    }
}
