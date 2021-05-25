import {
    getPhotosGallery,
    getCountPhotosGallery,
    putJsonGallery,
    getPhotoIdGallery,
    putImageGallery,
    deletePhotoGallery
} from '../../functions/functions';
import {
    ERROR_HIDE,
    ERROR_SHOW,
    GET_COUNT_PHOTOS,
    GET_PHOTOS,
    GET_PHOTOS_SCROLL,
    LOADER_HIDE,
    LOADER_SHOW,
    GET_PHOTO_ID, DELETE_PHOTO_ID, GET_PHOTO_ID_PAGE
} from '../types/types';


/*Получение изображений с сервера*/
export function getGallery(event) {
    return async dispatchGetGalley => {
        dispatchGetGalley(showLoader())
        document.body.style.overflow = 'hidden'
        const response = await getPhotosGallery(event);
        if(response instanceof Error) {
            if(!(response.response)) {
                dispatchGetGalley({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
            } else {
                if(!(response.response.data.error)) {
                    dispatchGetGalley({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
                } else {
                    dispatchGetGalley({type: ERROR_SHOW, payload: response.response.data.error})
                }
            }
            setTimeout(() =>{
                dispatchGetGalley(hideLoader())
                document.body.style.overflow = 'auto'
            }, 1000)
            setTimeout(() => {
                dispatchGetGalley({type: ERROR_HIDE})
            }, 10000)
        } else {

            setTimeout(() => {
                dispatchGetGalley(hideLoader())
                document.body.style.overflow = 'auto'
                dispatchGetGalley({type: GET_PHOTOS, payload: response.data.photos})
            }, 1000)
        }
    }
}

/*Получение общего количества изображений с сервера*/
export function getCountPhotos() {
    return async dispatchGetCountGallery => {
        const response = await getCountPhotosGallery();
        if (response instanceof Error) {
            if(!(response.response)) {
                dispatchGetCountGallery({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
            } else {
                dispatchGetCountGallery({type: ERROR_SHOW, payload: 'Ошибка получения данных с сервера'})
            }
            setTimeout(() => {
                dispatchGetCountGallery({type: ERROR_HIDE})
            }, 10000)
        } else {
            dispatchGetCountGallery({type: GET_COUNT_PHOTOS, payload: response.data.count})
        }
    }
}

/*Получение изображений с сервера, при скроллинге*/
export function getGalleryScroll(event) {
    return async dispatchGetGalleyScroll => {
        document.body.style.overflow = 'hidden'
        dispatchGetGalleyScroll(showLoader())
        const response = await getPhotosGallery(event);
        if (response instanceof Error) {
            if(!(response.response)) {
                dispatchGetGalleyScroll({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
            } else {
                dispatchGetGalleyScroll({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
            }
            setTimeout(() => {
                dispatchGetGalleyScroll({type: ERROR_HIDE})
            }, 10000)
            setTimeout(()=> {
                dispatchGetGalleyScroll(hideLoader())
                document.body.style.overflow = 'auto'
            }, 1000)
            document.documentElement.scrollTop = 0
        } else {

            setTimeout(()=> {
                dispatchGetGalleyScroll({type: GET_PHOTOS_SCROLL, payload: response.data.photos})
                dispatchGetGalleyScroll(hideLoader())
                document.body.style.overflow = 'auto'
            }, 2000)
        }

    }
}

/*Отправка JSON файла на сервер*/
export function putJsonPhoto(event) {
    return async dispatchPutGallery => {
        if (event.files.length > 0) {
            document.body.style.overflow = 'hidden'
            dispatchPutGallery(showLoader())
            let response =  await putJsonGallery(event)
            if (response instanceof Error) {
                if(!(response.response)) {
                    dispatchPutGallery({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
                } else {
                    if(!(response.response.data.error)) {
                        dispatchPutGallery({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
                    } else {
                        dispatchPutGallery({type: ERROR_SHOW, payload: response.response.data.error})
                    }
                }
                dispatchPutGallery(getGallery(50))
                setTimeout(() => {
                    dispatchPutGallery({type: ERROR_HIDE})
                }, 10000)
            } else {
                dispatchPutGallery(getGallery(50))
            }
        }
        setTimeout(()=> {
            dispatchPutGallery(hideLoader())
            document.body.style.overflow = 'auto'
        }, 2000)
    }
}

/*Писк изображения по ID*/
export function getPhotoId(event) {
    return async dispatchGetPhotoId => {
        if (!event.trim()) {
            dispatchGetPhotoId(getGallery(50))
        } else {
            dispatchGetPhotoId(showLoader())
            const response = await getPhotoIdGallery(event)
            if (response instanceof Error) {
                if(!(response.response)) {
                    dispatchGetPhotoId({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
                } else {
                    dispatchGetPhotoId({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
                }
                setTimeout(() => {
                    dispatchGetPhotoId({type: ERROR_HIDE})
                }, 10000)
            } else {
                if (response.data.search !== null) {
                    dispatchGetPhotoId({type: GET_PHOTO_ID, payload: [response.data.search]})
                } else {
                    dispatchGetPhotoId({type: GET_PHOTO_ID, payload: []})
                }
            }
        setTimeout(() => {dispatchGetPhotoId(hideLoader())}, 1000)}
    }
}

/*Удаление изображения*/
export function deletePhoto(event) {
    console.log('delete action 1', event);
    return async dispatchDeletePhoto => {
        console.log('delete action 2', event);
        dispatchDeletePhoto(showLoader())
        const response = await deletePhotoGallery(event)
        if (response instanceof Error) {
            if(!(response.response)) {
                dispatchDeletePhoto({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
            } else {
                dispatchDeletePhoto({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
            }
            dispatchDeletePhoto(hideLoader())
            setTimeout(() => {dispatchDeletePhoto({type: ERROR_HIDE})}, 10000)
            setTimeout(() => {document.documentElement.scrollTop = 0}, 1000)

        } else {
            setTimeout(() => {
                dispatchDeletePhoto(hideLoader())
                dispatchDeletePhoto({type: DELETE_PHOTO_ID, payload: event})}, 1000)
        }
    }
}

/*Отображение лоудера*/
export function showLoader() {
    return {
        type: LOADER_SHOW
    }
}

/*Скрытие лоудера*/
export function hideLoader() {
    return {
        type: LOADER_HIDE
    }
}

/*Отображение ошибки*/
export function showError(event) {
    return {
        type: ERROR_SHOW, payload: event
    }
}

/*Скрытие ошибки*/
export function hideError() {
    return {
        type: ERROR_HIDE
    }
}


/*Получение изображения по ID c сервера для страницы /photo:id*/
export function getPhotoIdPage(event) {
    return async dispatchGetPhotoIdPage => {
        console.log('event', event)
        if (!event.trim() || event === undefined) {
            dispatchGetPhotoIdPage({type: GET_PHOTO_ID_PAGE, payload: null})
        } else {
            dispatchGetPhotoIdPage(showLoader())
            const response = await getPhotoIdGallery(event)
            if(response instanceof Error) {
                if(!(response.response)) {
                    dispatchGetPhotoIdPage({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
                } else {
                    dispatchGetPhotoIdPage({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
                }
            } else {
                dispatchGetPhotoIdPage({type: GET_PHOTO_ID_PAGE, payload: response.data.search})
                dispatchGetPhotoIdPage({type: GET_PHOTOS, payload: []})
            }
        }

    }
}

/*Отправка URL c изображенеим на сервер*/
export function putUrlPhoto(event) {
    return async dispatchPutUrlPhoto => {
        if (event.trim() !== '') {
            dispatchPutUrlPhoto(showLoader())
            const response = await putImageGallery(event)
            if(response instanceof Error) {
                if(!(response.response)) {
                    dispatchPutUrlPhoto({type: ERROR_SHOW, payload: 'Ошибка связи с сервером'})
                } else {
                    if(!(response.response.data.error)) {
                        dispatchPutUrlPhoto({type: ERROR_SHOW, payload: 'Неизвестная ошибка сервера'})
                    } else {
                        dispatchPutUrlPhoto({type: ERROR_SHOW, payload: response.response.data.error})
                    }

                }
                setTimeout(() => {
                    dispatchPutUrlPhoto(({type: ERROR_HIDE}))
                }, 10000)
                setTimeout(()=> {
                    dispatchPutUrlPhoto(hideLoader())
                }, 2000)
            } else {
                dispatchPutUrlPhoto(getGallery(50))
                setTimeout(()=> {
                    dispatchPutUrlPhoto(hideLoader())
                }, 2000)

            }
        }
    }
}