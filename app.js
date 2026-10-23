(function () {
  "use strict";

  const CATEGORY_COLORS = {
    红色文化: "linear-gradient(137deg, #F63E00 0%, #EB1010 100%)",
    科技人文: "linear-gradient(137deg, #0086F6 0%, #316FFF 100%)",
    航空航天: "linear-gradient(137deg, rgb(69, 161, 131) 0%, rgb(49, 255, 128) 100%)",
    三线建设: "linear-gradient(137deg, rgb(52, 117, 95) 0%, rgb(29, 104, 58) 100%)",
    非遗传承: "linear-gradient(137deg, #FFA231 0%, #F68700 100%)",
    地质生态: "linear-gradient(137deg, #0086F6 0%, #316FFF 100%)"
  };

  const FILTERS = [
    {
      key: "courseType",
      label: "课程类别",
      allLabel: "全部",
      options: ["全部", "科技人文", "航空航天", "非遗传承", "红色文化", "三线建设", "地质生态"]
    },
    {
      key: "fitPeriod",
      label: "适用学段",
      allLabel: "不限",
      options: ["不限", "小学一二年级", "小学三四年级", "小学五六年级", "初中", "高中"]
    },
    {
      key: "courseTime",
      label: "课程时间",
      allLabel: "不限",
      options: ["不限", "1小时", "2小时", "3小时", "4小时", "6小时", "8小时"]
    },
    {
      key: "providerType",
      label: "类型",
      allLabel: "不限",
      options: ["不限", "基地", "机构"]
    }
  ];

  const state = {
    courseType: "全部",
    fitPeriod: "不限",
    courseTime: "不限",
    providerType: "不限",
    page: 1,
    pageSize: 12,
    query: ""
  };

  const institutionState = {
    area: "全部",
    page: 1,
    pageSize: 9,
    query: ""
  };

  const filterRoot = document.getElementById("courseFilters");
  const courseGrid = document.getElementById("courseGrid");
  const emptyState = document.getElementById("emptyState");
  const pagination = document.getElementById("pagination");
  const resultCount = document.getElementById("resultCount");
  const activeFilters = document.getElementById("activeFilters");
  const searchInput = document.getElementById("searchInput");
  const searchClear = document.getElementById("searchClear");
  const courseDialog = document.getElementById("courseDialog");
  const dialogContent = document.getElementById("dialogContent");
  const toast = document.getElementById("toast");
  const coursesView = document.getElementById("coursesView");
  const institutionsView = document.getElementById("institutionsView");
  const institutionDetailView = document.getElementById("institutionDetailView");
  const institutionAreas = document.getElementById("institutionAreas");
  const institutionGrid = document.getElementById("institutionGrid");
  const institutionEmpty = document.getElementById("institutionEmpty");
  const institutionPagination = document.getElementById("institutionPagination");
  const institutionCount = document.getElementById("institutionCount");
  const institutionActiveFilters = document.getElementById("institutionActiveFilters");
  const institutionDetailCourses = document.getElementById("institutionDetailCourses");
  const institutionCourseEmpty = document.getElementById("institutionCourseEmpty");
  const institutionCourseCount = document.getElementById("institutionCourseCount");
  const institutionMainImage = document.getElementById("institutionMainImage");
  const institutionThumbs = document.getElementById("institutionThumbs");
  const galleryCount = document.getElementById("galleryCount");
  const galleryPrev = document.getElementById("galleryPrev");
  const galleryNext = document.getElementById("galleryNext");

  let toastTimer;
  let searchTimer;
  let currentView = "courses";
  let activeInstitution = null;
  let activeGalleryIndex = 0;

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHTML(value).replaceAll("`", "&#096;");
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
  }

  function renderFilterControls() {
    filterRoot.innerHTML = FILTERS.map((group) => {
      const options = group.options
        .map((value) => {
          const active = String(state[group.key]) === String(value);
          return `
            <button
              class="filter-option${active ? " active" : ""}"
              type="button"
              data-filter-key="${escapeAttribute(group.key)}"
              data-filter-value="${escapeAttribute(value)}"
              aria-pressed="${active}"
            >${escapeHTML(value)}</button>
          `;
        })
        .join("");

      return `
        <div class="filter-group" role="group" aria-label="${escapeAttribute(group.label)}">
          <div class="filter-label">${escapeHTML(group.label)}</div>
          <div class="filter-options">${options}</div>
        </div>
      `;
    }).join("");
  }

  function isAll(key, value) {
    const group = FILTERS.find((item) => item.key === key);
    return value === group?.allLabel;
  }

  function getFilteredCourses() {
    const query = state.query.trim().toLowerCase();

    return window.COURSES.filter((course) => {
      if (!isAll("courseType", state.courseType) && course.category !== state.courseType) {
        return false;
      }
      if (!isAll("fitPeriod", state.fitPeriod) && !course.stages.includes(state.fitPeriod)) {
        return false;
      }
      if (!isAll("courseTime", state.courseTime) && course.courseTime !== state.courseTime) {
        return false;
      }
      if (!isAll("providerType", state.providerType) && course.providerType !== state.providerType) {
        return false;
      }
      if (
        query &&
        !`${course.name} ${course.category} ${course.address} ${course.stages.join(" ")}`
          .toLowerCase()
          .includes(query)
      ) {
        return false;
      }
      return true;
    });
  }

  function courseCardTemplate(course, index) {
    const stages = course.stages.length
      ? `${course.stages.slice(0, 2).join("、")}${course.stages.length > 2 ? "等" : ""}`
      : "全学段适用";
    const color = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.科技人文;

    return `
      <article
        class="course-card"
        tabindex="0"
        role="button"
        data-course-id="${escapeAttribute(course.id)}"
        aria-label="查看课程：${escapeAttribute(course.name)}"
        style="animation-delay:${Math.min(index * 35, 280)}ms"
      >
        <div class="course-image-wrap">
          <img
            class="course-image"
            src="${escapeAttribute(course.image)}"
            alt="${escapeAttribute(course.name)}"
            loading="${index < 6 ? "eager" : "lazy"}"
          />
          <span class="course-category" style="background:${color}">${escapeHTML(course.category)}</span>
          <div class="course-image-meta">
            <span class="course-stages" title="${escapeAttribute(course.stages.join("、") || "全学段适用")}">${escapeHTML(stages)}</span>
            <span class="course-duration" title="课程时间：${escapeAttribute(course.courseTime)}">
              <svg aria-hidden="true"><use href="#icon-calendar"></use></svg>
              ${escapeHTML(course.courseTime)}
            </span>
          </div>
        </div>
        <div class="course-info">
          <h3 class="course-title">${escapeHTML(course.name)}</h3>
          <div class="course-footer">
            <span class="course-address" title="${escapeAttribute(course.address)}">
              <svg aria-hidden="true"><use href="#icon-pin"></use></svg>
              <span>${escapeHTML(course.address)}</span>
            </span>
            <span class="provider-badge">${escapeHTML(course.providerType)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function getPageNumbers(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", total];
    }
    if (current >= total - 3) {
      return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    const pageButtons = getPageNumbers(state.page, totalPages)
      .map((page) => {
        if (page === "ellipsis") {
          return '<span class="page-ellipsis" aria-hidden="true">…</span>';
        }
        const active = page === state.page;
        return `
          <button
            type="button"
            class="${active ? "active" : ""}"
            data-page="${page}"
            ${active ? 'aria-current="page"' : ""}
            aria-label="第 ${page} 页"
          >${page}</button>
        `;
      })
      .join("");

    pagination.innerHTML = `
      <button type="button" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="上一页">上一页</button>
      ${pageButtons}
      <button type="button" data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""} aria-label="下一页">下一页</button>
    `;
  }

  function renderActiveFilters() {
    const labels = [];
    if (!isAll("courseType", state.courseType)) labels.push(state.courseType);
    if (!isAll("fitPeriod", state.fitPeriod)) labels.push(state.fitPeriod);
    if (!isAll("courseTime", state.courseTime)) labels.push(state.courseTime);
    if (!isAll("providerType", state.providerType)) labels.push(`${state.providerType}课程`);
    if (state.query.trim()) labels.push(`“${state.query.trim()}”`);
    activeFilters.textContent = labels.length ? labels.join(" · ") : "全部课程";
  }

  function renderCourses() {
    const filtered = getFilteredCourses();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    state.page = Math.min(state.page, totalPages);

    const start = (state.page - 1) * state.pageSize;
    const visibleCourses = filtered.slice(start, start + state.pageSize);

    resultCount.textContent = String(filtered.length);
    renderActiveFilters();
    courseGrid.innerHTML = visibleCourses.map(courseCardTemplate).join("");
    courseGrid.hidden = visibleCourses.length === 0;
    emptyState.hidden = filtered.length !== 0;
    renderPagination(totalPages);
  }

  function resetFilters(keepQuery = false) {
    state.courseType = "全部";
    state.fitPeriod = "不限";
    state.courseTime = "不限";
    state.providerType = "不限";
    state.page = 1;
    if (!keepQuery) {
      state.query = "";
      searchInput.value = "";
      searchClear.classList.remove("is-visible");
    }
    renderFilterControls();
    renderCourses();
  }

  function openCourseDialog(course) {
    const stages = course.stages.length ? course.stages.join("、") : "全学段适用";
    const color = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.科技人文;

    dialogContent.innerHTML = `
      <div class="dialog-hero">
        <img src="${escapeAttribute(course.image)}" alt="${escapeAttribute(course.name)}" />
      </div>
      <div class="dialog-body">
        <div class="dialog-kicker">研学课程 · ${escapeHTML(course.providerType)}课程</div>
        <h2>${escapeHTML(course.name)}</h2>
        <div class="dialog-tags">
          <span style="background:${color};color:#fff">${escapeHTML(course.category)}</span>
          ${course.stages.map((stage) => `<span>${escapeHTML(stage)}</span>`).join("")}
        </div>
        <div class="dialog-facts">
          <div class="dialog-fact">
            <span>课程时间</span>
            <strong>${escapeHTML(course.courseTime)}</strong>
          </div>
          <div class="dialog-fact">
            <span>课程类型</span>
            <strong>${escapeHTML(course.providerType)}</strong>
          </div>
          <div class="dialog-fact">
            <span>适用学段</span>
            <strong>${escapeHTML(stages)}</strong>
          </div>
          <div class="dialog-fact">
            <span>参考价格</span>
            <strong>¥${escapeHTML(course.price)} / 人起</strong>
          </div>
        </div>
        <div class="dialog-actions">
          <a class="primary" href="https://gzyxw.com/courses/detail?id=${encodeURIComponent(course.id)}" target="_blank" rel="noreferrer">查看原站详情</a>
          <button class="secondary" type="button" data-close-dialog>继续浏览课程</button>
        </div>
      </div>
    `;

    document.body.classList.add("no-scroll");
    courseDialog.showModal();
  }

  function closeCourseDialog() {
    if (courseDialog.open) courseDialog.close();
    document.body.classList.remove("no-scroll");
  }

  function renderBases() {
    const baseGrid = document.getElementById("baseGrid");
    baseGrid.innerHTML = window.RECOMMENDED_BASES.map((base) => `
      <a
        class="base-card"
        href="https://gzyxw.com/bases"
        target="_blank"
        rel="noreferrer"
        aria-label="查看研学基地：${escapeAttribute(base.name)}"
      >
        <img src="${escapeAttribute(base.image)}" alt="${escapeAttribute(base.name)}" loading="lazy" />
        <span class="base-tag">${escapeHTML(base.category)}</span>
        <div class="base-copy">
          <h3>${escapeHTML(base.name)}</h3>
          <p>
            <svg aria-hidden="true"><use href="#icon-pin"></use></svg>
            ${escapeHTML(base.grade)} · ${escapeHTML(base.address)}
          </p>
        </div>
      </a>
    `).join("");
  }

  function getInstitutionCourses(institution) {
    const preferred = window.COURSES.filter((course) =>
      institution.preferredCategories.includes(course.category)
    );
    const fallback = window.COURSES.filter((course) => !preferred.includes(course));
    return [...preferred, ...fallback].slice(0, 6);
  }

  function getFilteredInstitutions() {
    const query = institutionState.query.trim().toLowerCase();

    return window.INSTITUTIONS.filter((institution) => {
      if (institutionState.area !== "全部" && institution.city !== institutionState.area) {
        return false;
      }
      if (
        query &&
        !`${institution.name} ${institution.city} ${institution.district} ${institution.address}`
          .toLowerCase()
          .includes(query)
      ) {
        return false;
      }
      return true;
    });
  }

  function renderInstitutionAreas() {
    institutionAreas.innerHTML = window.INSTITUTION_AREAS.map((area) => {
      const active = institutionState.area === area;
      return `
        <button
          class="filter-option${active ? " active" : ""}"
          type="button"
          data-institution-area="${escapeAttribute(area)}"
          aria-pressed="${active}"
        >${escapeHTML(area)}</button>
      `;
    }).join("");
  }

  function institutionCardTemplate(institution, index) {
    const courseCount = getInstitutionCourses(institution).length;
    return `
      <a
        class="institution-card"
        href="#institution/${encodeURIComponent(institution.id)}"
        aria-label="查看研学机构：${escapeAttribute(institution.name)}"
        style="animation:card-in .45s ${Math.min(index * 35, 280)}ms both"
      >
        <div class="institution-card-image">
          <img
            src="${escapeAttribute(institution.images[0])}"
            alt="${escapeAttribute(institution.name)}"
            loading="${index < 6 ? "eager" : "lazy"}"
          />
          <span class="institution-area-chip">${escapeHTML(institution.district)}</span>
        </div>
        <div class="institution-card-info">
          <h3>${escapeHTML(institution.name)}</h3>
          <div class="institution-card-address" title="${escapeAttribute(institution.address)}">
            <svg aria-hidden="true"><use href="#icon-pin"></use></svg>
            <span>${escapeHTML(institution.address)}</span>
          </div>
          <div class="institution-card-footer">
            <span>${courseCount} 门研学课程</span>
            <span>查看详情 <svg aria-hidden="true"><use href="#icon-arrow"></use></svg></span>
          </div>
        </div>
      </a>
    `;
  }

  function renderInstitutionPagination(totalPages) {
    if (totalPages <= 1) {
      institutionPagination.innerHTML = "";
      return;
    }

    const pageButtons = getPageNumbers(institutionState.page, totalPages)
      .map((page) => {
        if (page === "ellipsis") {
          return '<span class="page-ellipsis" aria-hidden="true">…</span>';
        }
        const active = page === institutionState.page;
        return `
          <button
            type="button"
            class="${active ? "active" : ""}"
            data-institution-page="${page}"
            ${active ? 'aria-current="page"' : ""}
            aria-label="第 ${page} 页"
          >${page}</button>
        `;
      })
      .join("");

    institutionPagination.innerHTML = `
      <button
        type="button"
        data-institution-page="${institutionState.page - 1}"
        ${institutionState.page === 1 ? "disabled" : ""}
        aria-label="上一页"
      >上一页</button>
      ${pageButtons}
      <button
        type="button"
        data-institution-page="${institutionState.page + 1}"
        ${institutionState.page === totalPages ? "disabled" : ""}
        aria-label="下一页"
      >下一页</button>
    `;
  }

  function renderInstitutionList() {
    const filtered = getFilteredInstitutions();
    const totalPages = Math.max(1, Math.ceil(filtered.length / institutionState.pageSize));
    institutionState.page = Math.min(institutionState.page, totalPages);

    const start = (institutionState.page - 1) * institutionState.pageSize;
    const visibleInstitutions = filtered.slice(start, start + institutionState.pageSize);
    const labels = [];
    if (institutionState.area !== "全部") labels.push(institutionState.area);
    if (institutionState.query.trim()) labels.push(`“${institutionState.query.trim()}”`);

    institutionCount.textContent = String(filtered.length);
    institutionActiveFilters.textContent = labels.length
      ? `${labels.join(" · ")} · 研学机构`
      : "全部机构";
    institutionGrid.innerHTML = visibleInstitutions.map(institutionCardTemplate).join("");
    institutionGrid.hidden = visibleInstitutions.length === 0;
    institutionEmpty.hidden = filtered.length !== 0;
    renderInstitutionPagination(totalPages);
  }

  function resetInstitutionFilters() {
    institutionState.area = "全部";
    institutionState.query = "";
    institutionState.page = 1;
    searchInput.value = "";
    searchClear.classList.remove("is-visible");
    renderInstitutionAreas();
    renderInstitutionList();
  }

  function updateInstitutionGallery() {
    if (!activeInstitution) return;
    const images = activeInstitution.images;
    if (!images.length) return;

    activeGalleryIndex = (activeGalleryIndex + images.length) % images.length;
    institutionMainImage.src = images[activeGalleryIndex];
    institutionMainImage.alt = `${activeInstitution.name} 图片 ${activeGalleryIndex + 1}`;
    galleryCount.textContent = `${activeGalleryIndex + 1} / ${images.length}`;
    galleryPrev.hidden = images.length <= 1;
    galleryNext.hidden = images.length <= 1;

    institutionThumbs.querySelectorAll("[data-gallery-index]").forEach((thumb) => {
      const active = Number(thumb.dataset.galleryIndex) === activeGalleryIndex;
      thumb.classList.toggle("active", active);
      thumb.setAttribute("aria-pressed", String(active));
    });
  }

  function renderInstitutionDetail(institution) {
    activeInstitution = institution;
    activeGalleryIndex = 0;
    document.getElementById("institutionBreadcrumb").textContent = institution.name;
    document.getElementById("institutionDetailTitle").textContent = institution.name;
    document.getElementById("institutionDescription").textContent = institution.description;
    document.getElementById("institutionAreaLabel").textContent = `${institution.city} · ${institution.district}`;
    document.getElementById("institutionDetailAddress").textContent = institution.address;

    institutionThumbs.innerHTML = institution.images.map((image, index) => `
      <button
        class="gallery-thumb"
        type="button"
        data-gallery-index="${index}"
        aria-label="查看第 ${index + 1} 张图片"
        aria-pressed="false"
      >
        <img src="${escapeAttribute(image)}" alt="" loading="lazy" />
      </button>
    `).join("");

    const courses = getInstitutionCourses(institution);
    institutionCourseCount.textContent = String(courses.length);
    institutionDetailCourses.innerHTML = courses.map(courseCardTemplate).join("");
    institutionDetailCourses.hidden = courses.length === 0;
    institutionCourseEmpty.hidden = courses.length !== 0;
    updateInstitutionGallery();
  }

  function setActiveNavigation(activeView) {
    document.querySelectorAll("[data-nav-view]").forEach((link) => {
      const active = link.dataset.navView === activeView;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function showView(view, institution) {
    currentView = view;
    coursesView.hidden = view !== "courses";
    institutionsView.hidden = view !== "institutions";
    institutionDetailView.hidden = view !== "institution-detail";

    if (view === "courses") {
      setActiveNavigation("courses");
      searchInput.placeholder = "请输入基地、服务机构或研学课程关键字";
      searchInput.value = state.query;
      renderCourses();
    } else if (view === "institutions") {
      setActiveNavigation("institutions");
      searchInput.placeholder = "请输入研学机构关键字";
      searchInput.value = institutionState.query;
      renderInstitutionAreas();
      renderInstitutionList();
    } else {
      setActiveNavigation("institutions");
      searchInput.placeholder = "搜索研学机构";
      searchInput.value = "";
      renderInstitutionDetail(institution);
    }

    searchClear.classList.toggle("is-visible", Boolean(searchInput.value));
    document.title = view === "courses"
      ? "研学课程｜贵州省研学综合服务网"
      : view === "institutions"
        ? "研学机构｜贵州省研学综合服务网"
        : `${institution.name}｜研学机构｜贵州省研学综合服务网`;
  }

  function handleRoute() {
    const route = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (route.startsWith("institution/")) {
      const institutionId = route.slice("institution/".length);
      const institution = window.INSTITUTIONS.find((item) => item.id === institutionId);
      if (institution) {
        showView("institution-detail", institution);
      } else {
        showToast("未找到该研学机构");
        window.location.hash = "#institutions";
      }
    } else if (route === "institutions") {
      showView("institutions");
    } else {
      showView("courses");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter-key]");
    if (!button) return;

    const key = button.dataset.filterKey;
    const value = button.dataset.filterValue;
    state[key] = value;
    state.page = 1;
    renderFilterControls();
    renderCourses();
  });

  institutionAreas.addEventListener("click", (event) => {
    const button = event.target.closest("[data-institution-area]");
    if (!button) return;
    institutionState.area = button.dataset.institutionArea;
    institutionState.page = 1;
    renderInstitutionAreas();
    renderInstitutionList();
  });

  courseGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-course-id]");
    if (!card) return;
    const course = window.COURSES.find((item) => item.id === card.dataset.courseId);
    if (course) openCourseDialog(course);
  });

  courseGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-course-id]");
    if (!card) return;
    event.preventDefault();
    card.click();
  });

  institutionDetailCourses.addEventListener("click", (event) => {
    const card = event.target.closest("[data-course-id]");
    if (!card) return;
    const course = window.COURSES.find((item) => item.id === card.dataset.courseId);
    if (course) openCourseDialog(course);
  });

  institutionDetailCourses.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-course-id]");
    if (!card) return;
    event.preventDefault();
    card.click();
  });

  pagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    const nextPage = Number(button.dataset.page);
    const totalPages = Math.max(1, Math.ceil(getFilteredCourses().length / state.pageSize));
    if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage > totalPages) return;
    state.page = nextPage;
    renderCourses();
    document.querySelector(".courses-section").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  institutionPagination.addEventListener("click", (event) => {
    const button = event.target.closest("[data-institution-page]");
    if (!button || button.disabled) return;
    const nextPage = Number(button.dataset.institutionPage);
    const totalPages = Math.max(
      1,
      Math.ceil(getFilteredInstitutions().length / institutionState.pageSize)
    );
    if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage > totalPages) return;
    institutionState.page = nextPage;
    renderInstitutionList();
    document.querySelector(".institutions-section").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  searchInput.addEventListener("input", () => {
    searchClear.classList.toggle("is-visible", Boolean(searchInput.value));
    if (currentView === "institution-detail") return;

    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      if (currentView === "institutions") {
        institutionState.query = searchInput.value;
        institutionState.page = 1;
        renderInstitutionList();
      } else {
        state.query = searchInput.value;
        state.page = 1;
        renderCourses();
      }
    }, 160);
  });

  document.getElementById("searchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    window.clearTimeout(searchTimer);
    if (currentView === "institution-detail") {
      institutionState.query = searchInput.value;
      institutionState.page = 1;
      window.location.hash = "#institutions";
    } else if (currentView === "institutions") {
      institutionState.query = searchInput.value;
      institutionState.page = 1;
      renderInstitutionList();
    } else {
      state.query = searchInput.value;
      state.page = 1;
      renderCourses();
    }
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.classList.remove("is-visible");
    if (currentView === "institutions") {
      institutionState.query = "";
      institutionState.page = 1;
      renderInstitutionList();
    } else if (currentView === "institution-detail") {
      institutionState.query = "";
      window.location.hash = "#institutions";
    } else {
      state.query = "";
      state.page = 1;
      renderCourses();
    }
    searchInput.focus();
  });

  document.getElementById("resetFilters").addEventListener("click", () => resetFilters());
  document.getElementById("emptyReset").addEventListener("click", () => resetFilters());
  document.getElementById("institutionReset").addEventListener("click", resetInstitutionFilters);
  document.getElementById("institutionEmptyReset").addEventListener("click", resetInstitutionFilters);
  document.getElementById("dialogClose").addEventListener("click", closeCourseDialog);
  dialogContent.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-dialog]")) closeCourseDialog();
  });
  courseDialog.addEventListener("click", (event) => {
    if (event.target === courseDialog) closeCourseDialog();
  });
  courseDialog.addEventListener("close", () => document.body.classList.remove("no-scroll"));

  galleryPrev.addEventListener("click", () => {
    activeGalleryIndex -= 1;
    updateInstitutionGallery();
  });

  galleryNext.addEventListener("click", () => {
    activeGalleryIndex += 1;
    updateInstitutionGallery();
  });

  institutionThumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-gallery-index]");
    if (!thumb) return;
    activeGalleryIndex = Number(thumb.dataset.galleryIndex);
    updateInstitutionGallery();
  });

  window.addEventListener("hashchange", handleRoute);

  document.querySelector(".assistant-character").addEventListener("click", () => {
    showToast("演示提示：知小驿在线咨询功能待接入");
  });

  document.querySelectorAll("[data-demo-action]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(`演示提示：${button.dataset.demoAction}功能待接入`);
    });
  });

  renderFilterControls();
  renderCourses();
  renderBases();
  renderInstitutionAreas();
  handleRoute();
})();
