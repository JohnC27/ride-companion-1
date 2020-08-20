const container = document.querySelector(`.catalog`);
const loadingAlert = document.querySelector(`.loading-notification`);
const filterAlert = `<section class="error-notification notification alert">
  <h2 class="error-notification__title">¯\\_(ツ)_/¯ Слишком строгие фильтры</h2>
  <p class="notification__description">Под выбранные условия не подходит ни один автомобиль. Попробуйте смягчить условия или <button class="filter-notification__btn">отменить последний фильтр</button></p>
</section>`;
const errorAlert = `<section class="error-notification notification alert">
  <h2 class="error-notification__title">¯\\_(ツ)_/¯ Что-то пошло не так</h2>
  <p class="notification__description">Попробуйте перезагрузить сайт</p>
</section>`;
const offlineAlert = `<section class="offline-notification notification">
  <h3 class="offline-notification__title">📴 Офлайн</h3>
  <p class="notification__description">Кажется, вы не подключены к интернету. Проверьте подключение к вайфаю или к сети.</p>
</section>`;
const filtersForms = document.querySelectorAll(`.filter-form`);
const sortingForm = document.querySelector(`.sort-list-form`);
const dataURL = `/data.json`;


const characteristicsRu = {
  type: {
    any: `любой`,
    sedan: `седан`,
    estate: `универсал`,
    hatchback: `хэтчбек`,
    suv: `внедорожник`,
    coupe: `купе`,
    cabriolet: `кабриолет`
  },
  engine: {
    all: `все`,
    gas: `бензин`,
    diesel: `дизель`,
    electric: `электро`
  }
};

const makeImages = (images, imgAlt) => images.map((url, i) =>
  `<img src="${url}" data-i="${i + 1}" class="${images.length === 1 ? `carousel__img--single` : `carousel__img`}" alt="${imgAlt}" height="135px" width="255px">`
).join(``);

const createCarouselElement = (images, imgAlt) => `<div class="carousel">
  <div data-translate="${-224}" class="${images.length === 1 ? `carousel__list carousel__list--single` : `carousel__list`}">
    ${makeImages(images, imgAlt)}
  </div>
  ${images.length === 1 ? `` : `<button class="carousel__btn carousel__btn--left" type="button" aria-label="предыдущий слайд">
    <svg class="carousel__arrow" width="18" height="82" viewBox="0 0 18 82" fill="white"  stroke="#E0E0E0" xmlns="http://www.w3.org/2000/svg">
      <line x1="15.9391" y1="0.343582" x2="0.939123" y2="41.3436" stroke-width="2"/>
      <line x1="16.0626" y1="81.343" x2="1.0592" y2="40.3443" stroke-width="2"/>
    </svg>
  </button>
  <button class="carousel__btn carousel__btn--right" type="button" aria-label="следующий слайд">
    <svg class="carousel__arrow" width="17" height="82" viewBox="0 0 17 82" fill="white"  stroke="#E0E0E0" xmlns="http://www.w3.org/2000/svg">
      <line y1="-1" x2="43.6575" y2="-1" transform="matrix(0.343547 0.939135 0.93911 -0.343616 2.0016 0)" stroke-width="2"/>
      <line y1="-1" x2="43.6575" y2="-1" transform="matrix(0.343625 -0.939107 -0.939082 -0.343694 0.000106812 81)" stroke-width="2"/>
    </svg>
  </button>`}
</div>`;

const createCarElement = ({brand, model, images, minPrice, mileage, characteristics}) => `<article class="catalog-item">
  <h3 class="catalog-item__title"><a href="#">${brand} ${model}</a></h3>
  <p class="catalog-item__price">от ${minPrice} ₽ / мес.</p>
  ${createCarouselElement(images, `${brand} ${model}`)}
  <dl class="catalog-item__mileage">
    <dt class="catalog-item__mileage-title">Пробег</dt>
    ${!mileage.month ? `` : `<dd class="catalog-item__milage-tariff">в месяц ${mileage.month} км,</dd>`}
    ${!mileage.halfYear ? `` : `<dd class="catalog-item__milage-tariff">полгода ${mileage.halfYear} км,</dd>`}
    ${!mileage.halfYear ? `` : `<dd class="catalog-item__milage-tariff">год ${mileage.year} км</dd>`}
  </dl>
  <ul class="catalog-item__characteristics">
    ${!characteristics.type ? `` : `<li>${characteristicsRu.type[characteristics.type]}</li>`}
    ${!characteristics.engine ? `` : `<li>${characteristicsRu.engine[characteristics.engine]}</li>`}
    ${!characteristics.power ? `` : `<li>${characteristics.power} л.с.</li>`}
  </ul>
</article>`;

const createElement = (html) => {
  const template = document.createElement(`template`);
  template.innerHTML = html;

  return template.content.firstElementChild;
};

const renderTemplate = (cars) => {
  loadingAlert.remove();
  container.textContent = ``;
  if (cars.length === 0) {
    container.append(createElement(filterAlert));
    return;
  }
  const sortedCars = window.sortData(cars, document.querySelector(`input[name=sort]:checked`).id);
  sortedCars.forEach((car) => {
    container.innerHTML += createCarElement(car);
  });
  window.callCarousel();
};

window.getData(dataURL)
  .then((data) => {
    const filteredData = window.filterAll(data, document.querySelector(`input[name=type]:checked`).id, document.querySelector(`input[name=power]:checked`).id, document.querySelector(`input[name=fuel]:checked`).id, +document.querySelector(`input[name=price]`).value, document.querySelector(`input[name=class]:checked`).id);
    window.carsData = data;
    window.carsDataCopy = filteredData;
    renderTemplate(filteredData);
  })
  .catch(() => {
    loadingAlert.remove();
    container.before(createElement(errorAlert));
  });

window.addEventListener(`offline`, () => {
  container.before(createElement(offlineAlert));
});

window.addEventListener(`online`, () => {
  document.querySelector(`.offline-notification`).remove();
});

// Do filtration on change of form's inputs
filtersForms.forEach((form) => {
  form.addEventListener(`change`, () => {
    const type = document.querySelector(`input[name=type]:checked`).id;
    const power = document.querySelector(`input[name=power]:checked`).id;
    const fuel = document.querySelector(`input[name=fuel]:checked`).id;
    const price = +document.querySelector(`input[name=price]`).value;
    const carClass = document.querySelector(`input[name=class]:checked`).id;

    window.renderTemplate(window.filterAll(window.carsData, type, power, fuel, price, carClass));
    window.carsDataCopy = window.filterAll(window.carsData, type, power, fuel, price, carClass);
  });
});

// Do sorting
sortingForm.addEventListener(`change`, () => {
  const checkedInputId = document.querySelector(`input[name=sort]:checked`).id;
  renderTemplate(window.sortData(window.carsDataCopy, checkedInputId));
});

window.renderTemplate = renderTemplate;
