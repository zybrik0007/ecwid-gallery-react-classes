import React from 'react'
import './photo.scss'
import PhotoButtons from '../photo-buttons/photo-buttons';
import {server} from '../../../server/server'
import {Link} from 'react-router-dom';


function Photo({photo}) {

    return (
        <div
            className={'photo photo_style'}
            data-width={photo.photo.width}
            data-height={photo.photo.height}
            data-id={photo.photo.id}>
            <div className={'photo__info photo__info_style'}>
                <div className={'photo__info-wrapper photo__info-wrapper_style'}>
                    <span className={'photo__info-id photo__info-id_style'}>ID: {photo.photo.id}</span>
                    <div className={'photo__info-buttons photo__info-buttons_style'}>
                        <div className={'photo__button-zoom-plus photo__button-zoom-plus_style'}>
                            <Link to={'/photo/' + photo.photo.id}>
                                <PhotoButtons param={{classes: 'icon-zoom-in', idx: photo.photo.id, func: () => ''}}/>
                            </Link>
                        </div>
                        <div className={'photo__button-delete photo__button-delete_style'}>
                            <PhotoButtons param={{classes: 'icon-cross', idx: photo.photo.id, func: (event) => photo.delete(event)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
            <img
                className={'photo__img photo__img_style'}
                src={server + '/images/' + photo.photo.id + '.jpg'}
            />
        </div>
    )
}

export default Photo