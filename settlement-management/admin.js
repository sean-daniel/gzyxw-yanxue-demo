const PROVINCE_ID = "guizhou";

const PROVINCE = {
  id: PROVINCE_ID,
  name: "贵州省",
  level: "province",
};

const ANCHORS = [
  { id: "activityStart", label: "活动开始" },
  { id: "activityEnd", label: "活动结束" },
];

const cityGroups = [
  {
    id: "guiyang",
    name: "贵阳市",
    regions: [
      createRegion("gy-shi", "市辖区", "贵阳市市辖区研学实践基地"),
      createRegion("gy-nanming", "南明区", "南明区研学实践基地"),
      createRegion("gy-yunyan", "云岩区", "云岩区研学实践基地"),
      createRegion("gy-huaxi", "花溪区", "花溪区研学实践基地"),
      createRegion("gy-wudang", "乌当区", "乌当区研学实践基地"),
      createRegion("gy-baiyun", "白云区", "白云区研学实践基地"),
      createRegion("gy-guanshanhu", "观山湖区", "观山湖区研学实践基地"),
      createRegion("gy-kaiyang", "开阳县", "开阳县研学实践基地"),
      createRegion("gy-xifeng", "息烽县", "息烽县研学实践基地"),
      createRegion("gy-xiuwen", "修文县", "修文县研学实践基地"),
      createRegion("gy-qingzhen", "清镇市", "清镇市研学实践基地"),
    ],
  },
  {
    id: "liupanshui",
    name: "六盘水市",
    regions: [
      createRegion("lps-zhongshan", "钟山区", "钟山区研学实践基地"),
      createRegion("lps-shuicheng", "水城区", "水城区研学实践基地"),
      createRegion("lps-liuzhi", "六枝特区", "六枝特区研学实践基地"),
      createRegion("lps-panzhou", "盘州市", "盘州市研学实践基地"),
    ],
  },
  {
    id: "zunyi",
    name: "遵义市",
    regions: [
      createRegion("zy-honghuagang", "红花岗区", "红花岗区研学实践基地"),
      createRegion("zy-huichuan", "汇川区", "汇川区研学实践基地"),
      createRegion("zy-bozhou", "播州区", "播州区研学实践基地"),
      createRegion("zy-tongzi", "桐梓县", "桐梓县研学实践基地"),
    ],
  },
  {
    id: "anshun",
    name: "安顺市",
    regions: [
      createRegion("as-xixiu", "西秀区", "西秀区研学实践基地"),
      createRegion("as-pingba", "平坝区", "平坝区研学实践基地"),
      createRegion("as-puding", "普定县", "普定县研学实践基地"),
    ],
  },
  {
    id: "bijie",
    name: "毕节市",
    regions: [
      createRegion("bj-qixingguan", "七星关区", "七星关区研学实践基地"),
      createRegion("bj-dafang", "大方县", "大方县研学实践基地"),
      createRegion("bj-qianxi", "黔西市", "黔西市研学实践基地"),
    ],
  },
  {
    id: "tongren",
    name: "铜仁市",
    regions: [
      createRegion("tr-bijiang", "碧江区", "碧江区研学实践基地"),
      createRegion("tr-wanshan", "万山区", "万山区研学实践基地"),
      createRegion("tr-jiangkuo", "江口县", "江口县研学实践基地"),
    ],
  },
  {
    id: "guian",
    name: "贵安新区",
    regions: [createRegion("ga-direct", "贵安新区直管区", "贵安新区研学实践基地")],
  },
  {
    id: "qianxinan",
    name: "黔西南布依族苗族自治州",
    regions: [
      createRegion("qxn-xingyi", "兴义市", "兴义市研学实践基地"),
      createRegion("qxn-xingren", "兴仁市", "兴仁市研学实践基地"),
      createRegion("qxn-anlong", "安龙县", "安龙县研学实践基地"),
    ],
  },
  {
    id: "qiandongnan",
    name: "黔东南苗族侗族自治州",
    regions: [
      createRegion("qdn-kaili", "凯里市", "凯里市研学实践基地"),
      createRegion("qdn-huangping", "黄平县", "黄平县研学实践基地"),
      createRegion("qdn-shixing", "施秉县", "施秉县研学实践基地"),
    ],
  },
  {
    id: "qiannan",
    name: "黔南布依族苗族自治州",
    regions: [
      createRegion("qn-duyun", "都匀市", "都匀市研学实践基地"),
      createRegion("qn-gexin", "贵定县", "贵定县研学实践基地"),
      createRegion("qn-libo", "荔波县", "荔波县研学实践基地"),
    ],
  },
];

function createRegion(id, name, baseName) {
  return { id, name, baseName, level: "leaf" };
}

function getLeafRegions() {
  return cityGroups.flatMap((city) =>
    city.regions.map((region) => ({
      ...region,
      cityId: city.id,
      cityName: city.name,
      level: "leaf",
    })),
  );
}

function getConfigNodes() {
  return [
    PROVINCE,
    ...cityGroups.map((city) => ({
      id: city.id,
      name: city.name,
      level: "city",
      cityId: city.id,
    })),
    ...getLeafRegions(),
  ];
}

function createDefaultConfig() {
  return {
    configured: false,
    enabled: false,
    commission: 10,
    inheritedFrom: null,
    installments: [
      {
        id: createId(),
        ratio: 100,
        anchor: "activityEnd",
        offset: 7,
      },
    ],
  };
}

const configs = Object.fromEntries(
  getConfigNodes().map((node) => [node.id, createDefaultConfig()]),
);

Object.assign(configs[PROVINCE_ID], {
  configured: true,
  enabled: true,
  commission: 10,
  installments: [
    { id: createId(), ratio: 50, anchor: "activityStart", offset: -1 },
    { id: createId(), ratio: 50, anchor: "activityEnd", offset: 7 },
  ],
});
syncDescendants(PROVINCE_ID);

Object.assign(configs.guiyang, {
  configured: true,
  enabled: true,
  commission: 12,
  inheritedFrom: null,
  installments: [
    { id: createId(), ratio: 30, anchor: "activityStart", offset: -3 },
    { id: createId(), ratio: 30, anchor: "activityStart", offset: 0 },
    { id: createId(), ratio: 40, anchor: "activityEnd", offset: 7 },
  ],
});
syncDescendants("guiyang");

const state = {
  selectedRegionId: "guiyang",
  expandedCities: new Set(["guiyang"]),
  provinceOpen: true,
  search: "",
  dirty: false,
};

const els = {
  shell: document.querySelector("#appShell"),
  menuToggle: document.querySelector("#menuToggle"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  regionTree: document.querySelector("#regionTree"),
  regionSearch: document.querySelector("#regionSearch"),
  addRegionButton: document.querySelector("#addRegionButton"),
  configuredRegionTotal: document.querySelector("#configuredRegionTotal"),
  regionTotal: document.querySelector("#regionTotal"),
  averageCommission: document.querySelector("#averageCommission"),
  pendingInstallmentTotal: document.querySelector("#pendingInstallmentTotal"),
  regionConfiguredInline: document.querySelector("#regionConfiguredInline"),
  selectedRegionMark: document.querySelector("#selectedRegionMark"),
  selectedRegionPath: document.querySelector("#selectedRegionPath"),
  selectedRegionTitle: document.querySelector("#selectedRegionTitle"),
  selectedRegionMeta: document.querySelector("#selectedRegionMeta"),
  regionSwitchLabel: document.querySelector("#regionSwitchLabel"),
  regionEnabledSwitch: document.querySelector("#regionEnabledSwitch"),
  commissionInput: document.querySelector("#commissionInput"),
  commissionRange: document.querySelector("#commissionRange"),
  commissionState: document.querySelector("#commissionState"),
  commissionAmount: document.querySelector("#commissionAmount"),
  basePayableAmount: document.querySelector("#basePayableAmount"),
  installmentRows: document.querySelector("#installmentRows"),
  installmentTotal: document.querySelector("#installmentTotal"),
  installmentValidation: document.querySelector("#installmentValidation"),
  addInstallmentButton: document.querySelector("#addInstallmentButton"),
  saveAllButton: document.querySelector("#saveAllButton"),
  masterAccountButton: document.querySelector("#masterAccountButton"),
  masterAccountName: document.querySelector("#masterAccountName"),
  masterAccountNumber: document.querySelector("#masterAccountNumber"),
  masterAccountBank: document.querySelector("#masterAccountBank"),
  masterAccountModal: document.querySelector("#masterAccountModal"),
  masterAccountClose: document.querySelector("#masterAccountClose"),
  masterAccountCancel: document.querySelector("#masterAccountCancel"),
  masterAccountForm: document.querySelector("#masterAccountForm"),
  masterAccountNameInput: document.querySelector("#masterAccountNameInput"),
  masterAccountNumberInput: document.querySelector("#masterAccountNumberInput"),
  masterAccountBankInput: document.querySelector("#masterAccountBankInput"),
  addRegionModal: document.querySelector("#addRegionModal"),
  addRegionClose: document.querySelector("#addRegionClose"),
  addRegionCancel: document.querySelector("#addRegionCancel"),
  addRegionForm: document.querySelector("#addRegionForm"),
  newRegionCity: document.querySelector("#newRegionCity"),
  newRegionName: document.querySelector("#newRegionName"),
  toastRegion: document.querySelector("#toastRegion"),
};

function createId() {
  return `rule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getRegionById(regionId) {
  return getConfigNodes().find((node) => node.id === regionId);
}

function getCurrentRegion() {
  return getRegionById(state.selectedRegionId);
}

function getCurrentConfig() {
  return configs[state.selectedRegionId];
}

function getLeafRegionsForNode(node) {
  if (!node) return [];
  if (node.level === "province") return getLeafRegions();
  if (node.level === "city") {
    return getLeafRegions().filter((region) => region.cityId === node.id);
  }
  return [node];
}

function getDescendantNodes(node) {
  if (!node) return [];
  if (node.level === "province") {
    return getConfigNodes().filter((item) => item.id !== PROVINCE_ID);
  }
  if (node.level === "city") {
    return getLeafRegions().filter((region) => region.cityId === node.id);
  }
  return [];
}

function getParentNode(node) {
  if (!node || node.level === "province") return null;
  if (node.level === "city") return PROVINCE;
  return getConfigNodes().find((item) => item.level === "city" && item.id === node.cityId) ?? null;
}

function getNodePath(node) {
  if (!node) return "";
  if (node.level === "province") return "贵州省";
  if (node.level === "city") return `贵州省 / ${node.name}`;
  return `贵州省 / ${node.cityName} / ${node.name}`;
}

function copyRule(source, target, inheritedFrom) {
  target.configured = source.configured;
  target.enabled = source.enabled;
  target.commission = source.commission;
  target.inheritedFrom = inheritedFrom;
  target.installments = source.installments.map((installment) => ({
    ...installment,
    id: createId(),
  }));
}

function syncDescendants(nodeId) {
  const node = getRegionById(nodeId);
  const source = configs[nodeId];
  if (!node || !source) return;
  getDescendantNodes(node).forEach((descendant) => {
    copyRule(source, configs[descendant.id], nodeId);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  return `¥${new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(value)}`;
}

function formatPercent(value) {
  const number = Number(value) || 0;
  return `${Number.isInteger(number) ? number : number.toFixed(1)}%`;
}

function getCommissionValues(config) {
  const commission = Math.min(100, Math.max(0, Number(config.commission) || 0));
  const baseAmount = 100000;
  const commissionAmount = (baseAmount * commission) / 100;
  return {
    commission,
    commissionAmount,
    payableAmount: baseAmount - commissionAmount,
  };
}

function getInstallmentTotal(config = getCurrentConfig()) {
  return config.installments.reduce((total, item) => total + (Number(item.ratio) || 0), 0);
}

function getConfiguredLeafRegions() {
  return getLeafRegions().filter((region) => configs[region.id]?.configured);
}

function getRuleOwners() {
  return getConfigNodes().filter((node) => {
    const config = configs[node.id];
    return config.configured && !config.inheritedFrom;
  });
}

function getRuleLabel(config) {
  if (!config.configured) return "未配置";
  if (config.inheritedFrom) return `继承 ${formatPercent(config.commission)}`;
  return formatPercent(config.commission);
}

function renderSummary() {
  const leaves = getLeafRegions();
  const covered = getConfiguredLeafRegions();
  const owners = getRuleOwners();
  const average = owners.length
    ? owners.reduce((total, node) => total + Number(configs[node.id].commission || 0), 0) /
      owners.length
    : 0;
  const installmentCount = covered.reduce(
    (total, region) => total + configs[region.id].installments.length,
    0,
  );

  els.configuredRegionTotal.textContent = covered.length;
  els.regionTotal.textContent = leaves.length;
  els.regionConfiguredInline.textContent = covered.length;
  els.averageCommission.textContent = Number.isInteger(average)
    ? average
    : average.toFixed(1);
  els.pendingInstallmentTotal.textContent = installmentCount;
}

function renderRegionTree() {
  const query = state.search.trim().toLowerCase();
  const provinceMatches = "贵州省".includes(query);
  const provinceConfig = configs[PROVINCE_ID];
  const provinceSelected = state.selectedRegionId === PROVINCE_ID;

  const parts = [
    `<div class="tree-node tree-node--province">
      <button
        class="tree-node__toggle"
        type="button"
        data-province-toggle
        aria-expanded="${state.provinceOpen}"
        aria-label="展开或收起地市"
      >
        <svg aria-hidden="true"><use href="#icon-chevron"></use></svg>
      </button>
      <button
        class="tree-node__select${provinceSelected ? " is-selected" : ""}"
        type="button"
        data-node-select="${PROVINCE_ID}"
      >
        <span class="tree-node__name">
          <i class="tree-status-dot${provinceConfig.configured ? " is-configured" : ""}"></i>
          贵州省
        </span>
        <span class="tree-node__level">省级</span>
        <span class="tree-node__rate">${getRuleLabel(provinceConfig)}</span>
      </button>
    </div>`,
  ];

  if (state.provinceOpen || query) {
    cityGroups.forEach((city) => {
      const cityMatches = city.name.toLowerCase().includes(query);
      const matchedRegions = query
        ? city.regions.filter((region) => region.name.toLowerCase().includes(query))
        : city.regions;
      if (query && !provinceMatches && !cityMatches && !matchedRegions.length) return;

      const visibleRegions = cityMatches || provinceMatches ? city.regions : matchedRegions;
      const isOpen = query ? true : state.expandedCities.has(city.id);
      const cityConfig = configs[city.id];
      const citySelected = state.selectedRegionId === city.id;

      parts.push(`
        <div class="tree-group">
          <div class="tree-node tree-node--city">
            <button
              class="tree-node__toggle"
              type="button"
              data-city-toggle="${city.id}"
              aria-expanded="${isOpen}"
              aria-label="展开或收起${city.name}"
            >
              <svg aria-hidden="true"><use href="#icon-chevron"></use></svg>
            </button>
            <button
              class="tree-node__select${citySelected ? " is-selected" : ""}"
              type="button"
              data-node-select="${city.id}"
            >
              <span class="tree-node__name">
                <i class="tree-status-dot${cityConfig.configured ? " is-configured" : ""}"></i>
                ${escapeHtml(city.name)}
              </span>
              <span class="tree-node__level">市级</span>
              <span class="tree-node__rate">${getRuleLabel(cityConfig)}</span>
            </button>
          </div>
          ${
            isOpen
              ? `<div class="tree-group__children">
                  ${visibleRegions.map((region) => renderLeafNode(region)).join("")}
                </div>`
              : ""
          }
        </div>
      `);
    });
  }

  const hasResults = parts.length > 1 || provinceMatches || state.provinceOpen;
  els.regionTree.innerHTML = hasResults
    ? parts.join("")
    : '<div class="region-tree__empty">没有匹配的市或区县</div>';
}

function renderLeafNode(region) {
  const config = configs[region.id];
  const selected = state.selectedRegionId === region.id;
  return `
    <button
      class="tree-leaf${selected ? " is-selected" : ""}"
      type="button"
      data-node-select="${region.id}"
    >
      <i class="tree-status-dot${config.configured ? " is-configured" : ""}"></i>
      <span class="tree-leaf__name">${escapeHtml(region.name)}</span>
      <span class="tree-leaf__rate">${getRuleLabel(config)}</span>
    </button>
  `;
}

function updateSelectedTexts() {
  const node = getCurrentRegion();
  const config = getCurrentConfig();
  if (!node || !config) return;

  const parent = getParentNode(node);
  if (node.level === "province") {
    els.selectedRegionMeta.textContent = `省级规则统一下发至 ${cityGroups.length} 个地市、${getLeafRegions().length} 个区县`;
  } else if (node.level === "city") {
    const childCount = cityGroups.find((city) => city.id === node.id)?.regions.length || 0;
    els.selectedRegionMeta.textContent = config.inheritedFrom
      ? `当前继承自省级规则，修改后统一下发至 ${childCount} 个区县`
      : `市级规则统一下发至 ${childCount} 个区县`;
  } else {
    els.selectedRegionMeta.textContent = config.inheritedFrom
      ? `当前继承自${parent?.name || "上级"}规则，修改后转为区县独立规则`
      : config.configured
        ? "当前区域使用区县独立分账规则"
        : "尚未配置，修改后将生成区县独立规则";
  }

  if (node.level === "province") {
    els.commissionState.textContent = "省级统一下发";
  } else if (node.level === "city") {
    els.commissionState.textContent = config.inheritedFrom ? "继承省级" : "市级统一下发";
  } else if (config.inheritedFrom) {
    els.commissionState.textContent = `继承自${parent?.name || "上级"}`;
  } else {
    els.commissionState.textContent = config.configured ? "区县独立规则" : "默认模板";
  }

  els.regionSwitchLabel.textContent = config.enabled ? "规则已启用" : "规则未启用";
  els.regionEnabledSwitch.setAttribute("aria-checked", String(config.enabled));
  els.regionEnabledSwitch.setAttribute(
    "aria-label",
    config.enabled ? "停用当前区域分账规则" : "启用当前区域分账规则",
  );
}

function renderSelectedRegion() {
  const node = getCurrentRegion();
  const config = getCurrentConfig();
  if (!node || !config) return;

  const mark =
    node.level === "province"
      ? "黔"
      : node.name.replace(/[区县市]$/, "").slice(0, 1) || "黔";
  els.selectedRegionMark.textContent = mark;
  els.selectedRegionPath.textContent = getNodePath(node);
  els.selectedRegionTitle.textContent = node.name;
  updateSelectedTexts();
  renderCommission();
  renderInstallments();
  renderInstallmentValidation();
}

function renderCommission() {
  const config = getCurrentConfig();
  const values = getCommissionValues(config);
  els.commissionInput.value = values.commission;
  els.commissionRange.value = Math.min(values.commission, Number(els.commissionRange.max));
  updateRangeProgress();
  els.commissionAmount.textContent = formatMoney(values.commissionAmount);
  els.basePayableAmount.textContent = formatMoney(values.payableAmount);
}

function getRuleText(installment) {
  const anchor = ANCHORS.find((item) => item.id === installment.anchor);
  const offset = Math.max(-365, Math.min(365, Number(installment.offset) || 0));
  if (offset === 0) return `${anchor?.label || "活动结束"}的当天`;
  return `${anchor?.label || "活动结束"}的${offset < 0 ? "前" : "后"}${Math.abs(offset)}天`;
}

function renderInstallments() {
  const config = getCurrentConfig();
  els.installmentRows.innerHTML = config.installments
    .map((installment, index) => {
      const offset = Math.max(-365, Math.min(365, Number(installment.offset) || 0));
      return `
        <div class="installment-row" data-installment-row="${installment.id}">
          <span class="installment-index" data-index="${String(index + 1).padStart(2, "0")}">
            第 ${index + 1} 期
          </span>
          <label class="installment-ratio" aria-label="第 ${index + 1} 期打款比例">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              inputmode="decimal"
              value="${Number(installment.ratio) || 0}"
              data-installment-ratio="${installment.id}"
            />
            <span>%</span>
          </label>
          <div class="anchor-field">
            <select data-installment-anchor="${installment.id}" aria-label="第 ${index + 1} 期时间锚点">
              ${ANCHORS.map(
                (item) => `
                  <option value="${item.id}" ${item.id === installment.anchor ? "selected" : ""}>
                    ${item.label}
                  </option>
                `,
              ).join("")}
            </select>
          </div>
          <div class="offset-field">
            <div class="offset-stepper" aria-label="第 ${index + 1} 期相对锚点天数">
              <button
                type="button"
                data-offset-step="-1"
                data-offset-installment="${installment.id}"
                aria-label="第 ${index + 1} 期天数减 1"
              >−</button>
              <input
                class="anchor-rule__offset"
                type="number"
                min="-365"
                max="365"
                step="1"
                inputmode="numeric"
                value="${offset}"
                data-installment-offset="${installment.id}"
                aria-label="第 ${index + 1} 期相对锚点天数，可为负数"
              />
              <button
                type="button"
                data-offset-step="1"
                data-offset-installment="${installment.id}"
                aria-label="第 ${index + 1} 期天数加 1"
              >+</button>
            </div>
            <span class="anchor-rule__unit">天</span>
          </div>
          <span class="rule-description" data-installment-rule-text="${installment.id}">
            说明：${getRuleText(installment)}
          </span>
          <button
            class="remove-installment"
            type="button"
            data-remove-installment="${installment.id}"
            aria-label="删除第 ${index + 1} 期"
            ${config.installments.length === 1 ? "disabled" : ""}
          >
            <svg aria-hidden="true"><use href="#icon-trash"></use></svg>
          </button>
        </div>
      `;
    })
    .join("");
}

function renderInstallmentValidation() {
  const config = getCurrentConfig();
  const total = getInstallmentTotal();
  const emptyRatioIndex = config.installments.findIndex(
    (item) => !Number.isFinite(Number(item.ratio)) || Number(item.ratio) <= 0,
  );
  const valid = Math.abs(total - 100) < 0.001 && emptyRatioIndex === -1;
  els.installmentTotal.textContent = formatPercent(total);
  const totalCard = els.installmentTotal.closest(".installments-card__summary");
  totalCard?.classList.toggle("is-invalid", !valid);
  els.installmentValidation.classList.toggle("is-invalid", !valid);

  let message = "分期比例合计为 100%，可直接保存";
  if (emptyRatioIndex !== -1) {
    message = `第 ${emptyRatioIndex + 1} 期打款比例需大于 0%`;
  } else if (total > 100) {
    message = `分期比例已超出 ${formatPercent(total - 100)}，请调整`;
  } else if (total < 100) {
    message = `还需补充 ${formatPercent(100 - total)} 才能保存`;
  }
  els.installmentValidation.querySelector("span:last-child").textContent = message;
}

function refreshCalculatedInstallments() {
  getCurrentConfig().installments.forEach((installment) => {
    const ruleTextEl = document.querySelector(`[data-installment-rule-text="${installment.id}"]`);
    if (ruleTextEl) {
      ruleTextEl.textContent = `说明：${getRuleText(installment)}`;
    }
  });
  renderInstallmentValidation();
  renderSummary();
}

function updateRangeProgress() {
  const max = Number(els.commissionRange.max) || 50;
  const value = Number(els.commissionRange.value) || 0;
  const progress = Math.min(100, (value / max) * 100);
  els.commissionRange.style.setProperty("--range-progress", `${progress}%`);
}

function markConfigEdited() {
  const node = getCurrentRegion();
  const config = getCurrentConfig();
  config.configured = true;
  config.inheritedFrom = null;
  state.dirty = true;
  if (node.level !== "leaf") syncDescendants(node.id);
  updateSelectedTexts();
  renderSummary();
  renderRegionTree();
}

function selectRegion(regionId) {
  if (!getRegionById(regionId)) return;
  state.selectedRegionId = regionId;
  const node = getRegionById(regionId);
  if (node.level === "city") state.expandedCities.add(node.id);
  renderRegionTree();
  renderSelectedRegion();
}

function openModal(modal) {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.hidden = true;
  if ([els.addRegionModal, els.masterAccountModal].every((item) => item.hidden)) {
    document.body.style.overflow = "";
  }
}

function populateNewRegionCities() {
  els.newRegionCity.innerHTML = cityGroups
    .map((city) => `<option value="${city.id}">${escapeHtml(city.name)}</option>`)
    .join("");
  const current = getCurrentRegion();
  if (current?.level === "leaf") els.newRegionCity.value = current.cityId;
  if (current?.level === "city") els.newRegionCity.value = current.id;
}

function addRegion(event) {
  event.preventDefault();
  const cityId = els.newRegionCity.value;
  const city = cityGroups.find((item) => item.id === cityId);
  const name = els.newRegionName.value.trim();
  if (!city || !name) return;
  if (city.regions.some((region) => region.name === name)) {
    showToast(`「${name}」已存在于${city.name}，无需重复新增`, "error");
    return;
  }

  const id = `custom-${Date.now()}`;
  const region = createRegion(id, name, `${name}研学实践基地`);
  city.regions.push(region);
  configs[id] = createDefaultConfig();
  if (configs[city.id].configured) {
    copyRule(configs[city.id], configs[id], city.id);
  }
  state.expandedCities.add(city.id);
  state.provinceOpen = true;
  state.search = "";
  els.regionSearch.value = "";
  closeModal(els.addRegionModal);
  els.addRegionForm.reset();
  populateNewRegionCities();
  selectRegion(id);
  renderSummary();
  showToast(`已新增「${city.name} / ${name}」，默认继承市级规则`);
}

function validateAllConfigs() {
  for (const node of getRuleOwners()) {
    const config = configs[node.id];
    const commission = Number(config.commission);
    if (!Number.isFinite(commission) || commission < 0 || commission > 100) {
      return { node, message: `${node.name} 的抽成比例需在 0% - 100% 之间` };
    }
    const total = getInstallmentTotal(config);
    if (Math.abs(total - 100) > 0.001) {
      return {
        node,
        message: `${node.name} 的分期比例合计需为 100%，当前为 ${formatPercent(total)}`,
      };
    }
    if (
      config.installments.some(
        (item) =>
          !Number.isFinite(Number(item.ratio)) ||
          Number(item.ratio) <= 0 ||
          Number(item.ratio) > 100,
      )
    ) {
      return { node, message: `${node.name} 存在无效的分期比例` };
    }
  }
  return null;
}

function saveAllConfigs() {
  const error = validateAllConfigs();
  if (error) {
    selectRegion(error.node.id);
    showToast(error.message, "error");
    return;
  }

  state.dirty = false;
  renderRegionTree();
  renderSummary();
  showToast(
    `已保存 ${getRuleOwners().length} 条独立规则，覆盖 ${getConfiguredLeafRegions().length} 个区县`,
  );
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " toast--error" : ""}`;
  toast.innerHTML = `
    <span class="toast__icon">
      <svg aria-hidden="true"><use href="#icon-${type === "error" ? "close" : "check"}"></use></svg>
    </span>
    <span>${escapeHtml(message)}</span>
  `;
  els.toastRegion.append(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  }, 2800);
}

els.regionTree.addEventListener("click", (event) => {
  const provinceToggle = event.target.closest("[data-province-toggle]");
  if (provinceToggle) {
    state.provinceOpen = !state.provinceOpen;
    renderRegionTree();
    return;
  }

  const cityToggle = event.target.closest("[data-city-toggle]");
  if (cityToggle) {
    const cityId = cityToggle.dataset.cityToggle;
    if (state.expandedCities.has(cityId)) {
      state.expandedCities.delete(cityId);
    } else {
      state.expandedCities.add(cityId);
    }
    renderRegionTree();
    return;
  }

  const nodeButton = event.target.closest("[data-node-select]");
  if (nodeButton) selectRegion(nodeButton.dataset.nodeSelect);
});

els.regionSearch.addEventListener("input", () => {
  state.search = els.regionSearch.value;
  renderRegionTree();
});

els.commissionInput.addEventListener("input", () => {
  const nextValue = Math.min(100, Math.max(0, Number(els.commissionInput.value) || 0));
  getCurrentConfig().commission = nextValue;
  markConfigEdited();
  const values = getCommissionValues(getCurrentConfig());
  els.commissionAmount.textContent = formatMoney(values.commissionAmount);
  els.basePayableAmount.textContent = formatMoney(values.payableAmount);
  els.commissionRange.value = Math.min(nextValue, Number(els.commissionRange.max));
  updateRangeProgress();
  refreshCalculatedInstallments();
});

els.commissionRange.addEventListener("input", () => {
  getCurrentConfig().commission = Number(els.commissionRange.value);
  markConfigEdited();
  els.commissionInput.value = els.commissionRange.value;
  updateRangeProgress();
  const values = getCommissionValues(getCurrentConfig());
  els.commissionAmount.textContent = formatMoney(values.commissionAmount);
  els.basePayableAmount.textContent = formatMoney(values.payableAmount);
  refreshCalculatedInstallments();
});

els.installmentRows.addEventListener("input", (event) => {
  const ratioInput = event.target.closest("[data-installment-ratio]");
  const offsetInput = event.target.closest("[data-installment-offset]");
  if (!ratioInput && !offsetInput) return;

  const id = ratioInput?.dataset.installmentRatio || offsetInput?.dataset.installmentOffset;
  const installment = getCurrentConfig().installments.find((item) => item.id === id);
  if (!installment) return;
  if (ratioInput) {
    installment.ratio = Math.min(100, Math.max(0, Number(ratioInput.value) || 0));
  }
  if (offsetInput) {
    installment.offset = Math.max(-365, Math.min(365, Number(offsetInput.value) || 0));
    offsetInput.value = installment.offset;
  }
  markConfigEdited();
  refreshCalculatedInstallments();
});

els.installmentRows.addEventListener("change", (event) => {
  const anchorSelect = event.target.closest("[data-installment-anchor]");
  if (!anchorSelect) return;

  const installment = getCurrentConfig().installments.find(
    (item) => item.id === anchorSelect.dataset.installmentAnchor,
  );
  if (!installment) return;
  installment.anchor = anchorSelect.value;
  markConfigEdited();
  refreshCalculatedInstallments();
});

els.installmentRows.addEventListener("click", (event) => {
  const stepButton = event.target.closest("[data-offset-step]");
  if (stepButton) {
    const installment = getCurrentConfig().installments.find(
      (item) => item.id === stepButton.dataset.offsetInstallment,
    );
    if (!installment) return;
    installment.offset = Math.max(
      -365,
      Math.min(365, (Number(installment.offset) || 0) + Number(stepButton.dataset.offsetStep)),
    );
    markConfigEdited();
    renderInstallments();
    refreshCalculatedInstallments();
    return;
  }

  const removeButton = event.target.closest("[data-remove-installment]");
  if (!removeButton) return;
  const config = getCurrentConfig();
  if (config.installments.length <= 1) return;
  config.installments = config.installments.filter(
    (item) => item.id !== removeButton.dataset.removeInstallment,
  );
  markConfigEdited();
  renderInstallments();
  refreshCalculatedInstallments();
});

els.addInstallmentButton.addEventListener("click", () => {
  const config = getCurrentConfig();
  const remaining = Math.max(0, 100 - getInstallmentTotal(config));
  config.installments.push({
    id: createId(),
    ratio: remaining,
    anchor: "activityEnd",
    offset: 7,
  });
  markConfigEdited();
  renderInstallments();
  refreshCalculatedInstallments();
});

els.regionEnabledSwitch.addEventListener("click", () => {
  const config = getCurrentConfig();
  config.enabled = !config.enabled;
  markConfigEdited();
  renderSelectedRegion();
  showToast(config.enabled ? "当前规则已启用" : "当前规则已停用");
});

els.saveAllButton.addEventListener("click", saveAllConfigs);

els.addRegionButton.addEventListener("click", () => {
  populateNewRegionCities();
  openModal(els.addRegionModal);
  requestAnimationFrame(() => els.newRegionName.focus());
});

els.addRegionClose.addEventListener("click", () => closeModal(els.addRegionModal));
els.addRegionCancel.addEventListener("click", () => closeModal(els.addRegionModal));
els.addRegionForm.addEventListener("submit", addRegion);
els.addRegionModal.addEventListener("click", (event) => {
  if (event.target === els.addRegionModal) closeModal(els.addRegionModal);
});

els.masterAccountButton.addEventListener("click", () => {
  els.masterAccountNameInput.value = els.masterAccountName.textContent.trim();
  els.masterAccountNumberInput.value = els.masterAccountNumber.textContent.trim();
  els.masterAccountBankInput.value = els.masterAccountBank.textContent.trim();
  openModal(els.masterAccountModal);
  requestAnimationFrame(() => els.masterAccountNameInput.focus());
});
els.masterAccountClose.addEventListener("click", () => closeModal(els.masterAccountModal));
els.masterAccountCancel.addEventListener("click", () => closeModal(els.masterAccountModal));
els.masterAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.masterAccountName.textContent = els.masterAccountNameInput.value.trim();
  els.masterAccountNumber.textContent = els.masterAccountNumberInput.value.trim();
  els.masterAccountBank.textContent = els.masterAccountBankInput.value.trim();
  closeModal(els.masterAccountModal);
  showToast("总收款账户信息已保存");
});
els.masterAccountModal.addEventListener("click", (event) => {
  if (event.target === els.masterAccountModal) closeModal(els.masterAccountModal);
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
  if (event.key !== "Escape") return;
  if (!els.addRegionModal.hidden) closeModal(els.addRegionModal);
  if (!els.masterAccountModal.hidden) closeModal(els.masterAccountModal);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    els.shell.classList.remove("is-mobile-nav-open");
    els.sidebarBackdrop.hidden = true;
  }
});

window.addEventListener("beforeunload", (event) => {
  if (!state.dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

renderSummary();
renderRegionTree();
renderSelectedRegion();
