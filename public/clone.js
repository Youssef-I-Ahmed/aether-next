(() => {
  "use strict";

  const root = document.documentElement;
  const arabic = root.lang === "ar";
  const locale = arabic ? "ar-EG" : "en-US";
  const prefix = arabic ? "" : "/en";
  const path = location.pathname.replace(/^\/en(?=\/|$)/, "").replace(/\/$/, "") || "/";
  const copy = (ar, en) => arabic ? ar : en;
  const all = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const text = (node) => node.textContent.trim().replace(/\s+/g, " ");

  function route(slug) {
    return prefix + (prefix && slug.startsWith("/#") ? slug.slice(1) : slug);
  }

  function element(tag, className = "", content = "") {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = content;
    return node;
  }

  // Captured utility classes can override the browser's hidden rule.
  document.head.append(element("style", "", "[hidden]:not([hidden=until-found]) { display: none !important; }"));

  function link(label, slug, classes) {
    const node = element("a", classes, label);
    node.href = route(slug);
    return node;
  }

  function status(container, message, isError = false) {
    let notice = container.querySelector(":scope > [data-clone-status]");
    if (!notice) {
      notice = element("p", "rounded-xl border border-line bg-elevated p-3 text-sm text-ink");
      notice.dataset.cloneStatus = "";
      container.append(notice);
    }
    notice.setAttribute("role", isError ? "alert" : "status");
    notice.textContent = message;
    return notice;
  }

  const localNotice = copy(
    "دي نسخة تجريبية محلية. لم تُرسل البيانات.",
    "This is a local preview. Your details were not sent."
  );

  const menuGroups = [
    [
      [copy("المواقع والمتاجر", "Websites and stores"), [
        ["web-development", "تصميم مواقع الشركات", "Company websites"],
        ["ecommerce", "المتاجر الإلكترونية", "E-commerce stores"],
        ["landing-pages", "صفحات الهبوط", "Landing pages"],
        ["web-platforms", "المنصات والبوابات", "Web platforms and portals"],
        ["clone-platforms", "منصات مثل حراج وطلبات", "Marketplaces and platforms"],
        ["website-redesign", "إعادة تصميم المواقع", "Website redesign"],
        ["seo", "تحسين محركات البحث SEO", "Search engine optimization"],
      ]],
      [copy("التطبيقات والأنظمة", "Apps and systems"), [
        ["mobile-development", "تطبيقات الجوال", "Mobile apps"],
        ["delivery-apps", "تطبيقات التوصيل", "Delivery apps"],
        ["erp", "نظام ERP", "ERP systems"],
        ["crm", "نظام CRM", "CRM systems"],
        ["quotation-invoicing-system", "عروض الأسعار والفواتير", "Quotes and invoices"],
        ["inventory-management", "إدارة المخزون", "Inventory management"],
        ["hr-payroll-system", "الموارد البشرية والرواتب", "HR and payroll"],
        ["booking-system", "الحجوزات والمواعيد", "Bookings and appointments"],
      ]],
      [copy("الذكاء الاصطناعي والأتمتة", "AI and automation"), [
        ["ai-solutions", "حلول الذكاء الاصطناعي", "AI solutions"],
        ["whatsapp-ai-agent", "موظف رقمي على واتساب", "WhatsApp AI agent"],
        ["website-chatbot", "موظف رقمي للموقع", "Website chatbot"],
        ["voice-ai-agent", "وكيل صوتي ذكي", "AI voice agent"],
        ["automation", "أتمتة سير العمل", "Workflow automation"],
        ["document-ai", "معالجة المستندات", "Document processing"],
        ["computer-vision", "الرؤية الحاسوبية", "Computer vision"],
        ["business-dashboards", "لوحات المؤشرات", "Business dashboards"],
      ]],
      [copy("الدعم والاستشارات", "Support and consulting"), [
        ["maintenance-support", "الصيانة والدعم الفني", "Maintenance and support"],
        ["hosting-servers", "الاستضافة والسيرفرات", "Hosting and servers"],
        ["cybersecurity", "أمن المواقع والأنظمة", "Website and system security"],
        ["mvp-development", "MVP للشركات الناشئة", "Startup MVPs"],
        ["dedicated-team", "فريق تطوير مخصص", "Dedicated development teams"],
        ["free-consultation", "استشارة تقنية مجانية", "Free technical consultation"],
      ]],
    ].map(([label, entries]) => [label, entries.map(([slug, ar, en]) => ["/services/" + slug, ar, en])]),
    [
      ["", [
        ["/prices/website-design-cost", "تكلفة تصميم موقع", "Website design cost"],
        ["/prices/ecommerce-store-cost", "تكلفة متجر إلكتروني", "Online store cost"],
        ["/prices/mobile-app-cost", "تكلفة تطبيق جوال", "Mobile app cost"],
        ["/prices/app-like-hungerstation-cost", "تكلفة تطبيق توصيل", "Delivery app cost"],
      ]],
      ["", [
        ["/prices/erp-cost", "تكلفة نظام ERP", "ERP system cost"],
        ["/prices/crm-cost", "تكلفة نظام CRM", "CRM system cost"],
        ["/prices/whatsapp-bot-cost", "تكلفة الموظف الرقمي على واتساب", "WhatsApp agent cost"],
        ["/prices/software-maintenance-cost", "تكلفة الصيانة", "Software maintenance cost"],
      ]],
    ],
    [
      ["AETHER", [
        ["/about", "من نحن", "About us"],
        ["/portfolio", "أعمالنا", "Our work"],
        ["/meeting", "احجز استشارة", "Book a consultation"],
      ]],
      [copy("أدلة المشتري", "Buyer's guides"), [
        ["/guides", "أدلة المشتري", "Buyer's guides"],
        ["/guides/how-to-choose-software-company", "كيف تختار شركة برمجة", "How to choose a software company"],
        ["/technologies", "التقنيات", "Technologies"],
        ["/tools/project-cost-calculator", "حاسبة تكلفة المشروع", "Project cost calculator"],
        ["/#faq", "الأسئلة الشائعة", "Frequently asked questions"],
        ["/contact", "تواصل معنا", "Contact us"],
      ]],
      [copy("أسواق نخدمها", "Where we work"), [
        ["/egypt", "مصر", "Egypt"],
        ["/saudi-arabia", "السعودية", "Saudi Arabia"],
        ["/uae", "الإمارات", "United Arab Emirates"],
        ["/kuwait", "الكويت", "Kuwait"],
        ["/qatar", "قطر", "Qatar"],
        ["/bahrain", "البحرين", "Bahrain"],
        ["/oman", "عُمان", "Oman"],
        ["/jordan", "الأردن", "Jordan"],
        ["/iraq", "العراق", "Iraq"],
        ["/#markets", "باقي أسواق المنطقة", "More MENA markets"],
      ]],
    ],
  ];

  const menuLabels = [
    copy("الخدمات", "Services"),
    copy("الأسعار", "Pricing"),
    copy("المزيد", "More"),
  ];
  const menuLinkClasses = "block rounded-lg px-3 py-2 text-sm text-ink-body hover:bg-fg/[0.06] hover:text-ink";

  function menuContent(index) {
    const grid = element("div", "grid gap-4 sm:grid-cols-2 lg:grid-cols-4");
    for (const [heading, entries] of menuGroups[index]) {
      const group = element("div");
      if (heading) group.append(element("p", "mb-2 px-3 text-sm font-bold text-ink", heading));
      for (const [slug, ar, en] of entries) group.append(link(copy(ar, en), slug, menuLinkClasses));
      grid.append(group);
    }
    const panel = element("div");
    panel.append(grid);
    if (index < 2) {
      panel.append(link(
        index === 0 ? copy("كل الخدمات", "All services") : copy("كل أدلة الأسعار", "All pricing guides"),
        index === 0 ? "/services" : "/prices",
        "mt-3 inline-flex rounded-full border border-fg/15 px-4 py-2 text-sm font-semibold text-ink hover:border-accent"
      ));
    }
    return panel;
  }

  function initNavigation() {
    const header = document.querySelector("[data-site-nav]");
    const nav = header?.querySelector("nav");
    if (!nav) return;

    const desktop = all(":scope > ul button[aria-expanded]", nav);
    const mobile = nav.querySelector(":scope > div > button[aria-expanded]");
    const themeButton = nav.querySelector("button[title]");
    const language = nav.querySelector('a[aria-label="English version"],a[aria-label="النسخة العربية"],a[hreflang]');
    const portal = nav.querySelector('a[href$="/client"]');
    const hero = document.querySelector("#hero[data-theme]");
    let openButton = null;
    let panel = null;
    const colorScheme = matchMedia("(prefers-color-scheme: dark)");
    let selectedTheme = colorScheme.matches ? "dark" : "light";
    let manualTheme = false;
    try {
      const savedTheme = localStorage.getItem("fortunecode-preview-theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        selectedTheme = savedTheme;
        manualTheme = true;
      }
    } catch {
      // The preview still works when browser storage is disabled.
    }

    function syncNavTheme() {
      const overHero = !openButton && hero && hero.getBoundingClientRect().bottom > nav.getBoundingClientRect().bottom;
      nav.dataset.theme = overHero ? "dark" : selectedTheme;
      for (const style of ["bg-black/60", "md:bg-black/35", "md:backdrop-blur-md"]) {
        nav.classList.toggle(style, Boolean(overHero));
      }
      nav.classList.toggle("bg-elevated", !overHero);
      nav.classList.toggle("shadow-soft", !overHero);
    }

    function applyTheme() {
      root.dataset.theme = selectedTheme;
      const dark = selectedTheme === "dark";
      const label = dark
        ? copy("التبديل إلى الوضع الفاتح", "Switch to light mode")
        : copy("التبديل إلى الوضع الداكن", "Switch to dark mode");
      if (themeButton) {
        themeButton.title = label;
        themeButton.setAttribute("aria-label", label);
        themeButton.querySelector(".lucide-sun")?.style.setProperty("display", dark ? "block" : "none");
        themeButton.querySelector(".lucide-moon")?.style.setProperty("display", dark ? "none" : "block");
      }
      syncNavTheme();
    }

    function toggleTheme() {
      selectedTheme = selectedTheme === "dark" ? "light" : "dark";
      manualTheme = true;
      try {
        localStorage.setItem("fortunecode-preview-theme", selectedTheme);
      } catch {
        // A theme change still applies to this page.
      }
      applyTheme();
    }

    function setMobileOpen(open) {
      mobile.setAttribute("aria-label", open ? copy("إغلاق القائمة", "Close menu") : copy("القائمة", "Menu"));
      const [top, bottom] = all("span", mobile);
      if (top) top.style.transform = open ? "translateY(3.5px) rotate(45deg)" : "";
      if (bottom) bottom.style.transform = open ? "translateY(-3.5px) rotate(-45deg)" : "";
    }

    function closeMenu(returnFocus = false) {
      if (!openButton) return;
      openButton.setAttribute("aria-expanded", "false");
      if (openButton === mobile) setMobileOpen(false);
      if (returnFocus) openButton.focus();
      openButton = null;
      panel?.remove();
      panel = null;
      syncNavTheme();
    }

    function showMenu(button, content) {
      const wasOpen = openButton === button;
      closeMenu();
      if (wasOpen) return;
      openButton = button;
      panel = content;
      panel.id = "clone-navigation-panel";
      button.setAttribute("aria-controls", panel.id);
      button.setAttribute("aria-expanded", "true");
      header.append(panel);
      if (button === mobile) setMobileOpen(true);
      syncNavTheme();
    }

    desktop.forEach((button, index) => {
      button.addEventListener("click", () => {
        const content = menuContent(index);
        content.className = "pointer-events-auto mx-auto mt-2 hidden max-h-[70dvh] max-w-6xl overflow-auto rounded-3xl border border-fg/10 bg-elevated p-5 shadow-2xl lg:block";
        showMenu(button, content);
      });
    });

    mobile?.addEventListener("click", () => {
      const content = element("div", "pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-fg/10 bg-elevated p-3 shadow-2xl lg:hidden");
      const mobileLink = "flex min-h-12 items-center rounded-xl px-4 text-sm font-medium text-ink hover:bg-fg/[0.06]";
      const sections = menuLabels.map((label, index) => {
        const details = element("details", "group rounded-xl");
        const summary = element("summary", mobileLink + " cursor-pointer list-none justify-between [&::-webkit-details-marker]:hidden", label);
        const chevron = desktop[index]?.querySelector("svg")?.cloneNode(true);
        if (chevron) {
          chevron.classList.add("group-open:rotate-180", "text-ink-muted");
          summary.append(chevron);
        }
        details.append(summary, menuContent(index));
        return details;
      });
      const mobileTheme = element("button", "grid h-11 w-11 place-items-center rounded-full text-ink-muted hover:bg-fg/[0.06]");
      mobileTheme.type = "button";
      function syncMobileThemeButton() {
        const icon = themeButton?.querySelector(selectedTheme === "dark" ? ".lucide-sun" : ".lucide-moon")?.cloneNode(true);
        if (icon) {
          icon.style.display = "block";
          mobileTheme.replaceChildren(icon);
        }
        mobileTheme.setAttribute("aria-label", themeButton?.title || copy("تبديل المظهر", "Switch theme"));
      }
      syncMobileThemeButton();
      mobileTheme.addEventListener("click", () => {
        toggleTheme();
        syncMobileThemeButton();
      });
      const mobileLanguage = language?.cloneNode(false) || element("a");
      mobileLanguage.className = "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-ink-muted hover:bg-fg/[0.06]";
      mobileLanguage.textContent = copy("English", "العربية");
      mobileLanguage.href = language?.href || (arabic ? "/en" : "/");
      const bottom = element("div", "mt-2 flex items-center justify-between border-t border-fg/10 pt-2");
      bottom.append(mobileLanguage, mobileTheme);
      content.append(
        sections[0],
        link(copy("أعمالنا", "Our work"), "/portfolio", mobileLink),
        sections[1],
        sections[2]
      );
      if (portal?.hasAttribute("href")) {
        const mobilePortal = portal.cloneNode(true);
        mobilePortal.className = mobileLink;
        content.append(mobilePortal);
      }
      content.append(link(
        copy("ابدأ مشروعك", "Start a project"),
        "/#start",
        "mt-2 flex min-h-12 items-center justify-center rounded-xl bg-[#A384FF] px-4 text-sm font-bold text-[#121416]"
      ), bottom);
      showMenu(mobile, content);
    });

    header.addEventListener("click", (event) => {
      if (panel?.contains(event.target) && event.target.closest("a")) closeMenu();
    });
    document.addEventListener("pointerdown", (event) => {
      if (!header.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu(true);
    });
    matchMedia("(min-width: 1024px)").addEventListener("change", () => closeMenu());
    colorScheme.addEventListener("change", (event) => {
      if (manualTheme) return;
      selectedTheme = event.matches ? "dark" : "light";
      applyTheme();
    });
    if (hero) addEventListener("scroll", syncNavTheme, {passive: true});
    themeButton?.addEventListener("click", toggleTheme);
    applyTheme();
  }

  function initCarousels() {
    for (const id of ["projects", "testimonials"]) {
      const section = document.getElementById(id);
      const track = section?.querySelector('[class~="snap-x"]');
      if (!track) continue;

      all(":scope > [aria-hidden=true]", track).forEach((duplicate) => duplicate.remove());
      const cards = [...track.children];
      if (!cards.length) continue;
      track.scrollLeft = 0;

      all("button[aria-label]", section).forEach((button) => {
        const previous = ["السابق", "Previous"].includes(button.getAttribute("aria-label"));
        if (!previous && !["التالي", "Next"].includes(button.getAttribute("aria-label"))) return;
        button.addEventListener("click", () => {
          const rtl = getComputedStyle(track).direction === "rtl";
          const sign = rtl ? -1 : 1;
          const current = sign * track.scrollLeft;
          const max = track.scrollWidth - track.clientWidth;
          const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
          const step = cards[0].getBoundingClientRect().width + gap;
          let destination = current + (previous ? -step : step);
          if (previous && current <= 2) destination = max;
          if (!previous && current >= max - 2) destination = 0;
          track.scrollTo({
            left: sign * Math.max(0, Math.min(max, destination)),
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          });
        });
      });
    }
  }

  function initFaq() {
    const accordion = document.getElementById("faq");
    if (!accordion) return;
    const buttons = all("button[aria-expanded]", accordion);
    if (!buttons.length) return;
    const questions = new Map();
    for (const script of all('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent);
        for (const item of data["@graph"] || [data]) {
          if (item["@type"] !== "FAQPage") continue;
          for (const question of item.mainEntity || []) {
            questions.set(question.name.trim(), question.acceptedAnswer?.text);
          }
        }
      } catch {
        // Other structured data is irrelevant to the accordion.
      }
    }
    for (const [index, button] of buttons.entries()) {
      const question = text(button.querySelector("span") || button);
      const answer = questions.get(question) || [...questions.values()][index];
      if (!answer) continue;
      const paragraph = element("p", "pb-2 pt-2 text-sm leading-7 text-ink-body", answer);
      paragraph.id = "clone-faq-" + index;
      paragraph.hidden = true;
      button.setAttribute("aria-controls", paragraph.id);
      button.after(paragraph);
      button.addEventListener("click", () => {
        const opening = button.getAttribute("aria-expanded") !== "true";
        for (const other of buttons) {
          const open = opening && other === button;
          other.setAttribute("aria-expanded", String(open));
          const answer = document.getElementById(other.getAttribute("aria-controls"));
          if (answer) answer.hidden = !open;
          const icon = other.lastElementChild;
          if (icon) icon.textContent = open ? "−" : "+";
        }
      });
    }
  }

  function initProcess() {
    const process = document.getElementById("process");
    const buttons = process ? all("ol > li > button", process) : [];
    if (!buttons.length) return;
    const steps = buttons.map((button) => button.parentElement);
    const routeTiles = all(".aether-route-step", process);
    const rail = process.querySelector("[data-route-rail]");
    const summary = all('p[class~="text-ink-muted"]', process)
      .filter((paragraph) => /^(المرحلة|Phase)\s/i.test(text(paragraph)) && paragraph.querySelector("span"));
    let currentStep = -1;
    let scrollStep = -1;
    let frame = 0;

    function paintRail() {
      if (!rail) return;
      const length = steps.at(-1).offsetTop;
      rail.style.setProperty("--route-length", `${length}px`);
      rail.style.setProperty("--route-progress", String(length ? steps[currentStep].offsetTop / length : 0));
    }

    function setStep(index) {
      if (index === currentStep) return;
      currentStep = index;
      buttons.forEach((other, position) => {
        const current = position === index;
        if (current) other.setAttribute("aria-current", "step");
        else other.removeAttribute("aria-current");
        for (const style of ["scale-110", "border-accent", "bg-accent", "text-[#121416]"]) {
          other.classList.toggle(style, current);
        }
        for (const style of ["border-fg/15", "bg-canvas", "text-ink-muted"]) {
          other.classList.toggle(style, !current);
        }
        other.nextElementSibling?.classList.toggle("border-accent/50", current);
        other.nextElementSibling?.classList.toggle("border-fg/10", !current);
        other.nextElementSibling?.classList.toggle("opacity-70", !current);
      });
      routeTiles.forEach((tile) => {
        const position = Number(tile.dataset.step);
        tile.dataset.state = position === index ? "active" : position < index ? "done" : "pending";
      });
      const title = text(buttons[index].nextElementSibling.querySelector("h3"));
      summary.forEach((paragraph) => {
        const name = paragraph.querySelector("span");
        name.textContent = title;
        paragraph.replaceChildren(copy(
          `المرحلة ${index + 1} من ${buttons.length}: `,
          `Phase ${index + 1} of ${buttons.length}: `
        ), name);
      });
      paintRail();
    }

    function followScroll() {
      frame = 0;
      const marker = innerHeight * .55;
      const bounds = process.getBoundingClientRect();
      if (bounds.top > marker || bounds.bottom < marker) return;
      const index = Math.max(0, steps.findLastIndex((step) => step.getBoundingClientRect().top <= marker));
      if (index === scrollStep) return;
      scrollStep = index;
      setStep(index);
    }

    function requestScrollUpdate() {
      if (!frame) frame = requestAnimationFrame(followScroll);
    }

    buttons.forEach((button, index) => button.addEventListener("click", () => setStep(index)));
    setStep(0);
    addEventListener("scroll", requestScrollUpdate, { passive: true });
    addEventListener("resize", () => {
      paintRail();
      requestScrollUpdate();
    });
    requestScrollUpdate();
  }

  const pressedActive = ["border-accent", "bg-accent/10", "text-ink"];
  const pressedIdle = ["border-line", "bg-elevated", "text-ink-body", "hover:border-accent/50"];

  function setPressed(button, on, active = pressedActive, idle = pressedIdle) {
    button.setAttribute("aria-pressed", String(on));
    active.forEach((style) => button.classList.toggle(style, on));
    idle.forEach((style) => button.classList.toggle(style, !on));
  }

  function initLeadForms() {
    const active = ["border-accent", "bg-accent/10", "text-ink"];
    const idle = ["border-fg/10", "bg-fg/[0.02]", "text-ink-body"];
    const nextButtons = all('form button[data-track-button$="_next"]');
    for (const submit of nextButtons) {
      const form = submit.form;
      const fields = all(":scope > fieldset", form);
      const budget = form.querySelector('[id$="-budget"]');
      if (!fields.length || !budget) continue;

      const budgetField = budget.closest("fieldset");
      const serviceField = fields[0] === budgetField ? null : fields[0];
      if (serviceField) {
        const other = serviceField.querySelector("button[aria-pressed]");
        if (other?.parentElement.children.length === 1) {
          const services = arabic
            ? ["تطوير المواقع", "تطوير التطبيقات", "حلول الذكاء الاصطناعي", "الأتمتة وتكامل الأنظمة", "الرؤية الحاسوبية"]
            : ["Web development", "App development", "AI solutions", "Automation and systems integration", "Computer vision"];
          for (const label of services) {
            const button = other.cloneNode(false);
            button.textContent = label;
            other.before(button);
          }
        }
      }

      const stepItems = all(":scope > ol > li", form);
      const continueMarkup = [...submit.childNodes].map((child) => child.cloneNode(true));
      const details = element("div", "grid gap-4");
      const back = element("button", "min-h-11 text-sm font-semibold text-ink-body hover:text-accent", copy("رجوع", "Back"));
      details.hidden = true;
      back.hidden = true;
      back.type = "button";
      for (const [name, type, label, required, autocomplete] of [
        ["name", "text", copy("اسمك الكامل", "Your full name"), true, "name"],
        ["company", "text", copy("اسم الشركة", "Company name"), false, "organization"],
        ["phone", "tel", copy("رقم الجوال", "Phone number"), true, "tel"],
        ["email", "email", copy("البريد الإلكتروني", "Email address"), false, "email"],
        ["project", "textarea", copy("نبذة عن مشروعك", "Tell us about your project"), false, ""],
      ]) {
        const fieldLabel = element("label", "grid gap-1.5 text-sm font-medium text-ink", label + (required ? " *" : ""));
        const field = element(type === "textarea" ? "textarea" : "input", "min-h-11 rounded-xl border border-line bg-canvas p-3 text-base text-ink");
        field.name = name;
        field.required = required;
        if (field instanceof HTMLInputElement) {
          field.type = type;
          field.autocomplete = autocomplete;
          if (type !== "text") field.dir = "ltr";
        } else {
          field.rows = 3;
        }
        fieldLabel.append(field);
        details.append(fieldLabel);
      }
      submit.before(details);
      submit.after(back);
      let step = 1;

      function changeStep(next) {
        step = next;
        fields.forEach((fieldset) => fieldset.hidden = next === 2);
        details.hidden = next === 1;
        back.hidden = next === 1;
        stepItems.forEach((item, index) => {
          if (index === next - 1) item.setAttribute("aria-current", "step");
          else item.removeAttribute("aria-current");
          const indicator = item.querySelector("span");
          if (!indicator) return;
          indicator.classList.toggle("bg-[#A384FF]", index === next - 1);
          indicator.classList.toggle("text-[#121416]", index === next - 1);
        });
        if (next === 1) submit.replaceChildren(...continueMarkup.map((child) => child.cloneNode(true)));
        else submit.textContent = copy("إرسال الطلب التجريبي", "Submit sample request");
        (next === 1 ? submit : details.querySelector("input"))?.focus();
      }

      for (const fieldset of fields) {
        const options = all("button[aria-pressed]", fieldset);
        options.forEach((button) => button.addEventListener("click", () => {
          const pressed = button.getAttribute("aria-pressed") === "true";
          if (fieldset !== serviceField) {
            options.forEach((other) => setPressed(other, false, active, idle));
          }
          setPressed(button, fieldset === budgetField || !pressed, active, idle);
          form.querySelector(":scope > [data-clone-status]")?.remove();
        }));
      }

      back.addEventListener("click", () => {
        form.querySelector(":scope > [data-clone-status]")?.remove();
        changeStep(1);
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (step === 1) {
          if (!budget.querySelector('[aria-pressed="true"]')) {
            status(form, copy("اختار ميزانيتك التقريبية عشان تكمّل.", "Select an approximate budget to continue."), true);
            budget.focus();
            return;
          }
          changeStep(2);
          return;
        }
        if (!form.reportValidity()) return;
        const notice = status(form, localNotice);
        notice.tabIndex = -1;
        notice.focus();
      });
    }
  }

  function initCalculator() {
    if (path !== "/tools/project-cost-calculator") return;
    const groups = all("main fieldset").filter((item) => !item.closest("form")).slice(0, 3);
    const result = document.querySelector("main aside");
    if (groups.length !== 3 || !result) return;
    const prices = [
      [84000, "website-design-cost"],
      [84000, "ecommerce-store-cost"],
      [180000, "mobile-app-cost"],
      [282000, "erp-cost"],
      [37500, "ai-agent-cost"],
      [56250, "automation-cost"],
    ];
    const amount = result.querySelector(":scope > p:nth-of-type(2)");
    const guide = result.querySelector(":scope > a");
    if (!amount || !guide) return;
    const currency = amount.querySelector("span")?.cloneNode(true);
    const factors = element("p", "mt-4 text-sm leading-6 text-ink-body");
    guide.before(factors);
    result.setAttribute("aria-live", "polite");
    const buttons = groups.map((group) => all("button[aria-pressed]", group));
    function update() {
      const selected = buttons[0].findIndex((button) => button.getAttribute("aria-pressed") === "true");
      const [price, slug] = prices[selected < 0 ? 0 : selected];
      amount.replaceChildren(price.toLocaleString(locale) + " ");
      if (currency) amount.append(currency);
      else amount.append(copy("جنيه مصري", "EGP"));
      guide.href = route("/prices/" + slug);
      const extras = [...buttons[1].slice(1), ...buttons[2]]
        .filter((button) => button.getAttribute("aria-pressed") === "true")
        .map(text);
      factors.hidden = extras.length === 0;
      factors.textContent = copy("عوامل تؤثر في عرض السعر: ", "Factors affecting the quote: ") + extras.join(copy("، ", ", "));
    }
    buttons.forEach((options, group) => options.forEach((button) => {
      button.addEventListener("click", () => {
        const pressed = button.getAttribute("aria-pressed") === "true";
        if (group < 2) options.forEach((other) => setPressed(other, other === button));
        else setPressed(button, !pressed);
        update();
      });
    }));
    update();
  }

  function initMeeting() {
    if (path !== "/meeting") return;
    const form = document.querySelector("main form");
    if (!form) return;
    const grid = all('[class~="grid-cols-7"]', form).find((node) => node.querySelector("button"));
    const monthHeader = grid?.parentElement.querySelector("h3");
    const monthButtons = monthHeader ? all("button", monthHeader.parentElement) : [];
    const dayTemplate = grid?.querySelector("button");
    if (!grid || !dayTemplate || monthButtons.length < 2) return;

    const cairoDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Cairo", year: "numeric", month: "numeric", day: "numeric",
    });
    const dateParts = Object.fromEntries(cairoDate.formatToParts(new Date()).map(({type, value}) => [type, value]));
    const today = new Date(Number(dateParts.year), Number(dateParts.month) - 1, Number(dateParts.day));
    let month = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDay = new Date(today);
    let selectedTime = "";
    const times = element("fieldset", "mt-4 grid gap-2");
    times.append(element("legend", "text-sm font-semibold text-ink", copy(
      "اختار وقت تجريبي بتوقيت مصر",
      "Choose a sample time (Egypt time)"
    )));
    const timeChoices = element("div", "grid grid-cols-3 gap-2");
    times.append(timeChoices);
    const duration = all('button[type="button"]', form).filter((button) => /^\s*(30|60)\s/.test(text(button)));
    const timeButtonClass = "rounded-lg border px-3 py-2 text-sm font-medium";
    const timeActive = ["border-primary-500", "bg-primary-500/20", "text-primary-400"];
    const timeIdle = ["border-white/10", "bg-white/5", "text-gray-300"];
    const timeOptions = ["10:00", "12:00", "14:00"].map((time) => {
      const option = element("button", timeButtonClass, time);
      option.type = "button";
      setPressed(option, false, timeActive, timeIdle);
      option.addEventListener("click", () => {
        selectedTime = time;
        timeOptions.forEach((button) => setPressed(button, button === option, timeActive, timeIdle));
      });
      timeChoices.append(option);
      return option;
    });
    const calendar = monthHeader.parentElement.parentElement;
    calendar.after(times);
    times.hidden = false;

    const monthNames = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric", calendar: "gregory"});
    const activeDay = ["bg-white/10", "text-primary-400"];
    const normalDay = ["text-gray-300", "hover:bg-white/10"];
    const unavailableDay = ["text-gray-600", "cursor-not-allowed"];
    function renderCalendar() {
      monthHeader.textContent = monthNames.format(month);
      const year = month.getFullYear();
      const index = month.getMonth();
      const leading = month.getDay();
      const count = new Date(year, index + 1, 0).getDate();
      const cells = Math.ceil((leading + count) / 7) * 7;
      const buttons = [];
      for (let cell = 0; cell < cells; cell += 1) {
        const date = new Date(year, index, cell - leading + 1);
        const button = dayTemplate.cloneNode(false);
        button.textContent = String(date.getDate());
        button.setAttribute("aria-label", date.toLocaleDateString(locale, {dateStyle: "full", calendar: "gregory"}));
        button.disabled = date < today || date.getMonth() !== index;
        const active = date.getTime() === selectedDay.getTime();
        setPressed(button, active, activeDay, normalDay);
        unavailableDay.forEach((style) => button.classList.toggle(style, button.disabled));
        button.addEventListener("click", () => {
          selectedDay = date;
          selectedTime = "";
          timeOptions.forEach((option) => setPressed(option, false, timeActive, timeIdle));
          renderCalendar();
          times.querySelector("button").focus();
        });
        buttons.push(button);
      }
      grid.replaceChildren(...buttons);
      monthButtons[0].disabled = month.getTime() <= new Date(today.getFullYear(), today.getMonth(), 1).getTime();
      monthButtons[1].disabled = false;
    }
    monthButtons.forEach((button, index) => {
      button.setAttribute("aria-label", index === 0 ? copy("الشهر السابق", "Previous month") : copy("الشهر التالي", "Next month"));
      button.addEventListener("click", () => {
        month = new Date(month.getFullYear(), month.getMonth() + (index === 0 ? -1 : 1), 1);
        renderCalendar();
      });
    });
    duration.forEach((button) => button.addEventListener("click", () => {
      duration.forEach((other) => setPressed(other, other === button, timeActive, timeIdle));
    }));
    for (const field of all('input:not([id="company"]), select, textarea', form)) field.required = true;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!selectedTime) {
        status(form, copy("اختار وقت تجريبي للاجتماع.", "Select a sample meeting time."), true);
        timeOptions[0].focus();
        return;
      }
      status(form, copy("تمت تجربة اختيار الموعد. لم يتم حجز اجتماع.", "Sample time selected. No meeting was booked."));
    });
    renderCalendar();
  }

  // The preview has no production form endpoint. Leave specific form handlers in control.
  document.addEventListener("submit", (event) => {
    if (event.defaultPrevented || !(event.target instanceof HTMLFormElement)) return;
    event.preventDefault();
    status(event.target, localNotice);
  });

  initNavigation();
  const markets = document.querySelector("details#markets");
  if (markets) {
    const openMarkets = () => {
      if (location.hash === "#markets") markets.open = true;
    };
    openMarkets();
    addEventListener("hashchange", openMarkets);
  }
  initCarousels();
  initFaq();
  initProcess();
  initLeadForms();
  initCalculator();
  initMeeting();
})();
