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
    let deadline = '2025-07-08';
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

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(form);
        // let obj = {};
        //     formData.forEach(function(value, key) {
        //         obj[key] = value;
        //     });
            // проблема, что форма не берет input'ы
        console.log(formData);
        console.log(Object.fromEntries(formData));   

        fetch('https://jsonplaceholder.typicode.com/todos/1', {
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
    formBottom.addEventListener('submit', function(event) {
        event.preventDefault();
        let formData = new FormData(formBottom);
        console.log(Object.fromEntries(formData));  

        fetch('https://jsonplaceholder.typicode.com/todos/1', {
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

    // SLIDER
    let slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot'),
        slideIndex = 3; // параметр текущего слайда

        showSlides(slideIndex);
    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        };
        if (n < 1) {
            slideIndex = slides.length;
        };


        slides.forEach((item) => item.style.display = 'none'); // прячем все слайды
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // } // другой - более старый вариант
        dots.forEach((item) => item.classList.remove('dot-active')); // все точки деактивируем (убираем класс active)

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    // мой Вариант работы кнопок слайдера
    // next.addEventListener('click', function() {
    //     if (slideIndex < 4) {
    //     slideIndex = slideIndex + 1;
    //     showSlides(slideIndex);
    //     } else {slideIndex = 1;
    //         showSlides(slideIndex);
    //     };
    // })
    // prev.addEventListener('click', function() {
    //     if (slideIndex > 1) {
    //     slideIndex = slideIndex - 1;
    //     showSlides(slideIndex);
    //     } else {slideIndex = 4;
    //         showSlides(slideIndex);
    //     };
    // })

    function plusSlides(n) {
        showSlides(slideIndex += n);
    };
    function currentSlide(n) {
        showSlides(slideIndex = n);
    };
    
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    // ниже пишем функционал для точек. Используем делегирование событий, для чего дописываем в аргумент функции - event
    dotsWrap.addEventListener('click', function(event) {
        // пишем код который переберет точки и найдет ту, на которую кликнули
        for (let i = 0; i < dots.length + 1; i++) {
            // испотзуем делегирование событий
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //КАЛЬКУЛЯТОР мой вариант
    let totalField = document.querySelector('#total'),
        days = document.querySelectorAll('.counter-block-input')[1],
        mans = document.querySelectorAll('.counter-block-input')[0],
        selectBase = document.querySelector('#select'),
        tarif = 4000;

    selectBase.addEventListener('change', function() {
        calcu();
    })
    days.addEventListener('input', function() {
        calcu();
    });
    mans.addEventListener('input', function() {
        calcu();
    });

    function calcu() {
        let sum = +days.value * +mans.value * +selectBase.value * tarif;
        totalField.textContent = sum;
    };

    // КАЛЬКУЛЯТОР вариант Ивана
    // let persons = document.querySelectorAll('.counter-block-input')[0],
    //         restDays = document.querySelectorAll('.counter-block-input')[1],
    //         place = document.getElementById('select'),
    //         totalValue = document.getElementById('total'),
    //         personsSum = 0,
    //         daysSum = 0,
    //         total = 0;

    //     totalValue.innerHTML = 0;

    //     persons.addEventListener('change', function() {
    //         personsSum = +this.value;
    //         total = (daysSum + personsSum)*4000;

    //         if(restDays.value == '') {
    //             totalValue.innerHTML = 0;
    //         } else {
    //             totalValue.innerHTML = total;
    //         }
    //     });

    //     restDays.addEventListener('change', function() {
    //         daysSum = +this.value;
    //         total = (daysSum + personsSum)*4000;

    //         if(persons.value == '') {
    //             totalValue.innerHTML = 0;
    //         } else {
    //             totalValue.innerHTML = total;
    //         }
    //     });

    //     place.addEventListener('change', function() {
    //         if (restDays.value == '' || persons.value == '') {
    //             totalValue.innerHTML = 0;
    //         } else {
    //             let a = total;
    //             totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    //         }
    //     });
});