const menu = document.querySelector(`.menu-form`);
const filter = document.querySelector(`.filter`);
const sorting = document.querySelector(`.sort-list`);
const filterBtn = document.querySelector(`.menu__btn--filter`);
const sortingBtn = document.querySelector(`.menu__btn--sort`);

let activeBlockClass = null;

const toggleMenuState = (condition) => {
  menu.classList.toggle(`menu--fixed`, condition);
};

const toggleBlock = (blockClass, boolean) => {
  document.querySelector(`.${blockClass}`).classList.toggle(`${blockClass}--active`, boolean);
};

const toggleBtn = (btnClass, boolean) => {
  const btn = document.querySelector(`.${btnClass}`);

  btn.classList.toggle(`${btnClass}--active`, boolean);
  btn.setAttribute(`aria-expanded`, boolean);
};

window.addEventListener(`scroll`, () => {
  const isScrolledUnderMenu = pageYOffset >= menu.offsetTop - 1;
  const isMenuFixed = menu.classList.contains(`menu--fixed`);
  
  if (!isMenuFixed && isScrolledUnderMenu) {
    toggleMenuState(true);
  } else if (isMenuFixed && !isScrolledUnderMenu){
    toggleMenuState(false);
  }
  
  if (activeBlockClass) {
    const activeBtnClass = activeBlockClass === `filter` ? `menu__btn--filter` : `menu__btn--sort`;

    if (isScrolledUnderMenu) {
      toggleBlock(activeBlockClass, true);
      toggleBtn(activeBtnClass, true);
    } else {
      toggleBlock(activeBlockClass, false);
      toggleBtn(activeBtnClass, false);
    }
  }
});

const toggleBlocks = (clickedBtn) => {
  const isExpanded = clickedBtn.getAttribute(`aria-expanded`) === `true`;

  const blockClass = clickedBtn === filterBtn ? `filter` : `sort-list`;
  const clickedBtnClass = clickedBtn === filterBtn ? `menu__btn--filter` : `menu__btn--sort`;

  if (isExpanded) {
    toggleBlock(blockClass, false);
    toggleBtn(clickedBtnClass, false);
    activeBlockClass = null;
    return;
  }

  toggleBlock(blockClass, true);
  toggleBtn(clickedBtnClass, true);

  activeBlockClass = blockClass;

  if (pageYOffset <= menu.offsetTop) {
    menu.scrollIntoView();
  }

  toggleBlock(blockClass === `filter` ? `sort-list` : `filter`, false);
  toggleBtn(clickedBtnClass === `menu__btn--filter` ? `menu__btn--sort` : `menu__btn--filter`, false);
};

menu.addEventListener(`click`, (e) => {
  const clickedBtn = e.target.closest(`.menu__btn`);

  if (clickedBtn) {
    toggleBlocks(clickedBtn);
  }
});
