const records = [
  {
    id: "PAY-20261028-001",
    project: "南明区秋季研学实践活动",
    base: "南明区研学实践基地",
    region: "贵阳市",
    cityPath: "贵阳市 / 南明区",
    amount: 32800,
    ratio: 40,
    paidAt: "2026-10-28T14:36:00+08:00",
    status: "success",
    installment: "第 2 期 / 共 3 期",
    rule: "活动开始前 3 天",
    bankName: "中国工商银行",
    accountNumber: "6222 **** **** 4821",
    holder: "张明远",
    phone: "138 **** 2618",
    bankBranch: "中国工商银行贵阳南明支行",
    serial: "202610281436020081",
    note: "南明区秋季研学活动第二期基地分账",
  },
  {
    id: "PAY-20261026-002",
    project: "云岩区非遗文化研学活动",
    base: "云岩区研学实践基地",
    region: "贵阳市",
    cityPath: "贵阳市 / 云岩区",
    amount: 24600,
    ratio: 30,
    paidAt: "2026-10-26T10:18:00+08:00",
    status: "success",
    installment: "第 3 期 / 共 3 期",
    rule: "活动结束后 7 天",
    bankName: "中国建设银行",
    accountNumber: "6217 **** **** 9036",
    holder: "李文静",
    phone: "139 **** 7052",
    bankBranch: "中国建设银行贵阳云岩支行",
    serial: "202610261018020114",
    note: "云岩区非遗文化研学活动结项分账",
  },
  {
    id: "PAY-20261024-003",
    project: "红花岗区红色研学实践教育活动",
    base: "红花岗区研学实践基地",
    region: "遵义市",
    cityPath: "遵义市 / 红花岗区",
    amount: 42000,
    ratio: 35,
    paidAt: "2026-10-24T09:05:00+08:00",
    status: "processing",
    installment: "第 1 期 / 共 2 期",
    rule: "活动开始前 3 天",
    bankName: "中国农业银行",
    accountNumber: "6228 **** **** 1750",
    holder: "周海宁",
    phone: "136 **** 4189",
    bankBranch: "中国农业银行遵义红花岗支行",
    serial: "202610240905020037",
    note: "红色研学项目首期基地分账",
  },
  {
    id: "PAY-20261023-004",
    project: "西秀区自然探索研学营",
    base: "西秀区研学实践基地",
    region: "安顺市",
    cityPath: "安顺市 / 西秀区",
    amount: 26800,
    ratio: 20,
    paidAt: "2026-10-23T16:40:00+08:00",
    status: "waiting",
    installment: "第 1 期 / 共 3 期",
    rule: "活动开始前 1 天",
    bankName: "中国银行",
    accountNumber: "6216 **** **** 5208",
    holder: "陈雨桐",
    phone: "137 **** 6631",
    bankBranch: "中国银行安顺西秀支行",
    serial: "202610231640020056",
    note: "自然探索研学营首期分账待执行",
  },
  {
    id: "PAY-20261018-005",
    project: "荔波县生态科考研学活动",
    base: "荔波县研学实践基地",
    region: "黔南州",
    cityPath: "黔南州 / 荔波县",
    amount: 31500,
    ratio: 25,
    paidAt: "2026-10-18T11:22:00+08:00",
    status: "success",
    installment: "第 2 期 / 共 3 期",
    rule: "活动开始后 2 天",
    bankName: "中国邮政储蓄银行",
    accountNumber: "6217 **** **** 3462",
    holder: "罗晓峰",
    phone: "135 **** 9074",
    bankBranch: "中国邮政储蓄银行荔波县支行",
    serial: "202610181122020093",
    note: "生态科考研学活动第二期基地分账",
  },
  {
    id: "PAY-20261016-006",
    project: "观山湖区科技研学活动",
    base: "观山湖区研学实践基地",
    region: "贵阳市",
    cityPath: "贵阳市 / 观山湖区",
    amount: 22800,
    ratio: 20,
    paidAt: "2026-10-16T15:10:00+08:00",
    status: "failed",
    installment: "第 1 期 / 共 4 期",
    rule: "活动开始前 2 天",
    bankName: "中国工商银行",
    accountNumber: "6222 **** **** 6173",
    holder: "赵欣怡",
    phone: "188 **** 2056",
    bankBranch: "中国工商银行贵阳观山湖支行",
    serial: "202610161510020126",
    note: "收款账户信息校验未通过，需重新发起",
  },
  {
    id: "PAY-20261012-007",
    project: "钟山区高原户外研学活动",
    base: "钟山区研学实践基地",
    region: "六盘水市",
    cityPath: "六盘水市 / 钟山区",
    amount: 18800,
    ratio: 100,
    paidAt: "2026-10-12T13:48:00+08:00",
    status: "success",
    installment: "第 1 期 / 共 1 期",
    rule: "活动结束后 7 天",
    bankName: "中国农业银行",
    accountNumber: "6228 **** **** 8915",
    holder: "王思远",
    phone: "150 **** 3720",
    bankBranch: "中国农业银行六盘水钟山支行",
    serial: "202610121348020064",
    note: "高原户外研学活动一次性基地分账",
  },
  {
    id: "PAY-20261008-008",
    project: "七星关区人文历史研学活动",
    base: "七星关区研学实践基地",
    region: "毕节市",
    cityPath: "毕节市 / 七星关区",
    amount: 23600,
    ratio: 30,
    paidAt: "2026-10-08T09:32:00+08:00",
    status: "success",
    installment: "第 2 期 / 共 3 期",
    rule: "活动开始前 5 天",
    bankName: "中国建设银行",
    accountNumber: "6217 **** **** 2284",
    holder: "孙嘉禾",
    phone: "151 **** 8463",
    bankBranch: "中国建设银行毕节七星关支行",
    serial: "202610080932020018",
    note: "人文历史研学活动第二期基地分账",
  },
  {
    id: "PAY-20261005-009",
    project: "碧江区传统文化研学活动",
    base: "碧江区研学实践基地",
    region: "铜仁市",
    cityPath: "铜仁市 / 碧江区",
    amount: 27400,
    ratio: 40,
    paidAt: "2026-10-05T17:26:00+08:00",
    status: "processing",
    installment: "第 1 期 / 共 2 期",
    rule: "活动开始后 1 天",
    bankName: "中国银行",
    accountNumber: "6216 **** **** 7301",
    holder: "吴书瑶",
    phone: "186 **** 5197",
    bankBranch: "中国银行铜仁碧江支行",
    serial: "202610051726020089",
    note: "传统文化研学活动首期基地分账",
  },
  {
    id: "PAY-20260929-010",
    project: "凯里市苗侗文化研学活动",
    base: "凯里市研学实践基地",
    region: "黔东南州",
    cityPath: "黔东南州 / 凯里市",
    amount: 21300,
    ratio: 30,
    paidAt: "2026-09-29T10:42:00+08:00",
    status: "success",
    installment: "第 3 期 / 共 3 期",
    rule: "活动结束后 7 天",
    bankName: "中国邮政储蓄银行",
    accountNumber: "6217 **** **** 1058",
    holder: "杨启航",
    phone: "187 **** 2834",
    bankBranch: "中国邮政储蓄银行凯里市支行",
    serial: "202609291042020042",
    note: "苗侗文化研学活动结项基地分账",
  },
];

const STATUS_META = {
  success: { label: "打款成功", className: "is-success" },
  processing: { label: "处理中", className: "is-processing" },
  waiting: { label: "待打款", className: "is-waiting" },
  failed: { label: "打款失败", className: "is-failed" },
};

const state = {
  keyword: "",
  region: "",
  status: "",
  period: "",
  activeRecordId: null,
};

const els = {
  shell: document.querySelector("#appShell"),
  menuToggle: document.querySelector("#menuToggle"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  keywordFilter: document.querySelector("#keywordFilter"),
  regionFilter: document.querySelector("#regionFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  periodFilter: document.querySelector("#periodFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  recordsTableBody: document.querySelector("#recordsTableBody"),
  recordsEmpty: document.querySelector("#recordsEmpty"),
  visibleCount: document.querySelector("#visibleCount"),
  paidAmount: document.querySelector("#paidAmount"),
  processingAmount: document.querySelector("#processingAmount"),
  recordCount: document.querySelector("#recordCount"),
  projectCount: document.querySelector("#projectCount"),
  successRate: document.querySelector("#successRate"),
  exportButton: document.querySelector("#exportButton"),
  detailModal: document.querySelector("#detailModal"),
  detailModalSubtitle: document.querySelector("#detailModalSubtitle"),
  detailContent: document.querySelector("#detailContent"),
  detailClose: document.querySelector("#detailClose"),
  detailDone: document.querySelector("#detailDone"),
  copyAccountButton: document.querySelector("#copyAccountButton"),
  toastRegion: document.querySelector("#toastRegion"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  return `¥${new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatTime(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function getPeriodStart(period) {
  if (!period) return null;
  const now = new Date();
  const start = new Date(now);
  if (period === "month") start.setDate(now.getDate() - 30);
  if (period === "quarter") start.setDate(now.getDate() - 90);
  if (period === "year") start.setMonth(0, 1);
  start.setHours(0, 0, 0, 0);
  return start;
}

function getFilteredRecords() {
  const keyword = state.keyword.trim().toLowerCase();
  const periodStart = getPeriodStart(state.period);
  return records.filter((record) => {
    const haystack = [
      record.project,
      record.base,
      record.cityPath,
      record.id,
      record.serial,
      record.holder,
    ]
      .join(" ")
      .toLowerCase();
    const matchesKeyword = !keyword || haystack.includes(keyword);
    const matchesRegion = !state.region || record.region === state.region;
    const matchesStatus = !state.status || record.status === state.status;
    const matchesPeriod = !periodStart || new Date(record.paidAt) >= periodStart;
    return matchesKeyword && matchesRegion && matchesStatus && matchesPeriod;
  });
}

function renderSummary(filteredRecords) {
  const paidTotal = filteredRecords
    .filter((record) => record.status === "success")
    .reduce((total, record) => total + record.amount, 0);
  const processingTotal = filteredRecords
    .filter((record) => record.status === "processing" || record.status === "waiting")
    .reduce((total, record) => total + record.amount, 0);
  const successCount = filteredRecords.filter((record) => record.status === "success").length;
  const successRate = filteredRecords.length
    ? (successCount / filteredRecords.length) * 100
    : 0;
  const projectCount = new Set(filteredRecords.map((record) => record.project)).size;

  els.paidAmount.textContent = formatMoney(paidTotal);
  els.processingAmount.textContent = formatMoney(processingTotal);
  els.recordCount.textContent = filteredRecords.length;
  els.projectCount.textContent = projectCount;
  els.successRate.textContent = `${successRate.toFixed(successRate % 1 ? 1 : 0)}%`;
}

function renderRecords() {
  const filteredRecords = getFilteredRecords();
  els.visibleCount.textContent = filteredRecords.length;
  els.recordsEmpty.hidden = filteredRecords.length > 0;
  els.recordsTableBody.innerHTML = filteredRecords
    .map((record) => {
      const meta = STATUS_META[record.status];
      return `
        <tr>
          <td data-label="打款项目">
            <div class="record-project">
              <span class="record-project__mark"><svg aria-hidden="true"><use href="#icon-building"></use></svg></span>
              <span class="record-project__text">
                <strong>${escapeHtml(record.project)}</strong>
                <small>${escapeHtml(record.base)} · ${escapeHtml(record.cityPath)}</small>
              </span>
            </div>
          </td>
          <td data-label="打款期次">
            <span class="record-installment">${escapeHtml(record.installment)}</span>
          </td>
          <td data-label="打款金额">
            <span class="record-amount">
              <strong>${formatMoney(record.amount)}</strong>
            </span>
          </td>
          <td data-label="打款比例">
            <span class="record-ratio">
              <strong>${record.ratio}%</strong>
              <span class="record-ratio__bar"><i style="--ratio: ${record.ratio}%"></i></span>
            </span>
          </td>
          <td data-label="打款时间">
            <span class="record-time">
              <strong>${formatDate(record.paidAt)}</strong>
              <small>${formatTime(record.paidAt)}</small>
            </span>
          </td>
          <td data-label="状态">
            <span class="record-status ${meta.className}">${meta.label}</span>
          </td>
          <td data-label="操作">
            <button class="record-detail-button" type="button" data-record-id="${record.id}">
              查看详情
              <svg aria-hidden="true"><use href="#icon-chevron-right"></use></svg>
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
  renderSummary(filteredRecords);
}

function renderRecordDetail(record) {
  const meta = STATUS_META[record.status];
  return `
    <div class="record-detail-hero">
      <div class="record-detail-hero__title">
        <span>${escapeHtml(record.id)}</span>
        <h3>${escapeHtml(record.project)}</h3>
        <p>${escapeHtml(record.cityPath)} · ${escapeHtml(record.base)}</p>
      </div>
      <div class="record-detail-hero__amount">
        <span class="record-status ${meta.className}">${meta.label}</span>
        <strong>${formatMoney(record.amount)}</strong>
      </div>
    </div>

    <section class="record-detail-section" aria-labelledby="recipientTitle">
      <header class="record-detail-section__title">
        <h3 id="recipientTitle">收款方账户</h3>
        <span>打款到对方账户的账户及联系人</span>
      </header>
      <div class="recipient-card">
        <header class="recipient-card__head">
          <span class="recipient-card__icon"><svg aria-hidden="true"><use href="#icon-bank"></use></svg></span>
          <div>
            <h3>${escapeHtml(record.bankName)}</h3>
            <p>${escapeHtml(record.bankBranch)}</p>
          </div>
          <span class="recipient-card__tag">对私账户</span>
        </header>
        <div class="recipient-card__grid">
          <div class="recipient-field">
            <span><svg aria-hidden="true"><use href="#icon-wallet"></use></svg>收款账户</span>
            <strong>${escapeHtml(record.accountNumber)}</strong>
          </div>
          <div class="recipient-field">
            <span><svg aria-hidden="true"><use href="#icon-user"></use></svg>收款姓名</span>
            <strong>${escapeHtml(record.holder)}</strong>
          </div>
          <div class="recipient-field">
            <span><svg aria-hidden="true"><use href="#icon-phone"></use></svg>手机号</span>
            <strong>${escapeHtml(record.phone)}</strong>
          </div>
          <div class="recipient-field">
            <span><svg aria-hidden="true"><use href="#icon-bank"></use></svg>开户行</span>
            <strong>${escapeHtml(record.bankBranch)}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="record-detail-section" aria-labelledby="paymentInfoTitle">
      <header class="record-detail-section__title">
        <h3 id="paymentInfoTitle">打款信息</h3>
        <span>款项已按当前区域分账规则计算</span>
      </header>
      <div class="record-detail-grid">
        <div class="record-detail-item">
          <span>打款项目</span>
          <strong>${escapeHtml(record.project)}</strong>
        </div>
        <div class="record-detail-item">
          <span>打款金额</span>
          <strong>${formatMoney(record.amount)}</strong>
        </div>
        <div class="record-detail-item">
          <span>打款比例</span>
          <strong>${record.ratio}%</strong>
        </div>
        <div class="record-detail-item">
          <span>打款时间</span>
          <strong>${formatDate(record.paidAt)} ${formatTime(record.paidAt)}</strong>
        </div>
        <div class="record-detail-item">
          <span>分期批次</span>
          <strong>${escapeHtml(record.installment)}</strong>
        </div>
        <div class="record-detail-item">
          <span>触发规则</span>
          <strong>${escapeHtml(record.rule)}</strong>
        </div>
      </div>
    </section>

    <section class="record-detail-section" aria-labelledby="tradeInfoTitle">
      <header class="record-detail-section__title">
        <h3 id="tradeInfoTitle">交易信息</h3>
      </header>
      <div class="record-detail-grid">
        <div class="record-detail-item">
          <span>交易流水号</span>
          <strong>${escapeHtml(record.serial)}</strong>
        </div>
        <div class="record-detail-item">
          <span>打款备注</span>
          <strong>${escapeHtml(record.note)}</strong>
        </div>
        <div class="record-detail-item">
          <span>数据说明</span>
          <strong>原型演示数据</strong>
        </div>
      </div>
    </section>

    <p class="record-detail-footnote">
      <svg aria-hidden="true"><use href="#icon-info"></use></svg>
      收款账户、姓名和手机号均为演示数据，仅用于展示打款核对与详情查看流程。
    </p>
  `;
}

function openRecordDetail(recordId) {
  const record = records.find((item) => item.id === recordId);
  if (!record) return;
  state.activeRecordId = record.id;
  els.detailModalSubtitle.textContent = `${record.id} · ${record.base}`;
  els.detailContent.innerHTML = renderRecordDetail(record);
  els.detailModal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => els.detailClose.focus());
}

function closeRecordDetail() {
  els.detailModal.hidden = true;
  state.activeRecordId = null;
  document.body.style.overflow = "";
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast${type === "error" ? " toast--error" : ""}`;
  toast.innerHTML = `
    <span class="toast__icon"><svg><use href="#icon-${type === "error" ? "close" : "check"}"></use></svg></span>
    <span>${escapeHtml(message)}</span>
  `;
  els.toastRegion.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 180);
  }, 2400);
}

function resetFilters() {
  state.keyword = "";
  state.region = "";
  state.status = "";
  state.period = "";
  els.keywordFilter.value = "";
  els.regionFilter.value = "";
  els.statusFilter.value = "";
  els.periodFilter.value = "";
  renderRecords();
}

async function copyActiveAccount() {
  const record = records.find((item) => item.id === state.activeRecordId);
  if (!record) return;
  const text = [
    `收款银行：${record.bankName}`,
    `开户行：${record.bankBranch}`,
    `收款账户：${record.accountNumber}`,
    `收款姓名：${record.holder}`,
    `手机号：${record.phone}`,
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    showToast("收款账户信息已复制");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast("收款账户信息已复制");
  }
}

els.keywordFilter.addEventListener("input", (event) => {
  state.keyword = event.target.value;
  renderRecords();
});

els.regionFilter.addEventListener("change", (event) => {
  state.region = event.target.value;
  renderRecords();
});

els.statusFilter.addEventListener("change", (event) => {
  state.status = event.target.value;
  renderRecords();
});

els.periodFilter.addEventListener("change", (event) => {
  state.period = event.target.value;
  renderRecords();
});

els.resetFilters.addEventListener("click", resetFilters);
document.querySelector("[data-reset-empty]").addEventListener("click", resetFilters);

els.recordsTableBody.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-record-id]");
  if (detailButton) openRecordDetail(detailButton.dataset.recordId);
});

els.exportButton.addEventListener("click", () => {
  const count = getFilteredRecords().length;
  showToast(`已创建 ${count} 笔打款记录的导出任务`);
});

els.detailClose.addEventListener("click", closeRecordDetail);
els.detailDone.addEventListener("click", closeRecordDetail);
els.copyAccountButton.addEventListener("click", copyActiveAccount);
els.detailModal.addEventListener("click", (event) => {
  if (event.target === els.detailModal) closeRecordDetail();
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
  if (!els.detailModal.hidden) closeRecordDetail();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    els.shell.classList.remove("is-mobile-nav-open");
    els.sidebarBackdrop.hidden = true;
  }
});

renderRecords();
