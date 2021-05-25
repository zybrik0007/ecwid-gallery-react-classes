import React from 'react'
import './photo-buttons.scss'

function PhotoButtons({param}) {

    const dispatchHandler = () => {
        if(param.func !== '') {
            param.func(param.idx)
        }
    }

    return (
        <span className={param.classes} onClick={() => {dispatchHandler()}}/>
    )
}


export default PhotoButtons