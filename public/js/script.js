window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // timer . Выдаст массив total, часы, минуты и секунды
    let deadline = '2025-06-10';
    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()), // разница между датами дедлайна и сегодняшней
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            // hours = Math.floor(t/(1000*60*60) % 24), остаток часов
            // days = Math.floor(t/(1000*60*60*24)), остаток дней 
            hours = Math.floor(t/(1000*60*60));
            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds,
            }
    }
    console.log(getTimeRemaining(deadline));

    // пишем функцию, которая превратит нашу статичную верстку в динамичную
    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            seconds = timer.querySelector('.seconds'),
            minutes = timer.querySelector('.minutes'),
            hours = timer.querySelector('.hours'),
            timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            let t = getTimeRemaining(endTime);
            
            hours.textContent = t.hours.toString().padStart(2,0);
            // minutes.textContent = t.minutes;
            minutes.textContent = t.minutes.toString().padStart(2,0);
            seconds.textContent = t.seconds.toString().padStart(2,0);

            // вариант добавления '0' через функцию
            // function addZero(num) {
            //     if (num < 10) {
            //         return '0' + num;
            //     } else return num
            // }
            // minutes.textContent = addZero(t.minutes);


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';         
            }
        }
    }



    // создаем таймер с такими параметрами
    setClock('timer', deadline);



    // Modal popup
    let modal = document.querySelector('.overlay'),
        modalClose = document.querySelector('.popup-close'),
        btnMore = document.querySelector('.more');

    btnMore.addEventListener('click', function() {
        modal.style.display = 'block';
        this.classList.add('more-splash'); // добавление анимации
        document.body.style.overflow = 'hidden'; // запрет на прокрутку страницы
    })

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        btnMore.classList.remove('more-splash');
        document.body.style.overflow = '';
    })
    

    // ДЗ 3.15
    class Options {
            constructor(height, width, bg, fontSize, textAlign) {
                this.height = height + 'px';
                this.width = width + 'px';
                this.backgroundColor = bg;
                this.fontSize = fontSize + 'px';
                this.textAlign = textAlign;
                console.log(this);
            }
            createDiv() {
                let elem = document.createElement('div');
                document.body.appendChild(elem);
                elem.style.cssText = `height: ${this.height}; width: ${this.width}; background-Color: ${this.backgroundColor}; font-Size: ${this.fontSize}; text-align: ${this.textAlign}`;           
            }
        };

    // const newDiv = new Options(100, 100, 'yellow', 16, 'left');
    // newDiv.createDiv();

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input');

    console.log(form);
    // fetch()
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(form);
        let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            // проблема, что форма не берет input'ы
        console.log(formData);    

        fetch('https//api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User created:', data);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
    })

    // bottom Form

    let formBottom = document.getElementById('form'),
        inputBottom = formBottom.getElementsByTagName('input');

    console.log(formBottom);
    // fetch()
    formBottom.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(formBottom);
        let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            // проблема, что форма не берет input'ы
        console.log(formData);    

        fetch('https//api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User created:', data);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
    })


    // Form создаем объект с 3 свойствами-сообщениями. Он будет реализовывать реакцию программы на отправку формы пользователем

    // let message = {
    //     loading: 'Загрузка', // это будет выводиться во время загрузки формы
    //     succes: 'Спасибо! Скоро мы с вами свяжемся!', // это будет выводится при удачной отправке формы
    //     failure: 'Что-то пошло не так...' // в случае неудачной отправке
    // };
    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div'); 

    // // добавляем класс к только что созданному элементу, стили которого заранее прописаны в style.css
    // statusMessage.classList.add('status');

    // // далее навешиваем обработчик событий на ФОРМУ ('main-form') отправки, а не на кнопку. Нам нужно отслеживать когда форма отправляется
    // form.addEventListener('submit', function(event) {
    //     event.defaultPrevented();
    //     form.appendChild(statusMessage);

    //     // создаем AJAX запрос
    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //     // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //     let formData = new FormData(form);
    //     // request.send(formData);

    //     // этот участок кода добавили после очистки форм, для того чтобы преобразовать данные FormData в JSON формат
    //         let obj = {};
    //         formData.forEach(function(value, key) {
    //             obj[key] = value;
    //         });

    //         let json = JSON.stringify(obj);

    //         request.send(json);

    //         request.addEventListener('readystatechange', function() {
    //             if (request.readyState < 4) {
    //                 statusMessage.innerHTML = message.loading;
    //             } else if (request.readyState === 4 && request.status == 200) {
    //                 statusMessage.innerHTML = message.succes;
    //             } else {
    //                 statusMessage.innerHTML = message.failure;
    //             }
    //         });

    //         for (let i = 0; i<input.length; i++) {
    //             input[i].value = '';
    //         }                 
    //     });

    // let formBottom = document.getElementById('form'),
    //     inputBottom = formBottom.getElementsByTagName('input');
        
    // formBottom.addEventListener('submit', function(event) {
    //     event.defaultPrevented();
    //     formBottom.appendChild(statusMessage);   

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //     let formData = new FormData(formBottom);
    //     request.send(formData);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });

    //     let json = JSON.stringify(obj);

    //     request.send(json);

    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState = 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.succes;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i<inputBottom.length; i++) {
    //         inputBottom[i].value = '';
    //     }
    // })
});