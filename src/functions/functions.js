import axios from 'axios';
import {server} from '../server/server';

/*Запрос к серверу на получение изображений*/
export async function getPhotosGallery (event) {
    try {
        return await axios.get(server + '/get', {params: {count: event}})
    } catch (err) {
        return err
    }
}

/*Запрос к серверу на получение общего количества изображений*/
export async function getCountPhotosGallery() {
    try {
        return await axios.get(server + '/get/image/count')
    } catch (err) {
        return err
    }
}

/*Запрос на добавление фотографий JSON файлом*/
export async function putJsonGallery(event) {
    try {
        let putFile = new FormData();
        putFile.append('file', event.files[0])
        return await axios.put(server + '/json', putFile, {
            headers: {'Accept': 'application/json', 'Content-Type': 'multipart/form-data'},
        });
    } catch (err) {
        return err;
    }
}

/*Запрос к серверу на получение изображния по ID*/
export async function getPhotoIdGallery(event) {
    try {
        return await axios.get(server + '/get/image/id', {params: {id: event}})
    } catch (err) {
        return err
    }
}

/*Запрос к серверу на удаление изображения по ID*/
export async function deletePhotoGallery(event) {
    try {
        return await axios.delete(server + '/delete', {data: {id: event}})
    } catch (err) {
        return err
    }
}

/*Запрос к серверу на добавление фотографии по URL*/
export async function putImageGallery(event) {
    try {
        const req = {request: event}
        return await axios.put(server + '/put', req);
    } catch (err) {
        return err;
    }
}
