/*Фунцкция, которая задает отображение input в соотвествие с выбранным select*/
export function inputDisplay(arrInput, arrButton, selectValue) {
    [...arrInput].forEach(input => {
        //console.log('selectValue: ', selectValue)
        if(input.dataset.name === selectValue) {
            input.style.display = 'flex'
        } else {
            input.style.display = 'none'
        }
    });
    [...arrButton].forEach(button => {
        if(button.dataset.name === selectValue) {
            button.style.display = 'flex'
        } else {
            button.style.display = 'none'
        }
    })
}

/*Отображение наличия данных в input типа файла*/
export function nameInputFile(InputFile, InputSpan) {
    const arrInputFile = document.querySelectorAll(InputFile)
    const arrInputSpan = document.querySelectorAll(InputSpan)
    for(let i = 0; i < arrInputFile.length; i++) {
        if(arrInputFile[i].value !== '') {
            arrInputSpan[i].innerHTML = 'File Selected'
        } else {
            arrInputSpan[i].innerHTML = 'Select File'
        }
    }
}

/*Стирание значения value у input  при переходу на другой input или сабмите*/
export function deleteValue(value) {
    const arrValue = document.querySelectorAll(value);
    arrValue.forEach(input => {
        input.value = '';
    })
}