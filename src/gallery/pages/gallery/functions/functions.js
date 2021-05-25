/*Изменение ширины и высоты изображений в соотвествии ширины экрана для страницы gallery*/
export function sizeColumn(arr, int, className) {
    let width1 = 0;
    let width2 = 0;
    let height1 = 0;
    let height2 = 0;
    const arrColumns = document.querySelectorAll(className);
    switch (true) {
        case (int >= 700 ):
            width1 = '250px';
            width2 = '150px';
            height1 = '30vh';
            height2 = '50vh';
            break
        case (int >=600 && int < 700) :
            width1 = '240px';
            width2 = '140px';
            height1 = '18vh';
            height2 = '28vh';
            break
        case (int >=500 && int < 600) :
            width1 = '230px';
            width2 = '130px';
            height1 = '16vh';
            height2 = '26vh';
            break
        case (int >=400 && int < 500) :
            width1 = '170px';
            width2 = '100px';
            height1 = '14vh';
            height2 = '24vh';
            break
        case ( int < 400) :
            width1 = '150px';
            width2 = '90px';
            height1 = '8vh';
            height2 = '18vh';
            break
        default:
            width1 = '250px';
            width2 = '150px';
            height1 = '30vh';
            height2 = '50vh';
    }
    for (let j=0; j<arr.length; j++) {
        if (arrColumns[j]) {
            if(arr[j].width > arr[j].height) {
                arrColumns[j].style.width = width1;
                arrColumns[j].style.minHeight = height1;
                arrColumns[j].style.maxHeight = height2
            } else {
                arrColumns[j].style.width = width2;
                arrColumns[j].style.minHeight = height1;
                arrColumns[j].style.maxHeight = height2;
            }
        }

    }
}