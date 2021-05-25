import React, {useEffect, useState} from 'react'
import './input-selector.scss'
import {inputDisplay, nameInputFile, deleteValue} from './functions/functions';

/*Компонент принимает объект и на основании него строит верстку.
Массив arrayInput принмает два вида объекта в зависмости от того,какой Input создается.
Поле data_name, должно быть индвидуального для каждого Input,
Поле type, настрвает input на текст или файл.
Поле accept_file, настрвает input типа файл на выбор определеных файлов.
Поле placeholder, задает placeholder для input типа текст.
Поле function_submit, сабмитет input text по нажатию Enter.

Массив ojbButtonSubmit принмает в себя настройки которые настрвают кнопку на сабмит активного input файла.
button_icon - какая иконка будет у кнопки.
data_name - должен равнятся data_name input файла.
function_submit - функция вызываемя при сабмите активного input файла.

Массив arrOption задает value и имя option в select, должны быть аналогично data_name inputs.
*/
function InputSelector({objSelectorInput}) {
    const [obj] = useState(objSelectorInput)

    useEffect(() => {
        inputDisplay(document.getElementsByClassName('input-selector__select-input'),
            document.getElementsByClassName('input-selector__select-button'),
            document.querySelector('.input-selector__select-value').value)
    }, []);

    return(
        <div className={'input-selector input-selector_style'}>
            <form className={'input-selector__form input-selector__form_style'}>
                {
                    obj['arrayInput'].map((setting) => (
                        setting.type === 'file' ?
                            <label
                                className={'input-selector__file input-selector__file_style input-selector__select-input'}
                                data-name={setting.data_name}>
                                <span className={'input-selector__file-name' }>Select File</span>
                                <input
                                    className={'input-selector__file-value input-selector__select-input-value ' + setting.data_name}
                                    type={setting.type} accept={setting.accept_file}
                                    onChange={() => {nameInputFile(
                                        'label > input[type=file]',
                                        'label > span'
                                    )}}/>
                            </label>
                            :
                            <label
                                className={'input-selector__text input-selector__text_style input-selector__select-input'}
                                data-name={setting.data_name}>
                                <input
                                    className={'input-selector__text-value input-selector__text-value_style input-selector__select-input-value'}
                                    type={setting.type} placeholder={setting.placeholder}
                                    data-name={setting.data_name}
                                    onKeyUp={
                                        (event) => {
                                            event.preventDefault()
                                            if (event.code === 'Enter') {
                                                setting.function_submit(event.target.value);
                                                deleteValue('label > input[type=text]');
                                            }
                                        }
                                    }
                                />
                            </label>))
                }
                {
                    obj['ojbButtonSubmit'].map(butSetting => (
                        <button type='submit'
                                className={'input-selector__button input-selector__button_style input-selector__select-button'}
                                data-name={butSetting.data_name}
                                onClick={
                                    (event) => {
                                        event.preventDefault();
                                        let file = document.querySelector('.' + butSetting.data_name)
                                            butSetting.function_submit(file)
                                            deleteValue('label > input[type=file]');
                                            nameInputFile(
                                                'label > input[type=file]',
                                                'label > span'
                                            );
                                    }}>
                            <span className={butSetting.button_icon}/>
                        </button>))
                }

                <label className={'input-selector__select input-selector__select_style'}>
                    <select className={'input-selector__select-value input-selector__select-value_style'}
                            onChange={
                                (newSelect) => {
                                    inputDisplay(
                                        document.getElementsByClassName('input-selector__select-input'),
                                        document.getElementsByClassName('input-selector__select-button'),
                                        newSelect.target.value
                                    );
                                    deleteValue('label > input');
                                    nameInputFile(
                                        'label > input[type=file]',
                                        'label > span'
                                    );
                                }}>
                        {
                            obj['arrOption'].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>))
                        }
                    </select>
                </label>
            </form>
        </div>)
}


export default InputSelector
