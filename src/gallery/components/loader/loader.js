import React from 'react'
import './loader.scss'

function Loader({top}) {
    return(
        <div className={'loader loader_style'} style={{top: top + 'px'}}>
            <div className={'loader__wrapper loader__wrapper_style'}><div/><div/><div/><div/><div/><div/><div/><div/><div/></div>
        </div>

    )
}

export default Loader