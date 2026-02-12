(() => {
  // SP用：固定CTA（トップは intro CTA が画面外のときのみ表示、他ページは常時表示。最下部CTAで非表示）
  const introCta = document.querySelector(".section-intro__cta-link");
  const fixedCtaBar = document.getElementById("fixed-cta-bar");
  const bottomCtaSection = document.querySelector(".section-cta");
  const spMatch = window.matchMedia("(max-width: 932px)");

  if (fixedCtaBar && bottomCtaSection) {
    let introVisible = true;
    let ctaSectionVisible = false;

    const updateFixedCta = () => {
      const show = introCta ? !introVisible && !ctaSectionVisible : !ctaSectionVisible;
      fixedCtaBar.classList.toggle("is-visible", show);
      fixedCtaBar.setAttribute("aria-hidden", show ? "false" : "true");
    };

    const observerOptions = { root: null, rootMargin: "0px", threshold: 0 };
    const ctaSectionObserverOptions = { root: null, rootMargin: "0px 0px -20% 0px", threshold: 0 };

    const introObserver = introCta ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        introVisible = entry.isIntersecting;
        updateFixedCta();
      });
    }, observerOptions) : null;

    const ctaSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const pastSection = rect.top < 0;
        ctaSectionVisible = entry.isIntersecting || pastSection;
        updateFixedCta();
      });
    }, ctaSectionObserverOptions);

    const attachObservers = () => {
      if (spMatch.matches) {
        if (introObserver && introCta) introObserver.observe(introCta);
        ctaSectionObserver.observe(bottomCtaSection);
        updateFixedCta();
      } else {
        if (introObserver && introCta) introObserver.disconnect();
        ctaSectionObserver.disconnect();
        fixedCtaBar.classList.remove("is-visible");
        fixedCtaBar.setAttribute("aria-hidden", "true");
      }
    };

    spMatch.addEventListener("change", attachObservers);
    attachObservers();
  }

  // News tab filtering
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  const cards = Array.from(document.querySelectorAll(".news-card"));

  const setActive = (btn) => {
    buttons.forEach((b) => b.classList.toggle("is-active", b === btn));
  };

  const filterCards = (filter) => {
    cards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const show = filter === "all" || cat === filter;
      card.style.display = show ? "" : "none";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";
      setActive(btn);
      filterCards(filter);
    });
  });

  // SP Menu toggle
  const menuToggle = document.querySelector(".site-header__menu-toggle");
  const nav = document.querySelector(".site-header__nav");
  const headerInner = document.querySelector(".site-header__inner");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      nav.classList.toggle("is-open");
      if (headerInner) {
        headerInner.classList.toggle("has-menu-open");
      }
      // メニューが開いているときはbodyのスクロールを無効化
      if (!isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // メニューリンクをクリックしたときにメニューを閉じる
    const navLinks = nav.querySelectorAll(".site-header__nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        if (headerInner) {
          headerInner.classList.remove("has-menu-open");
        }
        document.body.style.overflow = "";
      });
    });
  }
})();

