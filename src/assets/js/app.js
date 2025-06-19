document.addEventListener("DOMContentLoaded", () => {
    //= utils/

    const isMobile = new State(matchMedia("(max-width: 500px)").matches);

    window.addEventListener('optimizedResize', () => {
        const sm = matchMedia("(max-width: 500px)").matches;
        if (sm !== isMobile.get()) isMobile.set(sm);
    });

    //= modules/

    // > Модалки
    const modals = {
        burger: new Modal('#modal-burger'),
    };

    isMobile.subscribe(() => {
        for (let modal in modals) {
            modals[modal].close();
        }
    });
    // < ---

    // > Кнопки навигации в бургере и футере на мобилке
    const mobileNavButtons = document.querySelectorAll('.modal-burger .nav__list-item-button, .footer .nav__list-item-button');
    mobileNavButtons.forEach((node) => {
        const parent = node.parentElement;

        node.addEventListener('click', () => {
            parent.classList.toggle('nav__list-item--open');
        });
    });
    // < ---
    const orderBtn = document.getElementById('order-btn')
    if(orderBtn){
        orderBtn.addEventListener('click',()=>{
            const section = document.getElementById('order-section');
            section.scrollIntoView({ behavior: 'smooth' });
        })
    }

    // ---> логика select
    const selectBox = document.getElementById("systemSelect");
    const hiddenInput = document.getElementById("selectedSystem");
    const error = document.getElementById("selectError");
    const form = document.querySelector(".order__form");

    if (selectBox && hiddenInput && error && form) {
        const trigger = selectBox.querySelector(".select__trigger");
        const options = selectBox.querySelectorAll(".select__option");

        if (trigger) {
            trigger.addEventListener("click", () => {
                selectBox.classList.toggle("select__box--open");
            });
        }

        options.forEach(option => {
            option.addEventListener("click", () => {
                if (trigger) {
                    trigger.innerHTML = `
                    ${option.textContent}
                    <svg class="icon">
                        <use href="#select-arrow"></use>
                    </svg>
                `;
                }

                hiddenInput.value = option.dataset.value;
                selectBox.classList.remove("select__box--open", "select__box--error");
                error.style.display = "none";
            });
        });

        document.addEventListener("click", e => {
            if (!selectBox.contains(e.target)) {
                selectBox.classList.remove("select__box--open");
            }
        });
    }
    // <---

    // ---> slider
    const slider = document.querySelector('.slider-wrapper input');
    const valueLabel = document.querySelector('.slider-value');
    const wrapper = document.querySelector('.slider-wrapper');

    if (slider && valueLabel && wrapper) {
        slider.addEventListener('input', () => {
            valueLabel.textContent = `${slider.value}%`;
            wrapper.classList.remove('error');
        });
    }
    // <---

    // ---> файл
    const fileInput = document.querySelector('.attach-btn__input');
    const labelSpan = document.querySelector('.attach-btn span');

    if (fileInput && labelSpan) {
        fileInput.addEventListener('change', () => {
            const fileName = fileInput.files[0]?.name || 'Прикрепить файл';
            labelSpan.textContent = fileName;
        });
    }
    // <---

    // ---> валидация
    const emailInput = form.querySelector('input[name="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const emailWrapper = emailInput.closest('.input');
    const nameWrapper = nameInput.closest('.input');
    const emailError = emailWrapper.querySelector('[data-error-for="email"]');
    const nameError = nameWrapper.querySelector('[data-error-for="name"]');
    const successMessage = document.querySelector(".form-success");

    nameInput.addEventListener('input', () => {
        const length = nameInput.value.trim().length;
        if (length > 20) {
            nameWrapper.classList.add('error');
            nameError.textContent = 'Имя не должно превышать 20 символов';
        } else {
            nameWrapper.classList.remove('error');
        }
    });

    // <-- отправка формы

    form.addEventListener("submit", e => {
        e.preventDefault();
        let isValid = true;

        // Селект
        if (!hiddenInput.value) {
            selectBox.classList.add("select__box--error");
            error.style.display = "block";
            isValid = false;
        }

        // Слайдер
        const sliderValue = slider?.value;
        if (!sliderValue || isNaN(sliderValue)) {
            wrapper.classList.add('error');
            isValid = false;
        }

        // Email
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailValue)) {
            emailWrapper.classList.add('error');
            isValid = false;
        } else {
            emailWrapper.classList.remove('error');
        }

        // Name
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 3 || nameValue.length > 20) {
            nameWrapper.classList.add('error');
            if (nameValue.length > 20) {
                nameError.textContent = 'Имя не должно превышать 20 символов';
            } else {
                nameError.textContent = 'Имя должно быть от 3 до 20 символов';
            }
            isValid = false;
        } else {
            nameWrapper.classList.remove('error');
        }

        if (!isValid) return;

        // Сбор данных
        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = key === "document" ? (value instanceof File && value.name ? value : null) : value;
        });

        console.log(data);
        if (successMessage) {
            successMessage.classList.add("show");

            setTimeout(() => {
                successMessage.classList.remove("show");
            }, 3000);
        }

        form.reset();

        valueLabel.textContent='0%';

        trigger.innerHTML = `
          Выберите тип системы
          <svg class="icon">
            <use href="#select-arrow"></use>
          </svg>
        `;
        hiddenInput.value = "";

        if (slider && valueLabel) {
            slider.value = 0;
            valueLabel.textContent = "0%";
        }

        if (labelSpan) {
            labelSpan.textContent = "Прикрепить файл";
        }

    });
    // <---
});
