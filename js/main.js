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

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*--------------- Portafolio filtro y popup ---------------*/
(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
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
      // Obtenemos el index de portfolioItem
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // Convertimos las screenshots en un array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // activar el loader hasta que se cargue las imágenes de popup
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // desactivar el loader después de que se carguen las img de popup
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " de " + screenshots.length;
  }

  // Next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // Prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    // Si portfolio-item-title no existe
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-title")) {
      projectDetailsBtn.style.display = "none";
      return; // Fin de la función, deja de ejecutarse
    }
    projectDetailsBtn.style.display = "block";

    // Obtenemos el detalle del proyecto
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    // Establecemos los detalles del proyecto
    popup.querySelector(".pp-project-details").innerHTML = details;
    // Obtenemos el título del proyecto
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // Establecemos el título del proyecto
    popup.querySelector(".pp-title h2").innerHTML = title;
    // Obtenemos la categoría del proyecto
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // Establecemos la categoría del proyecto
    popup.querySelector(".pp-project-category").innerHTML = category;
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

/*--------------- Testimonial slider ---------------*/
(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // establecemos el ancho de todos los slider
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // establecemos el ancho del sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // Desactivamos la clase "active" si existe
    sliderContainer.querySelector(".testi-item.active").classList.remove("active");
    // Activamos un nuevo slide
    slides[slideIndex].classList.add("active")
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();
