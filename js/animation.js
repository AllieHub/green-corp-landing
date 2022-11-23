// В секции features добавляем анимацию числа "5000+"
const INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep(i, element, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      element.innerText = i + "+";
    } else {
      element.innerText = i;
    }
    i += 100;
    const func = () => {
      increaseNumberAnimationStep(i, element, endNumber);
    };
    setTimeout(func, INCREASE_NUMBER_ANIMATION_SPEED);
  }
}

function initIncreaseNumberAnimation() {
  const element = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(0, element, 5000);
}

// initIncreaseNumberAnimation();

// Добавляем поле "Другое" и появляющееся дополнительное поле ввода в секции form с формой "Оставьте свои контакты"
document
  .querySelector("#budget")
  .addEventListener("change", function handleSelectChange(event) {
    if (event.target.value === "other") {
      const formContainer = document.createElement("div");
      formContainer.classList.add("form__group");
      formContainer.classList.add("form__other-input");

      const input = document.createElement("input");
      input.placeholder = "Введите ваш вариант";
      input.type = "text";

      formContainer.appendChild(input);

      document
        .querySelector("#form")
        .insertBefore(formContainer, document.querySelector(".form__submit"));
    }
    const otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== "other" && Boolean(otherInput)) {
      document.querySelector("#form").removeChild(otherInput);
    }
  });

let animationInited = false;
// Меняем цвет шапки с прозрачного на белый при скролле
function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("header__scrolled");
  } else {
    document.querySelector("header").classList.remove("header__scrolled");
  }

  const windowBottomPosition = window.scrollY + window.innerHeight;
  const countElementPosition = document.querySelector(
    ".features__clients-count"
  ).offsetTop;

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}
window.addEventListener("scroll", updateScroll);
