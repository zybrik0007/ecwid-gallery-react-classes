import React from 'react'
import './error.scss'
import {useDispatch} from "react-redux";
import {hideError} from "../../../redux/actions/actions";

function Error({text}) {
    const dispatch = useDispatch()
    return (
        <div className={'error error_style'}>
            <div className={'error__wrapper error__wrapper_style'}>
                <div className={'error__button-close error__button-close_style'}>
                    <span className={'error__button-close-cross icon-cross'}
                    onClick={() => {dispatch(hideError())}}/>
                </div>
                <div className={'error__text error__text_style'}>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default Error
