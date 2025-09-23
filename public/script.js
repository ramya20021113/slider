document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const navDots = document.querySelectorAll(".nav-dot");

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

 function showSlide(index) {
   if (index === currentSlide) return; // prevent duplicate clicks

   const current = slides[currentSlide];
   const next = slides[index];

   // Exit current slide
   current.classList.add("exit");

   current.addEventListener(
     "animationend",
     () => {
       // Hide current slide
       current.classList.remove("active", "exit");

       // Show next slide immediately
       next.classList.add("active");
       navDots.forEach((dot) => dot.classList.remove("active"));
       navDots[index].classList.add("active");

       updateCoffeeContent(index);
       currentSlide = index;

       // Animate right-side elements slowly (1s)
       animateRightElements(next, 3); // pass duration in seconds
     },
     { once: true }
   );
 }

 


  //next pre
  // Select arrows
  const prevArrow = document.querySelector(".arrow.prev");
  const nextArrow = document.querySelector(".arrow.next");

  // Prev arrow click
  prevArrow.addEventListener("click", (e) => {
    e.preventDefault();
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(prevIndex); // calls your existing showSlide
  });

  // Next arrow click
  nextArrow.addEventListener("click", (e) => {
    e.preventDefault();
    const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(nextIndex); // calls your existing showSlide
  });

  //content

function updateCoffeeContent(index) {
  const items = document.querySelectorAll(".coffee-content");
  items.forEach((item) => {
    item.style.display = "none";
    // Reset animations
    const number = item.querySelector(".coffee-number");
    const title = item.querySelector(".coffee-title");
    const description = item.querySelector(".coffee-description");
    const btn = item.querySelector(".order-btn");

    [number, title, description, btn].forEach((el) => {
      if (el) {
        el.style.animation = "none"; // reset
        void el.offsetWidth; // force reflow
        // reapply animation
        if (el.classList.contains("coffee-number"))
          el.style.animation = "numberSlideIn 1s ease-out forwards";
        if (el.classList.contains("coffee-title"))
          el.style.animation = "titleSlideIn 1s ease-out forwards";
        if (el.classList.contains("coffee-description"))
          el.style.animation = "descriptionFadeIn 1s ease-out forwards";
        if (el.classList.contains("order-btn"))
          el.style.animation = "descriptionFadeIn 1s ease-out forwards";
      }
    });
  });

  // Show current slide
  const current = items[index];
  current.style.display = "flex";
}


  // Nav dots click
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Trigger initial animation
  triggerNavAnimation();

  // Hide nav dots after 2 seconds
  const navigation = document.querySelector(".navigation");
  setTimeout(() => {
    // Add fade-out effect
    navigation.style.opacity = "0";
    navigation.style.pointerEvents = "none"; // optional: disable clicks
  }, 2000);

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
});
