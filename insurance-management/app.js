const UNIT_PRICE = 12;

const activities = [
  {
    id: "ACT-20260801-01",
    name: "“科创黔桥”主题研学活动",
    school: "白云区第一小学",
    date: "2026-08-01",
    students: [
      ["陈予安", "520102********2018", "138****3201"],
      ["李星禾", "520103********2021", "139****6712"],
      ["王梓宁", "520111********2019", "136****2850"],
      ["周景行", "520115********2020", "187****4108"],
      ["赵可欣", "520121********2022", "158****9036"],
      ["吴沐阳", "520122********2018", "135****7629"],
      ["杨知夏", "520181********2021", "137****1544"],
    ],
    seedInsured: [0, 1, 2],
  },
  {
    id: "ACT-20261101-02",
    name: "白云区第一小学研学活动",
    school: "白云区第一小学",
    date: "2026-11-01",
    students: [
      ["刘书瑶", "520103********2017", "139****2857"],
      ["孙逸辰", "520111********2018", "136****4190"],
      ["黄思源", "520113********2020", "188****6032"],
      ["徐若溪", "520121********2019", "151****7241"],
      ["胡可心", "520181********2021", "135****0886"],
    ],
    seedInsured: [0, 3],
  },
  {
    id: "ACT-20261029-03",
    name: "走进坝陵河",
    school: "安顺市第八小学",
    date: "2026-10-29",
    students: [
      ["罗嘉禾", "520402********2020", "187****3109"],
      ["高予晴", "520403********2021", "139****7842"],
      ["谢云舟", "520421********2019", "136****5561"],
      ["何安然", "520422********2018", "158****2147"],
      ["唐思齐", "520423********2020", "137****9830"],
      ["冯语初", "520424********2021", "135****4426"],
      ["宋锦程", "520425********2019", "188****0615"],
      ["邓若宁", "520426********2020", "151****7388"],
      ["彭予希", "520427********2022", "138****6204"],
    ],
    seedInsured: [0, 2, 3, 6],
  },
  {
    id: "ACT-20261027-04",
    name: "测试机构研学研学活动",
    school: "安顺市第九中学",
    date: "2026-10-27",
    students: [
      ["叶嘉言", "520402********2018", "139****4710"],
      ["苏清和", "520403********2019", "136****2984"],
      ["卢念安", "520421********2021", "187****1642"],
      ["蒋成蹊", "520422********2020", "158****8035"],
    ],
    seedInsured: [0],
  },
  {
    id: "ACT-20261026-05",
    name: "10.21",
    school: "白云区第一小学",
    date: "2026-10-21",
    students: [
      ["沈观澜", "520103********2020", "137****5290"],
      ["韩星野", "520111********2018", "135****6761"],
      ["许嘉树", "520115********2019", "188****3104"],
      ["余晚晴", "520121********2021", "151****8862"],
      ["白知远", "520181********2020", "138****2473"],
      ["邵庭安", "520102********2019", "139****5198"],
    ],
    seedInsured: [0, 2, 5],
  },
  {
    id: "ACT-20261025-06",
    name: "10月21日",
    school: "白云区第一小学",
    date: "2026-10-25",
    students: [
      ["方予棠", "520103********2018", "136****8041"],
      ["程书言", "520111********2020", "187****3267"],
      ["梁清越", "520121********2021", "158****9410"],
    ],
    seedInsured: [0, 1, 2],
  },
  {
    id: "ACT-20261102-07",
    name: "安顺市第八小学秋季研学",
    school: "安顺市第八小学",
    date: "2026-11-02",
    students: [
      ["顾南枝", "520402********2020", "135****1736"],
      ["陆闻溪", "520403********2019", "139****6952"],
      ["周以宁", "520421********2021", "137****4287"],
      ["林书意", "520422********2018", "188****5739"],
      ["夏知微", "520423********2020", "151****2066"],
      ["郑云舒", "520424********2019", "138****8340"],
      ["姜禾", "520425********2021", "136****4915"],
    ],
    seedInsured: [0, 2],
  },
  {
    id: "ACT-20261105-08",
    name: "观山湖实验学校自然课堂",
    school: "观山湖实验学校",
    date: "2026-11-05",
    students: [
      ["温言", "520115********2018", "187****7352"],
      ["裴星然", "520115********2019", "139****0148"],
      ["贺予川", "520115********2020", "158****9635"],
      ["任知秋", "520115********2021", "135****5820"],
    ],
    seedInsured: [0],
  },
];

activities.forEach((activity) => {
  activity.students = activity.students.map(
    ([name, idNumber, phone], index) => ({
      name,
      idNumber,
      phone,
      insured: activity.seedInsured.includes(index),
      index,
    }),
  );
});

const state = {
  listQuery: "",
  listFilter: "all",
  currentActivityId: null,
  studentFilters: {
    name: "",
    insuranceStatus: "all",
    idNumber: "",
    phone: "",
  },
  payment: null,
  refund: null,
};

const els = {
  shell: document.querySelector("#appShell"),
  menuToggle: document.querySelector("#menuToggle"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  breadcrumbCurrent: document.querySelector("#breadcrumbCurrent"),
  listView: document.querySelector("#listView"),
  detailView: document.querySelector("#detailView"),
  detailBatchInsure: document.querySelector("#detailBatchInsure"),
  backToList: document.querySelector("#backToList"),
  search: document.querySelector("#activitySearch"),
  statusFilter: document.querySelector("#statusFilter"),
  searchButton: document.querySelector("#searchButton"),
  resetButton: document.querySelector("#resetButton"),
  emptyResetButton: document.querySelector("#emptyResetButton"),
  tableBody: document.querySelector("#activityTableBody"),
  emptyState: document.querySelector("#activityEmpty"),
  activityCount: document.querySelector("#activityCount"),
  paginationTotal: document.querySelector("#paginationTotal"),
  detailTitle: document.querySelector("#detailTitle"),
  detailMeta: document.querySelector("#detailMeta"),
  studentTotal: document.querySelector("#detailStudentTotal"),
  insuredTotal: document.querySelector("#detailInsuredTotal"),
  pendingTotal: document.querySelector("#detailPendingTotal"),
  studentSearch: document.querySelector("#studentSearch"),
  studentInsuranceFilter: document.querySelector("#studentInsuranceFilter"),
  studentIdSearch: document.querySelector("#studentIdSearch"),
  studentPhoneSearch: document.querySelector("#studentPhoneSearch"),
  studentSearchButton: document.querySelector("#studentSearchButton"),
  studentResetButton: document.querySelector("#studentResetButton"),
  studentEmptyReset: document.querySelector("#studentEmptyReset"),
  studentTableBody: document.querySelector("#studentTableBody"),
  studentEmpty: document.querySelector("#studentEmpty"),
  studentCount: document.querySelector("#studentCount"),
  paymentModal: document.querySelector("#paymentModal"),
  paymentClose: document.querySelector("#paymentClose"),
  paymentCancel: document.querySelector("#paymentCancel"),
  paymentPaid: document.querySelector("#paymentPaid"),
  paymentQuantity: document.querySelector("#paymentQuantity"),
  paymentUnitPrice: document.querySelector("#paymentUnitPrice"),
  paymentTotal: document.querySelector("#paymentTotal"),
  paymentTarget: document.querySelector("#paymentTarget"),
  confirmModal: document.querySelector("#confirmModal"),
  confirmText: document.querySelector("#confirmText"),
  confirmCancel: document.querySelector("#confirmCancel"),
  confirmSubmit: document.querySelector("#confirmSubmit"),
  toastRegion: document.querySelector("#toastRegion"),
};

function getActivity(id) {
  return activities.find((activity) => activity.id === id);
}

function getInsuredCount(activity) {
  return activity.students.filter((student) => student.insured).length;
}

function getPendingCount(activity) {
  return activity.students.length - getInsuredCount(activity);
}

function isFullyInsured(activity) {
  return getInsuredCount(activity) === activity.students.length;
}

function isPartiallyInsured(activity) {
  const count = getInsuredCount(activity);
  return count > 0 && count < activity.students.length;
}

function matchesActivityFilter(activity) {
  if (state.listFilter === "complete" && !isFullyInsured(activity)) return false;
  if (state.listFilter === "partial" && !isPartiallyInsured(activity)) return false;
  if (state.listFilter === "pending" && getInsuredCount(activity) !== 0) return false;
  return activity.name.toLowerCase().includes(state.listQuery.trim().toLowerCase());
}

function matchesStudentFilter(student) {
  const filters = state.studentFilters;
  if (filters.name && !student.name.includes(filters.name.trim())) return false;
  if (
    filters.insuranceStatus !== "all" &&
    student.insured !== (filters.insuranceStatus === "insured")
  ) {
    return false;
  }
  if (filters.idNumber && !student.idNumber.includes(filters.idNumber.trim())) return false;
  if (filters.phone && !student.phone.includes(filters.phone.trim())) return false;
  return true;
}

function activityIcon() {
  return '<svg aria-hidden="true"><use href="#icon-activity"></use></svg>';
}

function shieldIcon() {
  return '<svg aria-hidden="true"><use href="#icon-shield"></use></svg>';
}

function insuranceStatusClass(insured) {
  return insured ? "soft-status--success" : "soft-status--warning";
}

function renderMetrics() {
  const totalStudents = activities.reduce(
    (total, activity) => total + activity.students.length,
    0,
  );
  const totalInsured = activities.reduce(
    (total, activity) => total + getInsuredCount(activity),
    0,
  );
  document.querySelector("[data-total-activities]").textContent = activities.length;
  document.querySelector("[data-total-insured]").textContent = totalInsured;
  document.querySelector("[data-total-pending]").textContent =
    totalStudents - totalInsured;
}

function renderActivities() {
  const filtered = activities.filter(matchesActivityFilter);
  els.activityCount.textContent = filtered.length;
  els.paginationTotal.textContent = filtered.length;
  els.tableBody.innerHTML = "";
  els.emptyState.hidden = filtered.length > 0;

  filtered.forEach((activity, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="col-index">${String(index + 1).padStart(2, "0")}</td>
      <td>
        <div class="activity-name">
          <span class="activity-name__icon">${activityIcon()}</span>
          <span class="activity-name__body">
            <strong title="${activity.name}">${activity.name}</strong>
            <small>${activity.school} · ${activity.date} · ${activity.id}</small>
          </span>
        </div>
      </td>
      <td class="col-number">
        <span class="count-cell"><strong>${getInsuredCount(activity)}</strong><span>人</span></span>
      </td>
      <td class="col-number">
        <span class="count-cell is-pending"><strong>${getPendingCount(activity)}</strong><span>人</span></span>
      </td>
      <td class="col-action">
        <div class="row-actions">
          <button class="link-button link-button--primary" type="button" data-batch-insure="${activity.id}">
            ${shieldIcon()}
            一键投保
          </button>
          <button
            class="link-button link-button--download"
            type="button"
            data-download-activity="${activity.id}"
            ${getInsuredCount(activity) ? "" : "disabled"}
          >
            <svg aria-hidden="true"><use href="#icon-download"></use></svg>
            下载保单
          </button>
          <button class="link-button" type="button" data-detail="${activity.id}">
            详情
          </button>
        </div>
      </td>
    `;
    els.tableBody.append(row);
  });
}

function renderDetailSummary(activity) {
  els.detailTitle.textContent = activity.name;
  els.detailMeta.textContent = `${activity.school} · ${activity.date} · ${activity.id}`;
  els.studentTotal.textContent = activity.students.length;
  els.insuredTotal.textContent = getInsuredCount(activity);
  els.pendingTotal.textContent = getPendingCount(activity);
  els.detailBatchInsure.disabled = false;
  els.detailBatchInsure.innerHTML = `${shieldIcon()}一键投保`;
}

function renderStudents() {
  const activity = getActivity(state.currentActivityId);
  if (!activity) return;
  const filtered = activity.students.filter(matchesStudentFilter);
  els.studentCount.textContent = filtered.length;
  els.studentTableBody.innerHTML = "";
  els.studentEmpty.hidden = filtered.length > 0;

  filtered.forEach((student, rowIndex) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="col-index">${String(rowIndex + 1).padStart(2, "0")}</td>
      <td><strong>${student.name}</strong></td>
      <td><span class="id-number">${student.idNumber}</span></td>
      <td><span class="phone-number">${student.phone}</span></td>
      <td><span class="soft-status ${insuranceStatusClass(student.insured)}">${student.insured ? "已投保" : "未投保"}</span></td>
      <td class="col-action">
        <div class="row-actions">
          <button class="link-button" type="button" data-insure-student="${student.index}" ${student.insured ? "disabled" : ""}>投保</button>
          <button class="link-button link-button--danger" type="button" data-uninsure-student="${student.index}" ${student.insured ? "" : "disabled"}>退保</button>
          <button
            class="link-button link-button--download"
            type="button"
            data-download-student="${student.index}"
            ${student.insured ? "" : "disabled"}
          >
            <svg aria-hidden="true"><use href="#icon-download"></use></svg>
            下载保单
          </button>
        </div>
      </td>
    `;
    els.studentTableBody.append(row);
  });
}

function renderDetail() {
  const activity = getActivity(state.currentActivityId);
  if (!activity) return;
  renderDetailSummary(activity);
  renderStudents();
}

function renderAll() {
  renderMetrics();
  renderActivities();
  if (!els.detailView.hidden) renderDetail();
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

function getPolicyNumber(activity, student) {
  const activityCode = activity.id.split("-").pop();
  return `GZYXLX-${activityCode}-${String(student.index + 1).padStart(3, "0")}`;
}

function buildPolicyDocument(activity, students) {
  const generatedAt = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const policyCards = students
    .map((student) => {
      const policyNumber = getPolicyNumber(activity, student);
      return `
        <section class="policy">
          <header class="policy__header">
            <div>
              <span class="policy__eyebrow">STUDY TOUR INSURANCE</span>
              <h2>研学旅行保险电子保单</h2>
              <p>保单号：${policyNumber}</p>
            </div>
            <span class="policy__status">已生效</span>
          </header>
          <dl class="policy__details">
            <div><dt>被保险人</dt><dd>${escapeHtml(student.name)}</dd></div>
            <div><dt>身份证号</dt><dd>${escapeHtml(student.idNumber)}</dd></div>
            <div><dt>手机号</dt><dd>${escapeHtml(student.phone)}</dd></div>
            <div><dt>活动名称</dt><dd>${escapeHtml(activity.name)}</dd></div>
            <div><dt>所属学校</dt><dd>${escapeHtml(activity.school)}</dd></div>
            <div><dt>活动日期</dt><dd>${escapeHtml(activity.date)}</dd></div>
            <div><dt>保障套餐</dt><dd>标准安心险</dd></div>
            <div><dt>保险费用</dt><dd>¥${UNIT_PRICE.toFixed(2)} / 人</dd></div>
          </dl>
          <div class="policy__notice">
            本文件由贵州省研学综合服务网投保管理 Demo 生成，仅用于产品原型演示，不具备真实保险效力。
          </div>
        </section>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(activity.name)} - 电子保单</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 36px;
        color: #1d2739;
        background: #f3f6fa;
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
      }
      .page-header {
        max-width: 900px;
        margin: 0 auto 18px;
        color: #66758b;
        font-size: 12px;
      }
      .page-header strong { color: #1d2739; font-size: 15px; }
      .policy {
        max-width: 900px;
        margin: 0 auto 18px;
        padding: 26px;
        border: 1px solid #dfe5ee;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 8px 30px rgba(29, 39, 57, 0.06);
      }
      .policy__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        padding-bottom: 18px;
        border-bottom: 1px solid #e7ebf1;
      }
      .policy__eyebrow {
        color: #2c5bff;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.12em;
      }
      h2 { margin: 7px 0 6px; font-size: 22px; }
      .policy__header p { margin: 0; color: #8290a4; font-size: 11px; }
      .policy__status {
        padding: 6px 10px;
        border-radius: 999px;
        color: #118557;
        background: #e9f8f1;
        font-size: 11px;
        font-weight: 600;
      }
      .policy__details {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        margin: 20px 0;
        border: 1px solid #e7ebf1;
        border-radius: 9px;
        background: #e7ebf1;
      }
      .policy__details div {
        display: grid;
        grid-template-columns: 86px minmax(0, 1fr);
        gap: 12px;
        padding: 13px 14px;
        background: #fff;
      }
      dt { color: #8793a5; font-size: 11px; }
      dd { margin: 0; color: #29374d; font-size: 12px; font-weight: 600; }
      .policy__notice {
        padding: 11px 13px;
        border-radius: 7px;
        color: #8290a4;
        background: #f7f8fa;
        font-size: 10px;
        line-height: 1.6;
      }
      @media (max-width: 640px) {
        body { padding: 14px; }
        .policy { padding: 18px; }
        .policy__details { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header class="page-header">
      <strong>贵州省研学综合服务网</strong>
      <div>文件生成时间：${generatedAt}</div>
    </header>
    ${policyCards}
  </body>
</html>`;
}

function downloadHtmlFile(filename, content) {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadStudentPolicy(activityId, studentIndex) {
  const activity = getActivity(activityId);
  const student = activity?.students[studentIndex];
  if (!activity || !student) return;
  if (!student.insured) {
    showToast("该学生尚未投保，暂无可下载的保单");
    return;
  }
  downloadHtmlFile(
    `${activity.name}-${student.name}-电子保单.html`,
    buildPolicyDocument(activity, [student]),
  );
  showToast(`${student.name}的电子保单已开始下载`);
}

function downloadActivityPolicies(activityId) {
  const activity = getActivity(activityId);
  if (!activity) return;
  const insuredStudents = activity.students.filter((student) => student.insured);
  if (!insuredStudents.length) {
    showToast("该活动暂无已投保学生，无法下载保单");
    return;
  }
  downloadHtmlFile(
    `${activity.name}-投保保单汇总.html`,
    buildPolicyDocument(activity, insuredStudents),
  );
  showToast(`已开始下载 ${insuredStudents.length} 份电子保单`);
}

function openDetail(activityId, resetFilters = true) {
  const activity = getActivity(activityId);
  if (!activity) return;
  state.currentActivityId = activityId;
  if (resetFilters) resetStudentFilters(false);
  els.listView.hidden = true;
  els.detailView.hidden = false;
  els.breadcrumbCurrent.textContent = `投保管理 / ${activity.name}`;
  document.title = `${activity.name}｜投保管理`;
  renderDetail();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function closeDetail() {
  state.currentActivityId = null;
  els.detailView.hidden = true;
  els.listView.hidden = false;
  els.breadcrumbCurrent.textContent = "投保管理";
  document.title = "投保管理｜贵州省研学综合服务网";
  window.scrollTo({ top: 0, behavior: "instant" });
}

function resetStudentFilters(render = true) {
  state.studentFilters = {
    name: "",
    insuranceStatus: "all",
    idNumber: "",
    phone: "",
  };
  els.studentSearch.value = "";
  els.studentInsuranceFilter.value = "all";
  els.studentIdSearch.value = "";
  els.studentPhoneSearch.value = "";
  if (render) renderStudents();
}

function applyStudentFilters() {
  state.studentFilters = {
    name: els.studentSearch.value,
    insuranceStatus: els.studentInsuranceFilter.value,
    idNumber: els.studentIdSearch.value,
    phone: els.studentPhoneSearch.value,
  };
  renderStudents();
}

function openPayment(activityId, studentIndexes, targetLabel) {
  if (!studentIndexes.length) {
    showToast("当前对象已全部投保，无需重复支付");
    return;
  }
  state.payment = { activityId, studentIndexes };
  els.paymentQuantity.textContent = studentIndexes.length;
  els.paymentUnitPrice.textContent = UNIT_PRICE.toFixed(2);
  els.paymentTotal.textContent = (studentIndexes.length * UNIT_PRICE).toFixed(2);
  els.paymentTarget.textContent = targetLabel;
  els.paymentModal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => els.paymentPaid.focus());
}

function closePayment() {
  state.payment = null;
  els.paymentModal.hidden = true;
  document.body.style.overflow = els.confirmModal.hidden ? "" : "hidden";
}

function completePayment() {
  const payment = state.payment;
  if (!payment) return;
  const activity = getActivity(payment.activityId);
  payment.studentIndexes.forEach((studentIndex) => {
    activity.students[studentIndex].insured = true;
  });
  closePayment();
  showToast(`支付成功，已为 ${payment.studentIndexes.length} 名学生完成投保`);
  renderAll();
}

function openRefund(activityId, studentIndex) {
  const activity = getActivity(activityId);
  const student = activity?.students[studentIndex];
  if (!activity || !student) return;
  state.refund = { activityId, studentIndex };
  els.confirmText.textContent = `确认将「${student.name}」办理退保吗？退保后该学生的投保状态将被取消。`;
  els.confirmModal.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => els.confirmSubmit.focus());
}

function closeRefund() {
  state.refund = null;
  els.confirmModal.hidden = true;
  document.body.style.overflow = els.paymentModal.hidden ? "" : "hidden";
}

function completeRefund() {
  const refund = state.refund;
  if (!refund) return;
  const activity = getActivity(refund.activityId);
  const student = activity.students[refund.studentIndex];
  student.insured = false;
  closeRefund();
  showToast(`${student.name} 已办理退保`);
  renderAll();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast__icon"><svg aria-hidden="true"><use href="#icon-check"></use></svg></span>
    <span>${message}</span>
  `;
  els.toastRegion.append(toast);
  window.setTimeout(() => {
    toast.classList.add("is-leaving");
    window.setTimeout(() => toast.remove(), 180);
  }, 2400);
}

function resetActivityFilters() {
  state.listQuery = "";
  state.listFilter = "all";
  els.search.value = "";
  els.statusFilter.value = "all";
  renderActivities();
}

els.searchButton.addEventListener("click", () => {
  state.listQuery = els.search.value;
  state.listFilter = els.statusFilter.value;
  renderActivities();
});

els.search.addEventListener("input", () => {
  state.listQuery = els.search.value;
  renderActivities();
});

els.search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    state.listQuery = els.search.value;
    state.listFilter = els.statusFilter.value;
    renderActivities();
  }
});

els.statusFilter.addEventListener("change", () => {
  state.listFilter = els.statusFilter.value;
  renderActivities();
});

els.resetButton.addEventListener("click", resetActivityFilters);
els.emptyResetButton.addEventListener("click", resetActivityFilters);

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

els.tableBody.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail]");
  const insureButton = event.target.closest("[data-batch-insure]");
  const downloadButton = event.target.closest("[data-download-activity]");
  if (detailButton) openDetail(detailButton.dataset.detail);
  if (insureButton) {
    const activity = getActivity(insureButton.dataset.batchInsure);
    const pendingIndexes = activity.students
      .filter((student) => !student.insured)
      .map((student) => student.index);
    openPayment(activity.id, pendingIndexes, activity.name);
  }
  if (downloadButton) {
    downloadActivityPolicies(downloadButton.dataset.downloadActivity);
  }
});

els.studentTableBody.addEventListener("click", (event) => {
  const activity = getActivity(state.currentActivityId);
  const insureButton = event.target.closest("[data-insure-student]");
  const uninsureButton = event.target.closest("[data-uninsure-student]");
  const downloadButton = event.target.closest("[data-download-student]");
  if (!activity) return;

  if (insureButton) {
    const studentIndex = Number(insureButton.dataset.insureStudent);
    const student = activity.students[studentIndex];
    openPayment(activity.id, [studentIndex], student.name);
  }

  if (uninsureButton) {
    openRefund(activity.id, Number(uninsureButton.dataset.uninsureStudent));
  }

  if (downloadButton) {
    downloadStudentPolicy(activity.id, Number(downloadButton.dataset.downloadStudent));
  }
});

els.detailBatchInsure.addEventListener("click", () => {
  const activity = getActivity(state.currentActivityId);
  if (!activity) return;
  const pendingIndexes = activity.students
    .filter((student) => !student.insured)
    .map((student) => student.index);
  openPayment(activity.id, pendingIndexes, activity.name);
});

els.backToList.addEventListener("click", closeDetail);

els.studentSearchButton.addEventListener("click", applyStudentFilters);

[els.studentSearch, els.studentIdSearch, els.studentPhoneSearch].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") applyStudentFilters();
  });
});

els.studentInsuranceFilter.addEventListener("change", applyStudentFilters);
els.studentResetButton.addEventListener("click", () => resetStudentFilters());
els.studentEmptyReset.addEventListener("click", () => resetStudentFilters());

els.paymentCancel.addEventListener("click", closePayment);
els.paymentClose.addEventListener("click", closePayment);
els.paymentPaid.addEventListener("click", completePayment);
els.paymentModal.addEventListener("click", (event) => {
  if (event.target === els.paymentModal) closePayment();
});

els.confirmCancel.addEventListener("click", closeRefund);
els.confirmSubmit.addEventListener("click", completeRefund);
els.confirmModal.addEventListener("click", (event) => {
  if (event.target === els.confirmModal) closeRefund();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!els.confirmModal.hidden) {
    closeRefund();
  } else if (!els.paymentModal.hidden) {
    closePayment();
  } else if (!els.detailView.hidden) {
    closeDetail();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    els.shell.classList.remove("is-mobile-nav-open");
    els.sidebarBackdrop.hidden = true;
  }
});

renderMetrics();
renderActivities();
