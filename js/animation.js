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
        .querySelector("#form form")
        .insertBefore(formContainer, document.querySelector(".form__submit"));
    }
    const otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== "other" && Boolean(otherInput)) {
      document.querySelector("#form form").removeChild(otherInput);
    }
  });

// Меняем цвет шапки с прозрачного на белый при скролле
let animationInited = false;
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

// Добавляем плавную анимацию для переходов по кнопкам и ссылкам
function addSmoothScroll(link) {
  link.addEventListener("click", onLinkClick);
}

function onLinkClick(event) {
  event.preventDefault();
  document.querySelector(event.target.getAttribute("href")).scrollIntoView({
    behavior: "smooth",
  });
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  addSmoothScroll(link);
  addSmoothScroll(document.querySelector(".more-button"));
});
