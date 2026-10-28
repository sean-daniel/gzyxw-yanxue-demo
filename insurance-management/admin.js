const regionOptions = [
  { id: "gz", group: "省级", label: "贵州省", path: ["贵州省"] },
  { id: "gy", group: "市级", label: "贵阳市", path: ["贵州省", "贵阳市"] },
  { id: "zy", group: "市级", label: "遵义市", path: ["贵州省", "遵义市"] },
  { id: "lps", group: "市级", label: "六盘水市", path: ["贵州省", "六盘水市"] },
  { id: "as", group: "市级", label: "安顺市", path: ["贵州省", "安顺市"] },
  { id: "bj", group: "市级", label: "毕节市", path: ["贵州省", "毕节市"] },
  { id: "tr", group: "市级", label: "铜仁市", path: ["贵州省", "铜仁市"] },
  {
    id: "yunyan",
    group: "区/县级",
    label: "云岩区",
    path: ["贵州省", "贵阳市", "云岩区"],
  },
  {
    id: "nanming",
    group: "区/县级",
    label: "南明区",
    path: ["贵州省", "贵阳市", "南明区"],
  },
  {
    id: "huaxi",
    group: "区/县级",
    label: "花溪区",
    path: ["贵州省", "贵阳市", "花溪区"],
  },
  {
    id: "wudang",
    group: "区/县级",
    label: "乌当区",
    path: ["贵州省", "贵阳市", "乌当区"],
  },
  {
    id: "guanshanhu",
    group: "区/县级",
    label: "观山湖区",
    path: ["贵州省", "贵阳市", "观山湖区"],
  },
  {
    id: "baiyun",
    group: "区/县级",
    label: "白云区",
    path: ["贵州省", "贵阳市", "白云区"],
  },
  {
    id: "kaiyang",
    group: "区/县级",
    label: "开阳县",
    path: ["贵州省", "贵阳市", "开阳县"],
  },
  {
    id: "xifeng",
    group: "区/县级",
    label: "息烽县",
    path: ["贵州省", "贵阳市", "息烽县"],
  },
  {
    id: "xiuwen",
    group: "区/县级",
    label: "修文县",
    path: ["贵州省", "贵阳市", "修文县"],
  },
  {
    id: "qingzhen",
    group: "区/县级",
    label: "清镇市",
    path: ["贵州省", "贵阳市", "清镇市"],
  },
];

const companies = [
  {
    id: "picc",
    short: "人保财险",
    badge: "人保",
    color: "#cf3838",
    name: "中国人民财产保险股份有限公司贵州省分公司",
    code: "PICC-GZ-001",
    contact: "李明 · 0851-95518",
    enabled: false,
    selectedPlanId: "picc-standard",
    regionIds: ["yunyan"],
    plans: [
      {
        id: "picc-basic",
        name: "基础出行险",
        tagline: "短途活动的基础意外保障",
        price: 8,
        coverage: "意外身故/伤残 10 万",
        features: ["意外医疗 1 万", "意外住院津贴 50 元/天", "电子保单即时生效"],
      },
      {
        id: "picc-standard",
        name: "标准安心险",
        tagline: "适合常规研学活动",
        price: 12,
        coverage: "意外身故/伤残 20 万",
        features: ["意外医疗 3 万", "意外住院津贴 80 元/天", "7×24 小时报案服务"],
      },
      {
        id: "picc-premium",
        name: "尊享全程险",
        tagline: "高保障全流程出行方案",
        price: 18,
        coverage: "意外身故/伤残 30 万",
        features: ["意外医疗 5 万", "紧急医疗转运 10 万", "24 小时道路救援"],
      },
    ],
  },
  {
    id: "pingan",
    short: "平安产险",
    badge: "平安",
    color: "#ed6b24",
    name: "中国平安财产保险股份有限公司贵州分公司",
    code: "PAIC-GZ-002",
    contact: "周雪 · 0851-95511",
    enabled: true,
    selectedPlanId: "pingan-standard",
    regionIds: ["nanming"],
    plans: [
      {
        id: "pingan-basic",
        name: "研学无忧基础版",
        tagline: "轻量活动的基础保障",
        price: 9,
        coverage: "意外身故/伤残 12 万",
        features: ["意外医疗 1.5 万", "门诊医疗 0 免赔", "线上快速理赔"],
      },
      {
        id: "pingan-standard",
        name: "研学无忧标准版",
        tagline: "多场景研学活动推荐",
        price: 12,
        coverage: "意外身故/伤残 20 万",
        features: ["意外医疗 3 万", "紧急医疗运送 5 万", "个人责任保障 3 万"],
      },
      {
        id: "pingan-premium",
        name: "研学无忧尊享版",
        tagline: "长途及高风险活动适用",
        price: 20,
        coverage: "意外身故/伤残 35 万",
        features: ["意外医疗 6 万", "紧急救援服务", "住院津贴 100 元/天"],
      },
    ],
  },
  {
    id: "cpic",
    short: "太保产险",
    badge: "太保",
    color: "#1766ba",
    name: "中国太平洋财产保险股份有限公司贵州分公司",
    code: "CPIC-GZ-003",
    contact: "吴桐 · 0851-95500",
    enabled: false,
    selectedPlanId: "cpic-standard",
    regionIds: ["guanshanhu"],
    plans: [
      {
        id: "cpic-basic",
        name: "乐行基础版",
        tagline: "日常校外活动保障",
        price: 8.5,
        coverage: "意外身故/伤残 10 万",
        features: ["意外医疗 1 万", "意外住院津贴 50 元/天", "电子保单"],
      },
      {
        id: "cpic-standard",
        name: "乐行标准版",
        tagline: "标准研学出行配置",
        price: 13,
        coverage: "意外身故/伤残 22 万",
        features: ["意外医疗 3 万", "紧急救援 5 万", "误工与护理津贴"],
      },
      {
        id: "cpic-premium",
        name: "乐行尊享版",
        tagline: "高额度综合保障",
        price: 19,
        coverage: "意外身故/伤残 32 万",
        features: ["意外医疗 5 万", "医疗转运 12 万", "亲属探访费用"],
      },
    ],
  },
  {
    id: "chinalife",
    short: "国寿财险",
    badge: "国寿",
    color: "#1f9b6b",
    name: "中国人寿财产保险股份有限公司贵州省分公司",
    code: "CLIC-GZ-004",
    contact: "陈静 · 0851-95519",
    enabled: false,
    selectedPlanId: "chinalife-standard",
    regionIds: ["as"],
    plans: [
      {
        id: "chinalife-basic",
        name: "成长守护基础版",
        tagline: "短时活动轻量保障",
        price: 7.5,
        coverage: "意外身故/伤残 10 万",
        features: ["意外医疗 1 万", "意外住院津贴 40 元/天", "线上理赔"],
      },
      {
        id: "chinalife-standard",
        name: "成长守护标准版",
        tagline: "常规研学活动适用",
        price: 11.5,
        coverage: "意外身故/伤残 18 万",
        features: ["意外医疗 2.5 万", "住院津贴 70 元/天", "7×24 小时服务"],
      },
      {
        id: "chinalife-premium",
        name: "成长守护尊享版",
        tagline: "全面守护学生出行",
        price: 17,
        coverage: "意外身故/伤残 28 万",
        features: ["意外医疗 4 万", "紧急救援 8 万", "住院护理津贴"],
      },
    ],
  },
  {
    id: "yangguan",
    short: "阳光财险",
    badge: "阳光",
    color: "#e3a319",
    name: "阳光财产保险股份有限公司贵州省分公司",
    code: "SUN-GZ-005",
    contact: "王可 · 0851-95510",
    enabled: false,
    selectedPlanId: "yangguan-standard",
    regionIds: ["zy"],
    plans: [
      {
        id: "yangguan-basic",
        name: "阳光出行基础版",
        tagline: "基础意外风险覆盖",
        price: 8,
        coverage: "意外身故/伤残 10 万",
        features: ["意外医疗 1 万", "意外住院津贴 50 元/天", "电子保单"],
      },
      {
        id: "yangguan-standard",
        name: "阳光出行标准版",
        tagline: "高性价比研学套餐",
        price: 12,
        coverage: "意外身故/伤残 20 万",
        features: ["意外医疗 3 万", "医疗运送 5 万", "紧急救援服务"],
      },
      {
        id: "yangguan-premium",
        name: "阳光出行尊享版",
        tagline: "全程高额保障",
        price: 18.5,
        coverage: "意外身故/伤残 30 万",
        features: ["意外医疗 5 万", "医疗转运 10 万", "亲属探访津贴"],
      },
    ],
  },
  {
    id: "taikang",
    short: "泰康在线",
    badge: "泰康",
    color: "#7154b8",
    name: "泰康在线财产保险股份有限公司贵州服务中心",
    code: "TK-GZ-006",
    contact: "罗佳 · 400-079-5522",
    enabled: false,
    selectedPlanId: "taikang-standard",
    regionIds: ["lps"],
    plans: [
      {
        id: "taikang-basic",
        name: "研学保基础版",
        tagline: "灵活投保的基础方案",
        price: 9,
        coverage: "意外身故/伤残 12 万",
        features: ["意外医疗 1.5 万", "意外住院津贴 50 元/天", "在线保单管理"],
      },
      {
        id: "taikang-standard",
        name: "研学保标准版",
        tagline: "多元活动标准保障",
        price: 12.5,
        coverage: "意外身故/伤残 20 万",
        features: ["意外医疗 3 万", "紧急救援 5 万", "理赔进度实时查询"],
      },
      {
        id: "taikang-premium",
        name: "研学保尊享版",
        tagline: "高强度活动专属方案",
        price: 19.5,
        coverage: "意外身故/伤残 32 万",
        features: ["意外医疗 5 万", "医疗转运 12 万", "24 小时专属客服"],
      },
    ],
  },
];

const state = {
  editingCompanyId: null,
  draftPlanId: null,
  draftRegionIds: [],
};

const els = {
  shell: document.querySelector("#appShell"),
  menuToggle: document.querySelector("#menuToggle"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  companyTableBody: document.querySelector("#companyTableBody"),
  companyTotal: document.querySelector("#companyTotal"),
  activeCompanyTotal: document.querySelector("#activeCompanyTotal"),
  planTotal: document.querySelector("#planTotal"),
  updatedAt: document.querySelector("#updatedAt"),
  settingsModal: document.querySelector("#settingsModal"),
  settingsClose: document.querySelector("#settingsClose"),
  settingsCancel: document.querySelector("#settingsCancel"),
  settingsSave: document.querySelector("#settingsSave"),
  settingsLogo: document.querySelector("#settingsLogo"),
  settingsCompanyName: document.querySelector("#settingsCompanyName"),
  settingsCompanyMeta: document.querySelector("#settingsCompanyMeta"),
  settingsStatus: document.querySelector("#settingsStatus"),
  planGrid: document.querySelector("#planGrid"),
  regionGroups: document.querySelector("#regionGroups"),
  regionSelectedChips: document.querySelector("#regionSelectedChips"),
  regionSelectedCount: document.querySelector("#regionSelectedCount"),
  regionError: document.querySelector("#regionError"),
  toastRegion: document.querySelector("#toastRegion"),
};

function getCompany(id) {
  return companies.find((company) => company.id === id);
}

function getSelectedPlan(company) {
  return company.plans.find((plan) => plan.id === company.selectedPlanId) ?? company.plans[0];
}

function getRegion(regionId) {
  return regionOptions.find((region) => region.id === regionId);
}

function getCompanyRegions(company) {
  return company.regionIds.map(getRegion).filter(Boolean);
}

function getRegionName(company) {
  const regions = getCompanyRegions(company);
  if (!regions.length) return "未配置区域";
  return regions[0].path.join(" / ");
}

function pathsOverlap(pathA, pathB) {
  const commonLength = Math.min(pathA.length, pathB.length);
  return pathA.slice(0, commonLength).every((part, index) => part === pathB[index]);
}

function findRegionConflicts(company, regionIds) {
  const selectedRegions = regionIds.map(getRegion).filter(Boolean);
  return companies
    .filter((item) => item.id !== company.id && item.enabled)
    .flatMap((item) =>
      getCompanyRegions(item)
        .filter((existingRegion) =>
          selectedRegions.some((region) => pathsOverlap(region.path, existingRegion.path)),
        )
        .map((region) => ({ company: item, region })),
    );
}

function getOccupyingCompany(company, region) {
  return companies.find(
    (item) =>
      item.id !== company.id &&
      item.enabled &&
      getCompanyRegions(item).some((existingRegion) =>
        pathsOverlap(region.path, existingRegion.path),
      ),
  );
}

function formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(1);
}

function renderMetrics() {
  const activeCompanies = companies.filter((company) => company.enabled);
  const planCount = companies.reduce((total, company) => total + company.plans.length, 0);
  els.companyTotal.textContent = companies.length;
  els.activeCompanyTotal.textContent = activeCompanies.length;
  els.planTotal.textContent = planCount;
}

function renderCompanies() {
  els.companyTableBody.innerHTML = "";
  companies.forEach((company, index) => {
    const plan = getSelectedPlan(company);
    const row = document.createElement("tr");
    row.className = company.enabled ? "is-enabled" : "";
    row.innerHTML = `
      <td class="provider-index">${String(index + 1).padStart(2, "0")}</td>
      <td>
        <div class="provider-name">
          <span
            class="provider-name__logo"
            style="--provider-color: ${company.color}"
            aria-hidden="true"
          >${company.badge}</span>
          <span class="provider-name__body">
            <strong title="${company.name}">${company.name}</strong>
            <small>${company.code} · ${company.contact}</small>
          </span>
        </div>
      </td>
      <td class="provider-col-package">
        <div class="plan-summary">
          <strong>${plan.name}</strong>
          <small><span class="plan-summary__price">¥${formatPrice(plan.price)}/人</span> · ${plan.coverage}</small>
        </div>
      </td>
      <td class="provider-col-status">
        <div class="provider-status">
          <button
            class="toggle-switch"
            type="button"
            role="switch"
            aria-checked="${company.enabled}"
            aria-label="${company.enabled ? `停用${company.short}` : `启用${company.short}`}"
            data-toggle-company="${company.id}"
          ></button>
          <span class="provider-status__label ${company.enabled ? "is-enabled" : ""}">
            ${company.enabled ? "已启用" : "未启用"}
          </span>
        </div>
      </td>
      <td class="provider-col-action">
        <button class="settings-link" type="button" data-settings-company="${company.id}">
          <svg aria-hidden="true"><use href="#icon-settings"></use></svg>
          设置
        </button>
      </td>
    `;
    els.companyTableBody.append(row);
  });
}

function renderAll() {
  renderMetrics();
  renderCompanies();
}

function toggleCompany(companyId) {
  const company = getCompany(companyId);
  if (!company) return;

  if (company.enabled) {
    company.enabled = false;
    showToast(`已停用「${company.short}」的投保服务`);
    renderAll();
    return;
  }

  if (!company.regionIds.length) {
    showToast(`请先为「${company.short}」设置投保区域`, "error");
    return;
  }

  const conflicts = findRegionConflicts(company, company.regionIds);
  if (conflicts.length) {
    const first = conflicts[0];
    showToast(
      `无法启用：${first.region.path.join(" / ")} 已由「${first.company.short}」承保`,
      "error",
    );
    return;
  }

  company.enabled = true;
  showToast(`已启用「${company.short}」，投保区域：${getRegionName(company)}`);
  renderAll();
}

function openSettings(companyId) {
  const company = getCompany(companyId);
  if (!company) return;
  state.editingCompanyId = companyId;
  state.draftPlanId = company.selectedPlanId;
  state.draftRegionIds = [...company.regionIds];
  els.settingsLogo.textContent = company.badge;
  els.settingsLogo.style.setProperty("--provider-color", company.color);
  els.settingsCompanyName.textContent = company.name;
  els.settingsCompanyMeta.textContent = `${company.code} · ${company.contact}`;
  els.settingsStatus.textContent = company.enabled ? "当前启用中" : "当前未启用";
  els.settingsStatus.classList.toggle("is-enabled", company.enabled);
  hideRegionError();
  renderPlans();
  renderRegionSelector();
  els.settingsModal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => {
    els.settingsModal.querySelector(".settings-modal__body").scrollTop = 0;
    els.settingsModal.querySelector('input[name="insurancePlan"]:checked')?.focus();
  });
}

function renderPlans() {
  const company = getCompany(state.editingCompanyId);
  if (!company) return;
  els.planGrid.innerHTML = "";

  company.plans.forEach((plan) => {
    const label = document.createElement("label");
    label.className = "plan-option";
    label.innerHTML = `
      <input
        type="radio"
        name="insurancePlan"
        value="${plan.id}"
        ${plan.id === state.draftPlanId ? "checked" : ""}
      />
      <span class="plan-option__card">
        <span class="plan-option__check" aria-hidden="true">
          <svg><use href="#icon-check"></use></svg>
        </span>
        <span class="plan-option__title">
          <strong>${plan.name}</strong>
          <span>${plan.tagline}</span>
        </span>
        <span class="plan-option__price">
          <em>¥</em><strong>${formatPrice(plan.price)}</strong><span>/ 人</span>
        </span>
        <ul class="plan-option__features">
          <li><svg aria-hidden="true"><use href="#icon-check"></use></svg>${plan.coverage}</li>
          ${plan.features
            .map(
              (feature) =>
                `<li><svg aria-hidden="true"><use href="#icon-check"></use></svg>${feature}</li>`,
            )
            .join("")}
        </ul>
      </span>
    `;
    els.planGrid.append(label);
  });
}

function renderRegionSelector() {
  renderRegionGroups();
  renderSelectedRegions();
}

function renderRegionGroups() {
  const company = getCompany(state.editingCompanyId);
  const groups = ["省级", "市级", "区/县级"];
  const groupHints = {
    省级: "全省范围",
    市级: "按地市选择",
    "区/县级": "贵阳市辖区及辖县",
  };
  els.regionGroups.innerHTML = "";

  groups.forEach((group) => {
    const options = regionOptions.filter((region) => region.group === group);
    const fieldset = document.createElement("fieldset");
    fieldset.className = "region-group";
    fieldset.innerHTML = `
      <legend>
        <span>${group}</span>
        <small>${groupHints[group]}</small>
      </legend>
      <div class="region-group__options">
        ${options
          .map((region) => {
            const occupant = company ? getOccupyingCompany(company, region) : null;
            return `
              <label class="region-check${occupant ? " is-occupied" : ""}">
                <input
                  type="checkbox"
                  name="insuranceRegion"
                  value="${region.id}"
                  ${state.draftRegionIds.includes(region.id) ? "checked" : ""}
                  ${occupant ? "disabled" : ""}
                />
                <span class="region-check__box" aria-hidden="true">
                  <svg><use href="#icon-check"></use></svg>
                </span>
                <span>
                  <strong>${region.label}</strong>
                  <small>${
                    region.group === "省级"
                      ? "全省"
                      : region.group === "市级"
                        ? "贵州省"
                        : "贵阳市辖区"
                  }</small>
                </span>
                ${
                  occupant
                    ? `<em class="region-check__company">${occupant.short}</em>`
                    : ""
                }
              </label>
            `;
          })
          .join("")}
      </div>
    `;
    els.regionGroups.append(fieldset);
  });
}

function renderSelectedRegions() {
  const selected = state.draftRegionIds.map(getRegion).filter(Boolean);
  els.regionSelectedCount.textContent = selected.length;
  els.regionSelectedChips.innerHTML = selected.length
    ? selected
        .map(
          (region) => `
            <button
              class="region-chip"
              type="button"
              data-remove-region="${region.id}"
              title="移除 ${region.path.join(" / ")}"
            >
              <span>${region.path.join(" / ")}</span>
              <i aria-hidden="true">×</i>
            </button>
          `,
        )
        .join("")
    : '<span class="region-selected__empty">尚未选择投保区域，请从下方勾选</span>';
}

function showRegionError(message) {
  els.regionError.textContent = message;
  els.regionError.hidden = false;
}

function hideRegionError() {
  els.regionError.textContent = "";
  els.regionError.hidden = true;
}

function closeSettings() {
  state.editingCompanyId = null;
  state.draftPlanId = null;
  state.draftRegionIds = [];
  els.settingsModal.hidden = true;
  document.body.style.overflow = "";
}

function saveSettings() {
  const company = getCompany(state.editingCompanyId);
  if (!company || !state.draftPlanId) return;
  if (!state.draftRegionIds.length) {
    showRegionError("请至少选择一个投保区域后再保存。");
    return;
  }

  if (company.enabled) {
    const conflicts = findRegionConflicts(company, state.draftRegionIds);
    if (conflicts.length) {
      const first = conflicts[0];
      showRegionError(
        `投保区域冲突：${first.region.path.join(" / ")} 已由「${first.company.short}」承保，请调整区域。`,
      );
      return;
    }
  }

  company.selectedPlanId = state.draftPlanId;
  company.regionIds = [...state.draftRegionIds];
  const plan = getSelectedPlan(company);
  closeSettings();
  renderAll();
  showToast(
    `「${company.short}」已配置${plan.name}，投保区域 ${company.regionIds.length} 个`,
  );
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " toast--error" : ""}`;
  toast.innerHTML = `
    <span class="toast__icon">
      <svg aria-hidden="true"><use href="#icon-${type === "error" ? "close" : "check"}"></use></svg>
    </span>
    <span>${message}</span>
  `;
  els.toastRegion.append(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  }, 2600);
}

function updateTime() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  els.updatedAt.textContent =
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

els.companyTableBody.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-toggle-company]");
  const settingsButton = event.target.closest("[data-settings-company]");
  if (toggleButton) toggleCompany(toggleButton.dataset.toggleCompany);
  if (settingsButton) openSettings(settingsButton.dataset.settingsCompany);
});

els.planGrid.addEventListener("change", (event) => {
  if (event.target.name === "insurancePlan") {
    state.draftPlanId = event.target.value;
    hideRegionError();
  }
});

els.regionGroups.addEventListener("change", (event) => {
  if (event.target.name !== "insuranceRegion") return;
  const regionId = event.target.value;
  if (event.target.checked) {
    if (!state.draftRegionIds.includes(regionId)) {
      state.draftRegionIds.push(regionId);
    }
  } else {
    state.draftRegionIds = state.draftRegionIds.filter((id) => id !== regionId);
  }
  hideRegionError();
  renderSelectedRegions();
});

els.regionSelectedChips.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-region]");
  if (!removeButton) return;
  state.draftRegionIds = state.draftRegionIds.filter(
    (regionId) => regionId !== removeButton.dataset.removeRegion,
  );
  hideRegionError();
  renderRegionGroups();
  renderSelectedRegions();
});

els.settingsClose.addEventListener("click", closeSettings);
els.settingsCancel.addEventListener("click", closeSettings);
els.settingsSave.addEventListener("click", saveSettings);
els.settingsModal.addEventListener("click", (event) => {
  if (event.target === els.settingsModal) closeSettings();
});

els.menuToggle.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 960px)").matches) {
    const isOpen = els.shell.classList.toggle("is-mobile-nav-open");
    els.sidebarBackdrop.hidden = !isOpen;
    return;
  }
  els.shell.classList.toggle("is-collapsed");
});

els.sidebarBackdrop.addEventListener("click", () => {
  els.shell.classList.remove("is-mobile-nav-open");
  els.sidebarBackdrop.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.settingsModal.hidden) closeSettings();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    els.shell.classList.remove("is-mobile-nav-open");
    els.sidebarBackdrop.hidden = true;
  }
});

updateTime();
renderAll();
