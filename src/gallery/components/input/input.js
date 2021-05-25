import React from 'react'
import './input.scss'

function Input({state}) {
    let time = ''
    let search = (event) => {return time = setTimeout(() => {state.keyUpFunction(event)}, 2000)}
    let searchClear = () => clearTimeout(time)

    return (
        <label className={'input-text input-text_style'}>
            <input
                className={'input-text__value input-text__value_style'}
                placeholder={state.placeholder}
                type={state.type}
                onKeyUp={(e) => {
                        searchClear();
                        search(e.target.value)
                }}
            />
        </label>
    )
}

export default Input

//