/*--------------- About section tabs ---------------*/
//invocamos de inmediato la función
(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    //si cotiene la clase "tab-item" y no contiene la clase "active"
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      //desactivamos si existe active "tab-item"
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      //acivamos un nuevo "tab-item"
      event.target.classList.add("active", "outer-shadow");
      //desactivamos si existe active "tab-item"
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      //acivamos un nuevo "tab-item"
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

/*--------------- Portafolio filtro y popup ---------------*/
(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector("pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /* Portafolio filtro */
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // Si "filter-item" está activo, lo desactivamos o bien le quitamos las clases
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // y a su vez, activamos un nuevo "filter-item"
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");

      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement;
      console.log(portfolioItem);

      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
    }
  });
})();
