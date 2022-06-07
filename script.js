gsap.registerPlugin(ScrollTrigger);

const APP = (function () {
  document.addEventListener("DOMContentLoaded", init);

  var scrollerElement = document.querySelector(".js-scroller");
  var homeSection = document.getElementById("home");
  var navBar = document.getElementById("nav-container");
  var menuButton = document.getElementById("menu");
  var navList = document.getElementById("nav");
  var navLinks = document.querySelectorAll(".c-nav__link");
  var menuBars = {
    first: document.querySelector(".c-hamburger-menu__bar:nth-child(1)"),
    second: document.querySelector(".c-hamburger-menu__bar:nth-child(2)"),
    third: document.querySelector(".c-hamburger-menu__bar:nth-child(3)"),
  };

  var mediaQuery = window.matchMedia("(min-width: 550px)");

  var bgTimline = gsap.timeline({
    scrollTrigger: {
      scroller: scrollerElement,
      trigger: homeSection,
      start: () => `+=${-navBar.offsetHeight}`,
      end: ScrollTrigger.maxScroll(scrollerElement),
      pin: ".c-custom-bg",
      invalidateOnRefresh: true,
      scrub: true,
      // markers: true,
    },
  });

  var navTimeline = gsap.timeline({
    scrollTrigger: {
      scroller: scrollerElement,
      trigger: homeSection,
      // start: "10%",
      start: () => `+=${0.1 * homeSection.offsetTop - navBar.offsetHeight}`,
      invalidateOnRefresh: true,
      toggleActions: "play none none reverse",
      // markers: true,
      // end: ScrollTrigger.maxScroll(document.querySelector(".js-scroller")),
    },
  });

  var homeTimeline = gsap.timeline({
    scrollTrigger: {
      scroller: scrollerElement,
      trigger: homeSection,
      // endTrigger: "#home",
      // markers: true,
      invalidateOnRefresh: true,
      start: () => `+=${-navBar.offsetHeight}`,
      // end: "bottom top",
      scrub: true,
    },
  });

  function init() {
    initializeAnim();
    screenSizeHandler(mediaQuery);
    addListeners();
  }

  function initializeAnim() {
    bgTimline
      .to(
        ".c-custom-bg__large-circle",
        {
          rotate: -10,
        },
        0
      )
      .to(
        ".c-custom-bg__small-circle",
        {
          rotate: 10,
        },
        0
      );

    navTimeline.to(
      ".navbar",
      {
        backgroundColor: "#f1f2f2",
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.25)",
      },
      0
    );

    homeTimeline
      .to(
        "#home-text",
        {
          yPercent: 75,
        },
        0
      )
      .to(
        "#home-image",
        {
          yPercent: 50,
        },
        0
      );
  }

  function refreshAnims() {
    ScrollTrigger.refresh();
  }

  function toggleMenu() {
    navList.classList.toggle(navList.classList[0] + "--visible");
    menuBars.first.classList.toggle(
      menuBars.first.classList[0] + "--rotate-top"
    );
    menuBars.second.classList.toggle(
      menuBars.second.classList[0] + "--transparent"
    );
    menuBars.third.classList.toggle(
      menuBars.third.classList[0] + "--rotate-bottom"
    );
  }

  function screenSizeHandler(event) {
    if (event.matches) {
      navList.classList.remove(navList.classList[0] + "--visible");
      menuBars.first.classList.remove(
        menuBars.first.classList[0] + "--rotate-top"
      );
      menuBars.second.classList.remove(
        menuBars.second.classList[0] + "--transparent"
      );
      menuBars.third.classList.remove(
        menuBars.third.classList[0] + "--rotate-bottom"
      );
    }
  }

  function addListeners() {
    // window.addEventListener("resize", refreshAnims);
    menuButton.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => {
      link.addEventListener("click", toggleMenu);
    });
  }
})();
