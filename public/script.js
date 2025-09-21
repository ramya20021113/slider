document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const navDots = document.querySelectorAll(".nav-dot");
  const prevArrow = document.querySelector(".arrow.prev");
  const nextArrow = document.querySelector(".arrow.next");

  let currentSlide = 0;

  // Coffee data
  const coffeeData = [
    {
      title: "Latte",
      description:
        "Latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, caffelatte or caffellatte, which means 'coffee & milk'.",
      number: "01",
    },
    {
      title: "Macchiato",
      description:
        "Caffè macchiato, sometimes called espresso macchiato, is an espresso coffee drink with a small amount of milk, usually foamed.",
      number: "02",
    },
    {
      title: "Black Coffee",
      description:
        "Delicious coffee should be simply coffee with nothing added, unless you add it yourself.",
      number: "03",
    },
    {
      title: "Espresso",
      description:
        "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans.",
      number: "04",
    },
    {
      title: "Mocha",
      description:
        "A caffè mocha, is a chocolate-flavoured variant of a caffè latte. The name is derived from the city of Mocha, Yemen, which was one of the centers of early coffee trade.",
      number: "05",
    },
  ];

  // Show specific slide
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    navDots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    navDots[index].classList.add("active");

    updateCoffeeContent(index);
    currentSlide = index;
  }

  // Update coffee content dynamically
  function updateCoffeeContent(index) {
    const coffeeTitle = document.querySelector(".coffee-title");
    const coffeeDescription = document.querySelector(".coffee-description");
    const coffeeNumber = document.querySelector(".coffee-number .num");

    if (coffeeTitle && coffeeDescription && coffeeNumber && coffeeData[index]) {
      coffeeTitle.textContent = coffeeData[index].title;
      coffeeDescription.textContent = coffeeData[index].description;
      coffeeNumber.textContent = coffeeData[index].number;
    }
  }

  // Nav dots click
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Arrows
  if (prevArrow) {
    prevArrow.addEventListener("click", () => {
      const prevIndex =
        currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      showSlide(prevIndex);
    });
  }

  if (nextArrow) {
    nextArrow.addEventListener("click", () => {
      const nextIndex =
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      showSlide(nextIndex);
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      const prevIndex =
        currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      showSlide(prevIndex);
    } else if (e.key === "ArrowRight") {
      const nextIndex =
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      showSlide(nextIndex);
    }
  });

  // Touch/swipe for mobile
  let startX = 0;
  let endX = 0;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        const nextIndex =
          currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        showSlide(nextIndex);
      } else {
        const prevIndex =
          currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        showSlide(prevIndex);
      }
    }
  }

  // Coffee beans hover effect
  const beans = document.querySelectorAll('[class*="bean"]');
  beans.forEach((bean) => {
    bean.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(180deg)";
      this.style.transition = "all 0.3s ease";
    });
    bean.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // -------------------------
  // NAV DOT POP-IN ANIMATION
  // -------------------------
  function triggerNavAnimation() {
    navDots.forEach((dot) => {
      dot.style.animation = "none"; // reset
      dot.offsetHeight; // trigger reflow
      dot.style.animation = ""; // re-apply CSS animation
    });
  }

  // Trigger animation on page load
  triggerNavAnimation();

  // Trigger animation when home section comes into view
  const homeSection = document.querySelector("#home");
  if (homeSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerNavAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(homeSection);
  }

  // -------------------------
  // Initialize slider
  // -------------------------
  showSlide(0);
});
