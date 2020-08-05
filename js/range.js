const maxValue = 200000;
const slider = document.querySelector(`.slider`);
const output = document.querySelector(`.filter-price__input`);

output.value = slider.value;

slider.oninput = function () {
  output.value = this.value;
};

output.oninput = function () {
  slider.value = this.value;
};

const moveBg = () => {
  const fill = Math.ceil(slider.value * 100 / maxValue);
  if (fill > 50) {
    slider.style.backgroundSize = `calc(${100 - fill}% + 9px) 100%`;
  } else {
    slider.style.backgroundSize = `calc(${100 - fill}% - 2px) 100%`;
  }
};

output.addEventListener(`input`, moveBg);

slider.addEventListener(`input`, moveBg);

slider.addEventListener(`change`, moveBg);

slider.addEventListener(`touchmove`, moveBg);

slider.addEventListener(`touchend`, moveBg);
