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
      tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      //acivamos un nuevo "tab-item"
      event.target.classList.add("active", "outer-shadow")
      //desactivamos si existe active "tab-item"
      aboutSection.querySelector(".tab-content.active").classList.remove("active");
      //acivamos un nuevo "tab-item"
      aboutSection.querySelector(target).classList.add("active")
    }
  });
})();
