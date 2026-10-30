const cityGroups = [
  {
    id: "gy",
    name: "贵阳市",
    regions: [
      ["gy-shi", "市辖区"],
      ["yunyan", "云岩区"],
      ["nanming", "南明区"],
      ["huaxi", "花溪区"],
      ["wudang", "乌当区"],
      ["baiyun", "白云区"],
      ["guanshanhu", "观山湖区"],
      ["kaiyang", "开阳县"],
      ["xifeng", "息烽县"],
      ["xiuwen", "修文县"],
      ["qingzhen", "清镇市"],
    ],
  },
  {
    id: "lps",
    name: "六盘水市",
    regions: [
      ["lps-zhongshan", "钟山区"],
      ["lps-shuicheng", "水城区"],
      ["lps-liuzhi", "六枝特区"],
      ["lps-panzhou", "盘州市"],
    ],
  },
  {
    id: "zy",
    name: "遵义市",
    regions: [
      ["zy-honghuagang", "红花岗区"],
      ["zy-huichuan", "汇川区"],
      ["zy-bozhou", "播州区"],
      ["zy-tongzi", "桐梓县"],
    ],
  },
  {
    id: "as",
    name: "安顺市",
    regions: [
      ["as-xixiu", "西秀区"],
      ["as-pingba", "平坝区"],
      ["as-puding", "普定县"],
    ],
  },
  {
    id: "bj",
    name: "毕节市",
    regions: [
      ["bj-qixingguan", "七星关区"],
      ["bj-dafang", "大方县"],
      ["bj-qianxi", "黔西市"],
    ],
  },
  {
    id: "tr",
    name: "铜仁市",
    regions: [
      ["tr-bijiang", "碧江区"],
      ["tr-wanshan", "万山区"],
      ["tr-jiangkuo", "江口县"],
    ],
  },
  {
    id: "ga",
    name: "贵安新区",
    regions: [["ga-direct", "贵安新区直管区"]],
  },
  {
    id: "qxn",
    name: "黔西南布依族苗族自治州",
    regions: [
      ["qxn-xingyi", "兴义市"],
      ["qxn-xingren", "兴仁市"],
      ["qxn-anlong", "安龙县"],
    ],
  },
  {
    id: "qdn",
    name: "黔东南苗族侗族自治州",
    regions: [
      ["qdn-kaili", "凯里市"],
      ["qdn-huangping", "黄平县"],
      ["qdn-shixing", "施秉县"],
    ],
  },
  {
    id: "qn",
    name: "黔南布依族苗族自治州",
    regions: [
      ["qn-duyun", "都匀市"],
      ["qn-gexin", "贵定县"],
      ["qn-libo", "荔波县"],
    ],
  },
];

const provinceRegion = {
  id: "gz",
  group: "省级",
  level: "province",
  label: "贵州省",
  path: ["贵州省"],
};

const cityRegions = cityGroups.map((city) => ({
  id: city.id,
  group: "市级",
  level: "city",
  label: city.name,
  path: ["贵州省", city.name],
  children: city.regions.map(([id, label]) => id),
}));

const leafRegions = cityGroups.flatMap((city) =>
  city.regions.map(([id, label]) => ({
    id,
    group: "区/县级",
    level: "leaf",
    label,
    path: ["贵州省", city.name, label],
    cityId: city.id,
  })),
);

provinceRegion.children = cityRegions.map((city) => city.id);

const regionOptions = [provinceRegion, ...cityRegions, ...leafRegions];
const regionMap = new Map(regionOptions.map((region) => [region.id, region]));

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
  selectedRegionId: "nanming",
  expandedRegionIds: new Set(["gz", "gy"]),
  regionSearch: "",
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
  regionSearch: document.querySelector("#regionSearch"),
  regionTree: document.querySelector("#regionTree"),
  regionCoveredTotal: document.querySelector("#regionCoveredTotal"),
  selectedRegionPath: document.querySelector("#selectedRegionPath"),
  selectedRegionTitle: document.querySelector("#selectedRegionTitle"),
  selectedRegionMeta: document.querySelector("#selectedRegionMeta"),
  selectedRegionStatus: document.querySelector("#selectedRegionStatus"),
  regionalProviderCount: document.querySelector("#regionalProviderCount"),
  toastRegion: document.querySelector("#toastRegion"),
};

function getCompany(id) {
  return companies.find((company) => company.id === id);
}

function getSelectedPlan(company) {
  return company.plans.find((plan) => plan.id === company.selectedPlanId) ?? company.plans[0];
}

function getRegion(regionId) {
  return regionMap.get(regionId);
}

function getCompanyRegions(company) {
  return company.regionIds.map(getRegion).filter(Boolean);
}

function pathsOverlap(pathA, pathB) {
  const commonLength = Math.min(pathA.length, pathB.length);
  return pathA.slice(0, commonLength).every((part, index) => part === pathB[index]);
}

function isPathPrefix(prefix, path) {
  return prefix.length <= path.length && prefix.every((part, index) => part === path[index]);
}

function getSelectedRegion() {
  return getRegion(state.selectedRegionId) || provinceRegion;
}

function getCoverageScope(company, region) {
  return getCompanyRegions(company).find((scope) => isPathPrefix(scope.path, region.path));
}

function companyCoversRegion(company, region) {
  return Boolean(getCoverageScope(company, region));
}

function companyOverlapsRegion(company, region) {
  return getCompanyRegions(company).some((scope) => pathsOverlap(scope.path, region.path));
}

function getRegionProviders(region) {
  return companies.filter((company) => company.enabled && companyCoversRegion(company, region));
}

function getRelatedRegionProviders(region) {
  return companies.filter((company) => company.enabled && companyOverlapsRegion(company, region));
}

function getRegionStatus(company, region) {
  if (!company.enabled) {
    return { label: "未启用", tone: "inactive" };
  }
  const scope = getCoverageScope(company, region);
  if (scope) {
    return {
      label: scope.id === region.id ? "本区已启用" : `由${scope.label}统保`,
      tone: "enabled",
    };
  }
  if (companyOverlapsRegion(company, region)) {
    return { label: "部分区域覆盖", tone: "partial" };
  }
  return { label: "未启用", tone: "inactive" };
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

function formatPrice(price) {
  return Number.isInteger(price) ? String(price) : price.toFixed(1);
}

function renderMetrics() {
  const activeCompanies = companies.filter((company) => company.enabled);
  const planCount = companies.reduce((total, company) => total + company.plans.length, 0);
  els.companyTotal.textContent = companies.length;
  els.activeCompanyTotal.textContent = activeCompanies.length;
  els.planTotal.textContent = planCount;
  els.regionCoveredTotal.textContent = leafRegions.length;
}

function renderCompanies() {
  els.companyTableBody.innerHTML = "";
  const selectedRegion = getSelectedRegion();
  companies.forEach((company, index) => {
    const plan = getSelectedPlan(company);
    const regionStatus = getRegionStatus(company, selectedRegion);
    const row = document.createElement("tr");
    row.className =
      regionStatus.tone === "enabled"
        ? "is-enabled"
        : regionStatus.tone === "partial"
          ? "is-related"
          : "";
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
            aria-checked="${regionStatus.tone === "enabled"}"
            aria-label="${regionStatus.tone === "enabled" ? `停用${selectedRegion.label}的${company.short}投保` : `为${selectedRegion.label}启用${company.short}投保`}"
            data-toggle-company="${company.id}"
          ></button>
          <span class="provider-status__label is-${regionStatus.tone}">
            ${regionStatus.label}
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

  els.regionalProviderCount.textContent = `${companies.length} 家保险公司`;
}

function renderAll() {
  renderMetrics();
  renderRegionTree();
  renderSelectedRegion();
  renderCompanies();
}

function renderSelectedRegion() {
  const region = getSelectedRegion();
  const providers = getRegionProviders(region);
  const relatedProviders = getRelatedRegionProviders(region);
  els.selectedRegionPath.textContent = region.path.slice(0, -1).join(" / ") || "贵州省";
  els.selectedRegionTitle.textContent = region.label;
  els.selectedRegionStatus.classList.remove("is-enabled", "is-partial");

  if (providers.length) {
    els.selectedRegionMeta.textContent = `当前由 ${providers.map((company) => company.short).join("、")} 承保`;
    els.selectedRegionStatus.textContent = providers.length > 1 ? "多家启用" : "已启用";
    els.selectedRegionStatus.classList.add("is-enabled");
  } else if (relatedProviders.length) {
    els.selectedRegionMeta.textContent = `${relatedProviders.length} 家保险公司覆盖该区域下辖范围`;
    els.selectedRegionStatus.textContent = "部分覆盖";
    els.selectedRegionStatus.classList.add("is-partial");
  } else {
    els.selectedRegionMeta.textContent = "当前区域尚未配置保险公司";
    els.selectedRegionStatus.textContent = "未配置";
  }
}

function regionMatchesSearch(region, query) {
  if (!query) return true;
  if (region.label.includes(query)) return true;
  return (region.children || [])
    .map(getRegion)
    .filter(Boolean)
    .some((child) => regionMatchesSearch(child, query));
}

function getRegionBadge(region) {
  const providers = getRegionProviders(region);
  if (providers.length === 1) {
    return { text: providers[0].short, tone: "enabled" };
  }
  if (providers.length > 1) {
    return { text: `${providers.length} 家`, tone: "enabled" };
  }
  const relatedProviders = getRelatedRegionProviders(region);
  if (relatedProviders.length) {
    return { text: `${relatedProviders.length} 家覆盖`, tone: "partial" };
  }
  return { text: "未配置", tone: "empty" };
}

function renderRegionNode(region) {
  const query = state.regionSearch.trim();
  if (!regionMatchesSearch(region, query)) return "";

  const children = (region.children || []).map(getRegion).filter(Boolean);
  const hasChildren = children.length > 0;
  const expanded = Boolean(query) || state.expandedRegionIds.has(region.id);
  const selected = state.selectedRegionId === region.id;
  const levelLabel =
    region.level === "province" ? "省级" : region.level === "city" ? "市级" : "区 / 县";
  const badge = getRegionBadge(region);

  return `
    <div class="region-tree-node" data-region-node="${region.id}">
      <div class="region-tree-node__row${selected ? " is-selected" : ""}">
        ${
          hasChildren
            ? `
              <button
                class="region-tree-node__toggle${expanded ? " is-expanded" : ""}"
                type="button"
                data-region-toggle="${region.id}"
                aria-label="${expanded ? "收起" : "展开"}${region.label}"
                aria-expanded="${expanded}"
              >
                <svg aria-hidden="true"><use href="#icon-chevron"></use></svg>
              </button>
            `
            : '<span class="region-tree-node__spacer" aria-hidden="true"></span>'
        }
        <button
          class="region-tree-node__select"
          type="button"
          role="treeitem"
          data-select-region="${region.id}"
          aria-selected="${selected}"
        >
          <span class="region-tree-node__dot" aria-hidden="true"></span>
          <span class="region-tree-node__copy">
            <strong>${region.label}</strong>
            <small>${levelLabel}</small>
          </span>
          <span class="region-tree-node__badge is-${badge.tone}">${badge.text}</span>
        </button>
      </div>
      ${
        hasChildren && expanded
          ? `<div class="region-tree-node__children">${children.map(renderRegionNode).join("")}</div>`
          : ""
      }
    </div>
  `;
}

function renderRegionTree() {
  const hasMatch = regionMatchesSearch(provinceRegion, state.regionSearch.trim());
  els.regionTree.innerHTML = hasMatch
    ? renderRegionNode(provinceRegion)
    : '<div class="region-tree-empty">没有找到匹配的区域</div>';
}

function toggleCompany(companyId) {
  const company = getCompany(companyId);
  if (!company) return;
  const region = getSelectedRegion();
  const exactScope = getCompanyRegions(company).find((scope) => scope.id === region.id);
  const inheritedScope = getCoverageScope(company, region);

  if (company.enabled && exactScope) {
    company.regionIds = company.regionIds.filter((regionId) => regionId !== region.id);
    if (!company.regionIds.length) company.enabled = false;
    showToast(`已停用「${company.short}」在${region.label}的投保服务`);
    renderAll();
    return;
  }

  if (company.enabled && inheritedScope) {
    showToast(
      `${region.label}由「${inheritedScope.label}」统一承保，请在上层区域调整 `,
      "error",
    );
    return;
  }

  const conflicts = findRegionConflicts(company, [region.id]);
  if (conflicts.length) {
    const first = conflicts[0];
    showToast(
      `无法启用：${region.path.join(" / ")} 已由「${first.company.short}」承保`,
      "error",
    );
    return;
  }

  company.regionIds = company.regionIds.filter((regionId) => {
    const scope = getRegion(regionId);
    return !scope || !isPathPrefix(region.path, scope.path);
  });
  company.regionIds.push(region.id);
  company.enabled = true;
  showToast(`已为${region.label}启用「${company.short}」投保`);
  renderAll();
}

function openSettings(companyId) {
  const company = getCompany(companyId);
  if (!company) return;
  const regionStatus = getRegionStatus(company, getSelectedRegion());
  state.editingCompanyId = companyId;
  state.draftPlanId = company.selectedPlanId;
  els.settingsLogo.textContent = company.badge;
  els.settingsLogo.style.setProperty("--provider-color", company.color);
  els.settingsCompanyName.textContent = company.name;
  els.settingsCompanyMeta.textContent = `${company.code} · ${company.contact}`;
  els.settingsStatus.textContent =
    regionStatus.tone === "enabled" ? "当前区域已启用" : "当前区域未启用";
  els.settingsStatus.classList.toggle("is-enabled", regionStatus.tone === "enabled");
  renderPlans();
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

function closeSettings() {
  state.editingCompanyId = null;
  state.draftPlanId = null;
  els.settingsModal.hidden = true;
  document.body.style.overflow = "";
}

function saveSettings() {
  const company = getCompany(state.editingCompanyId);
  if (!company || !state.draftPlanId) return;
  company.selectedPlanId = state.draftPlanId;
  const plan = getSelectedPlan(company);
  closeSettings();
  renderAll();
  showToast(`「${company.short}」已更新为${plan.name}`);
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
  }
});

els.regionSearch.addEventListener("input", (event) => {
  state.regionSearch = event.target.value;
  renderRegionTree();
});

els.regionTree.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-region-toggle]");
  if (toggleButton) {
    const regionId = toggleButton.dataset.regionToggle;
    if (state.expandedRegionIds.has(regionId)) {
      state.expandedRegionIds.delete(regionId);
    } else {
      state.expandedRegionIds.add(regionId);
    }
    renderRegionTree();
    return;
  }

  const selectButton = event.target.closest("[data-select-region]");
  if (!selectButton) return;
  state.selectedRegionId = selectButton.dataset.selectRegion;
  const region = getSelectedRegion();
  state.expandedRegionIds.add("gz");
  if (region.cityId) state.expandedRegionIds.add(region.cityId);
  renderRegionTree();
  renderSelectedRegion();
  renderCompanies();
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
