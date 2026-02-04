(() => {
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

