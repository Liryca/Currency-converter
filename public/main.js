let root = document.querySelector('#root');

let date = new Date();
let month = date.getMonth() + 1;
let day = date.getDate();
let num = date.getFullYear();

if (day < 10) {
    day = '0' + day
}

window.onload = function () {
    let h1 = document.createElement('h1');
    h1.style = 'font-size:22px';
    h1.innerHTML = `Официальный курс белорусского рубля на
    ${day}.0${month}.${num}`;
    root.prepend(h1);

}

button_show_current.value = (`Валюта`);
button_show_current.addEventListener('click', createForm);


async function createForm() {

    let url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
    let response = await fetch(url);
    let jsonResponse = await response.json();


    button_show_current.remove();

    let button_usd = document.createElement('input');
    button_usd.value = 'USD';
    button_usd.className = 'currency';
    button_usd.type = 'button';
    let button_eur = document.createElement('input');
    button_eur.value = 'EUR';
    button_eur.className = 'currency';
    button_eur.type = 'button';
    let button_rub = document.createElement('input');
    button_rub.value = 'RUB';
    button_rub.className = 'currency';
    button_rub.type = 'button';

    let form = document.createElement('form');
    form.id = 'form';
    form.append(button_usd, button_eur, button_rub);
    root.append(form);

    form.addEventListener('click', show_current);

    function show_current(event) {
        let div_current = document.createElement('div');
        div_current.className = 'div_current';

        for (let i of jsonResponse) {
            if (event.target.value === i.Cur_Abbreviation) {
                div_current.innerHTML = `<div style:'padding: 15px;'><div>${i.Cur_Abbreviation}</div><div>${i.Cur_OfficialRate.toFixed(2)}</div></div>`
                root.append(div_current)
            }
        }

        let arr = document.getElementsByClassName('div_current')
        console.log(arr)
        if (arr.length >= 3) {
            form.removeEventListener('click', show_current)
        }
    }
}


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////


let input = document.querySelector('#input');
let select = document.querySelector('#select');
let result = document.querySelector('#result');

fn()

async function fn() {

    let url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
    let response = await fetch(url);
    let jsonResponse = await response.json();
    let coursesItem = document.querySelectorAll('.course-value');
    coursesItem.forEach((item) => {
        jsonResponse.forEach((elem) => {
            if (item.id === elem.Cur_Abbreviation) {
                item.textContent = elem.Cur_OfficialRate.toFixed(2)
            }
        })
    })

    input.oninput = function () {
        jsonResponse.forEach((item) => {
            if (item.Cur_Abbreviation === select.value) {
                result.value = parseFloat(input.value / item.Cur_OfficialRate).toFixed(2);
            }
            if (item.Cur_Abbreviation === select.value && item.Cur_Abbreviation === 'RUB') {
                result.value = parseFloat((input.value / (item.Cur_OfficialRate)) * 100).toFixed(2)
            }
            
        })
    }

    select.oninput = function () {
        jsonResponse.forEach((item) => {
            if (item.Cur_Abbreviation === select.value) {
                result.value = parseFloat(input.value / item.Cur_OfficialRate).toFixed(2);
            }
            if (item.Cur_Abbreviation === select.value && item.Cur_Abbreviation === 'RUB') {
                result.value = parseFloat((input.value / (item.Cur_OfficialRate)) * 100).toFixed(2)
            }
        })

    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////




