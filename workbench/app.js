(function () {
  "use strict";

  var sidebar = document.getElementById("sidebar");
  var sidebarToggle = document.getElementById("sidebarToggle");
  var mainContainer = document.getElementById("mainContainer");
  var toast = document.getElementById("toast");
  var toastTimer;
  var desktopQuery = window.matchMedia("(max-width: 820px)");

  var fundChart = null;
  var topicChart = null;
  var selectedYear = "";
  var chartMode = "";
  var researchMap = null;
  var researchMapInfoWindow = null;
  var researchMapMarkers = null;
  var researchMapBases = [];
  var researchMapSdkPromise = null;
  var TENCENT_MAP_SDK_URL =
    "https://map.qq.com/api/gljs?v=1.exp&key=3TWBZ-MLDL5-UVVI3-IAUGI-NUES6-M4FM3";

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function isMobile() {
    return desktopQuery.matches;
  }

  function syncSidebarButton() {
    var collapsed = sidebar.classList.contains("collapsed");
    var mobileOpen = sidebar.classList.contains("mobile-open");
    var expanded = isMobile() ? mobileOpen : !collapsed;
    sidebarToggle.setAttribute("aria-expanded", String(expanded));
    sidebarToggle.setAttribute("aria-label", expanded ? "收起菜单" : "展开菜单");
  }

  function toggleSidebar() {
    if (isMobile()) {
      sidebar.classList.toggle("mobile-open");
    } else {
      sidebar.classList.remove("mobile-open");
      sidebar.classList.toggle("collapsed");
      try {
        localStorage.setItem("gzyxw-workbench-sidebar", sidebar.classList.contains("collapsed") ? "collapsed" : "open");
      } catch (error) {
        // Local storage can be unavailable when the prototype is opened from a file URL.
      }
    }
    syncSidebarButton();
    resizeChartsLater();
  }

  function restoreSidebar() {
    if (isMobile()) {
      sidebar.classList.remove("collapsed");
    } else {
      try {
        if (localStorage.getItem("gzyxw-workbench-sidebar") === "collapsed") {
          sidebar.classList.add("collapsed");
        }
      } catch (error) {
        // Keep the default expanded state.
      }
    }
    syncSidebarButton();
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar);
  }

  restoreSidebar();

  desktopQuery.addEventListener("change", function () {
    sidebar.classList.remove("mobile-open");
    if (isMobile()) sidebar.classList.remove("collapsed");
    syncSidebarButton();
    resizeChartsLater();
  });

  document.querySelectorAll(".menu-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.closest(".menu-group");
      if (!group) return;
      var willOpen = !group.classList.contains("open");
      group.classList.toggle("open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.querySelectorAll("[data-demo-route]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      if (isMobile()) {
        sidebar.classList.remove("mobile-open");
        syncSidebarButton();
      }
      showToast("原型演示：" + link.dataset.demoRoute + "页面暂未展开");
    });
  });

  document.querySelectorAll("[data-demo-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      showToast("原型演示：" + button.dataset.demoAction);
    });
  });

  var accountButton = document.getElementById("accountButton");
  var accountMenu = document.getElementById("accountMenu");

  function closeAccountMenu() {
    if (!accountMenu || !accountButton) return;
    accountMenu.hidden = true;
    accountButton.setAttribute("aria-expanded", "false");
  }

  if (accountButton && accountMenu) {
    accountButton.addEventListener("click", function (event) {
      event.stopPropagation();
      var willOpen = accountMenu.hidden;
      accountMenu.hidden = !willOpen;
      accountButton.setAttribute("aria-expanded", String(willOpen));
    });

    accountMenu.addEventListener("click", function (event) {
      if (event.target.closest("button")) closeAccountMenu();
    });
  }

  document.addEventListener("click", function (event) {
    if (accountMenu && !accountMenu.hidden && !event.target.closest("#accountMenu") && !event.target.closest("#accountButton")) {
      closeAccountMenu();
    }
    if (!event.target.closest("#yearPicker")) {
      closeYearMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAccountMenu();
      closeYearMenu();
      closeResearchBaseInfo();
      if (isMobile()) {
        sidebar.classList.remove("mobile-open");
        syncSidebarButton();
      }
    }
  });

  if (mainContainer) {
    mainContainer.addEventListener("click", function (event) {
      if (
        isMobile() &&
        sidebar.classList.contains("mobile-open") &&
        !event.target.closest("#sidebar") &&
        !event.target.closest("#sidebarToggle")
      ) {
        sidebar.classList.remove("mobile-open");
        syncSidebarButton();
      }
    });
  }

  var fullscreenButton = document.getElementById("fullscreenButton");
  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", function () {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(function () {
            showToast("当前浏览器不支持全屏显示");
          });
        } else {
          showToast("当前浏览器不支持全屏显示");
        }
      } else {
        document.exitFullscreen();
      }
    });
  }

  var textSizeButton = document.getElementById("textSizeButton");
  if (textSizeButton) {
    textSizeButton.addEventListener("click", function () {
      document.body.classList.toggle("text-size-large");
      showToast(document.body.classList.contains("text-size-large") ? "已切换为大字号" : "已恢复默认字号");
      resizeChartsLater();
    });
  }

  var DEMO_TODAY = new Date(2026, 10, 2);
  var selectedDate = new Date(DEMO_TODAY);
  var weekAnchor = getWeekStart(selectedDate);
  var eventDates = {
    "2026-11-02": true,
    "2026-10-27": true,
    "2026-10-19": true
  };

  var currentDate = document.getElementById("currentDate");
  var weekDates = document.getElementById("weekDates");
  var prevWeek = document.getElementById("prevWeek");
  var nextWeek = document.getElementById("nextWeek");
  var backToday = document.getElementById("backToday");

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getWeekStart(date) {
    var result = startOfDay(date);
    result.setDate(result.getDate() - result.getDay());
    return result;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function dateKey(date) {
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
  }

  function formatChineseDate(date) {
    return date.getFullYear() + "年" + pad(date.getMonth() + 1) + "月" + pad(date.getDate()) + "日";
  }

  function sameDay(a, b) {
    return dateKey(a) === dateKey(b);
  }

  function renderCalendar() {
    if (!weekDates || !currentDate) return;
    var weekStart = getWeekStart(weekAnchor);
    currentDate.textContent = formatChineseDate(selectedDate);
    weekDates.innerHTML = "";

    for (var index = 0; index < 7; index += 1) {
      var date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      var cell = document.createElement("span");
      var key = dateKey(date);
      cell.textContent = String(date.getDate());
      cell.setAttribute("role", "button");
      cell.setAttribute("tabindex", "0");
      cell.setAttribute("aria-label", formatChineseDate(date));

      if (sameDay(date, selectedDate)) {
        cell.classList.add("current-date-highlight");
      }

      if (eventDates[key]) {
        cell.classList.add("has-event");
        var dot = document.createElement("i");
        dot.className = "event-dot";
        dot.setAttribute("aria-hidden", "true");
        cell.appendChild(dot);
      }

      cell.addEventListener("click", function (event) {
        var target = event.currentTarget;
        selectedDate = new Date(weekStart);
        selectedDate.setDate(weekStart.getDate() + Number(target.dataset.index));
        renderCalendar();
      });
      cell.dataset.index = String(index);
      cell.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.currentTarget.click();
        }
      });
      weekDates.appendChild(cell);
    }
  }

  function moveWeek(direction) {
    var next = new Date(weekAnchor);
    next.setDate(next.getDate() + 7 * direction);
    weekAnchor = next;
    selectedDate = new Date(selectedDate);
    selectedDate.setDate(selectedDate.getDate() + 7 * direction);
    renderCalendar();
  }

  if (prevWeek) prevWeek.addEventListener("click", function () { moveWeek(-1); });
  if (nextWeek) nextWeek.addEventListener("click", function () { moveWeek(1); });
  if (backToday) {
    backToday.addEventListener("click", function () {
      selectedDate = new Date(DEMO_TODAY);
      weekAnchor = getWeekStart(selectedDate);
      renderCalendar();
    });
  }

  renderCalendar();

  var yearPicker = document.getElementById("yearPicker");
  var yearPickerTrigger = document.getElementById("yearPickerTrigger");
  var yearPickerLabel = document.getElementById("yearPickerLabel");
  var yearMenu = document.getElementById("yearMenu");

  function closeYearMenu() {
    if (!yearMenu || !yearPickerTrigger) return;
    yearMenu.hidden = true;
    yearPickerTrigger.setAttribute("aria-expanded", "false");
  }

  if (yearPickerTrigger && yearMenu) {
    yearPickerTrigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var willOpen = yearMenu.hidden;
      yearMenu.hidden = !willOpen;
      yearPickerTrigger.setAttribute("aria-expanded", String(willOpen));
    });

    yearMenu.querySelectorAll("[data-year]").forEach(function (option) {
      option.addEventListener("click", function () {
        selectedYear = option.dataset.year;
        yearPickerLabel.textContent = selectedYear + "年";
        yearPicker.classList.add("has-value");
        yearMenu.querySelectorAll("[data-year]").forEach(function (item) {
          item.classList.toggle("selected", item === option);
        });
        closeYearMenu();
        updateFundChart();
      });
    });
  }

  function buildFundOption() {
    var year = selectedYear || "2026";
    var months = 11;
    var compact = window.innerWidth <= 560;
    var labels = [];
    for (var month = 1; month <= months; month += 1) {
      labels.push(year + "-" + pad(month));
    }

    var seriesColors = ["#249EFF", "#21CCFF", "#F0C43D"];
    var names = ["已入账资金", "已提现资金", "可提现资金"];
    var series = names.map(function (name, index) {
      return {
        name: name,
        type: "line",
        smooth: true,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 9,
        data: labels.map(function () { return 0; }),
        itemStyle: {
          color: "#fff",
          borderColor: seriesColors[index],
          borderWidth: 2
        },
        lineStyle: {
          color: seriesColors[index],
          width: 2
        },
        emphasis: {
          scale: 1.2,
          focus: "series"
        }
      };
    });

    return {
      color: seriesColors,
      animationDuration: 450,
      grid: { left: 28, right: 8, top: 38, bottom: 24 },
      tooltip: {
        trigger: "axis",
        confine: true,
        textStyle: { fontSize: 12 }
      },
      legend: {
        top: 0,
        left: "center",
        itemWidth: 13,
        itemHeight: 13,
        itemGap: compact ? 9 : 13,
        icon: "circle",
        textStyle: { color: "#606266", fontSize: 12 },
        data: names
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: labels,
        axisTick: { show: false },
        axisLine: { lineStyle: { color: "#e4e7ed" } },
        axisLabel: {
          color: "#909399",
          fontSize: 10,
          margin: 10,
          interval: compact ? 3 : 1
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 1,
        interval: 0.2,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          color: "#909399",
          fontSize: 10,
          margin: 8,
          formatter: function (value) {
            if (value === 0) return "0";
            if (value === 1) return "1";
            return Number(value).toFixed(1);
          }
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#e8ecf2"
          }
        }
      },
      series: series
    };
  }

  function updateFundChart() {
    if (!fundChart) return;
    fundChart.setOption(buildFundOption(), true);
  }

  function buildTopicOption() {
    var compact = window.innerWidth <= 560;
    var data = [
      { name: "优秀传统文化", value: 5 },
      { name: "国防科工教育", value: 2 },
      { name: "非遗传承", value: 0 },
      { name: "革命传统教育", value: 4 },
      { name: "国情市情教育", value: 0 },
      { name: "自然生态环保", value: 0 },
      { name: "体育与艺术教育", value: 0 },
      { name: "劳动实践教育", value: 0 }
    ];
    var colors = ["#249EFF", "#21CCFF", "#21E86A", "#313CA9", "#FD866A", "#9E87FF", "#58D5FF", "#ffffff"];

    return {
      color: colors,
      animationDuration: 500,
      title: [
        {
          text: "总团数",
          left: "center",
          top: "41%",
          textStyle: {
            color: "#333",
            fontSize: 16,
            fontWeight: 400
          }
        },
        {
          text: "11",
          left: "center",
          top: "47.5%",
          textStyle: {
            color: "#333",
            fontSize: 20,
            fontWeight: 700
          }
        }
      ],
      tooltip: {
        trigger: "item",
        confine: true,
        formatter: "{b}<br/>{c} 团（{d}%）",
        textStyle: { fontSize: 12 }
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        left: "center",
        width: "88%",
        itemWidth: 12,
        itemHeight: 10,
        itemGap: 18,
        icon: "roundRect",
        textStyle: {
          color: "#606266",
          fontSize: 11
        },
        data: data.map(function (item) { return item.name; })
      },
      series: [
        {
          name: "研学主题",
          type: "pie",
          center: ["50%", "43%"],
          radius: ["34%", "55%"],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverOffset: 8,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1
          },
          label: {
            show: true,
            position: "outside",
            color: "#606266",
            fontSize: 11,
            formatter: function (params) {
              if (compact && params.value === 0) return "";
              return params.name + "：" + params.percent.toFixed(2) + "%";
            }
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
            lineStyle: {
              color: "#c8ccd4",
              width: 1
            }
          },
          emphasis: {
            scale: true,
            scaleSize: 6,
            label: {
              show: true,
              fontWeight: 600
            }
          },
          data: data
        }
      ]
    };
  }

  function initCharts() {
    if (!window.echarts) {
      showToast("图表资源加载失败");
      return;
    }

    chartMode = window.innerWidth <= 560 ? "compact" : "full";
    var fundElement = document.getElementById("fundChart");
    var topicElement = document.getElementById("topicChart");

    if (fundElement) {
      fundChart = window.echarts.init(fundElement, null, { renderer: "canvas" });
      fundChart.setOption(buildFundOption());
    }

    if (topicElement) {
      topicChart = window.echarts.init(topicElement, null, { renderer: "canvas" });
      topicChart.setOption(buildTopicOption());
    }
  }

  function resizeCharts() {
    var nextMode = window.innerWidth <= 560 ? "compact" : "full";
    if (nextMode !== chartMode) {
      chartMode = nextMode;
      updateFundChart();
      if (topicChart) topicChart.setOption(buildTopicOption(), true);
    }
    if (fundChart) fundChart.resize();
    if (topicChart) topicChart.resize();
    if (researchMap) researchMap.resize();
    if (researchMapInfoWindow && researchMapInfoWindow.setOffset) {
      researchMapInfoWindow.setOffset(getResearchMapInfoOffset());
    }
  }

  function resizeChartsLater() {
    window.setTimeout(resizeCharts, 300);
  }

  function escapeMapHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function buildBaseInfoContent(base, baseIndex) {
    var image = base.image
      ? '<img src="' +
        escapeMapHtml(base.image) +
        '" alt="' +
        escapeMapHtml(base.name) +
        '" onerror="this.style.opacity=0" />'
      : "";
    var tags = [base.grade, base.cultureType]
      .filter(Boolean)
      .map(function (tag) {
        return "<span>" + escapeMapHtml(tag) + "</span>";
      })
      .join("");
    var contact = base.contact
      ? '<p class="base-map-info__contact">联系电话 · ' + escapeMapHtml(base.contact) + "</p>"
      : "";

    return (
      '<div class="base-map-info">' +
      '<button class="base-map-info__close" type="button" aria-label="关闭基地信息" data-map-info-close>×</button>' +
      (image ? '<div class="base-map-info__media">' + image + "</div>" : "") +
      '<div class="base-map-info__body">' +
      '<span class="base-map-info__eyebrow">研学基地</span>' +
      '<h3 class="base-map-info__title">' +
      escapeMapHtml(base.name) +
      "</h3>" +
      (tags ? '<div class="base-map-info__tags">' + tags + "</div>" : "") +
      '<p class="base-map-info__address">地址 · ' +
      escapeMapHtml(base.address || "暂无地址") +
      "</p>" +
      contact +
      '<button class="base-map-info__action" type="button" data-map-base-index="' +
      baseIndex +
      '">查看基地详情</button>' +
      "</div>" +
      "</div>"
    );
  }

  function getResearchMapInfoOffset() {
    return { x: 0, y: 0 };
  }

  function openResearchBaseInfo(base, baseIndex) {
    if (!researchMap || !window.TMap) return;
    var TMap = window.TMap;
    var position = new TMap.LatLng(base.latitude, base.longitude);

    if (!researchMapInfoWindow) {
      researchMapInfoWindow = new TMap.InfoWindow({
        map: researchMap,
        position: position,
        offset: getResearchMapInfoOffset(),
        enableCustom: true
      });
    } else if (researchMapInfoWindow.setOffset) {
      researchMapInfoWindow.setOffset(getResearchMapInfoOffset());
    }

    researchMapInfoWindow.setPosition(position);
    researchMapInfoWindow.setContent(buildBaseInfoContent(base, baseIndex));
    researchMapInfoWindow.open();
    researchMap.setCenter(position);
    var mapCard = document.querySelector(".map-card");
    if (mapCard) mapCard.classList.add("map-info-open");

    window.setTimeout(function () {
      var infoRoot = document.querySelector(".base-map-info");
      if (!infoRoot) return;
      var closeButton = infoRoot.querySelector("[data-map-info-close]");
      var detailButton = infoRoot.querySelector("[data-map-base-index]");
      if (closeButton) {
        closeButton.addEventListener("click", function (event) {
          event.stopPropagation();
          closeResearchBaseInfo();
        });
      }
      if (detailButton) {
        detailButton.addEventListener("click", function (event) {
          event.stopPropagation();
          showToast("原型演示：" + base.name + "详情页暂未展开");
        });
      }
    }, 0);
  }

  function closeResearchBaseInfo() {
    if (researchMapInfoWindow) researchMapInfoWindow.close();
    var mapCard = document.querySelector(".map-card");
    if (mapCard) mapCard.classList.remove("map-info-open");
  }

  function showResearchMapError(message) {
    var mapCanvas = document.getElementById("mapCanvas");
    var feedbackText = document.querySelector("#mapFeedback .map-feedback-text");
    if (!mapCanvas) return;
    mapCanvas.classList.remove("is-loading", "is-ready");
    mapCanvas.classList.add("is-error");
    if (feedbackText) feedbackText.textContent = message || "地图资源暂不可用，已展示静态分布图";
  }

  function loadTencentMapSdk() {
    if (window.TMap && window.TMap.Map) return Promise.resolve(window.TMap);
    if (researchMapSdkPromise) return researchMapSdkPromise;

    researchMapSdkPromise = new Promise(function (resolve, reject) {
      var script = document.querySelector("script[data-tencent-map-sdk]");
      var settled = false;
      var startedAt = Date.now();

      function settle(error) {
        if (settled) return;
        settled = true;
        if (error) {
          reject(error);
        } else {
          resolve(window.TMap);
        }
      }

      function waitForSdk() {
        if (window.TMap && window.TMap.Map) {
          settle();
          return;
        }
        if (Date.now() - startedAt > 12000) {
          settle(new Error("Tencent Map SDK timeout"));
          return;
        }
        window.setTimeout(waitForSdk, 100);
      }

      if (script) {
        waitForSdk();
        return;
      }

      script = document.createElement("script");
      script.src = TENCENT_MAP_SDK_URL;
      script.async = true;
      script.dataset.tencentMapSdk = "true";
      script.onload = waitForSdk;
      script.onerror = function () {
        settle(new Error("Tencent Map SDK failed to load"));
      };
      document.head.appendChild(script);
      waitForSdk();
    });

    return researchMapSdkPromise;
  }

  function initResearchMap() {
    var mapElement = document.getElementById("researchMap");
    var mapCanvas = document.getElementById("mapCanvas");
    var bases = Array.isArray(window.GUIZHOU_SCENIC_BASES)
      ? window.GUIZHOU_SCENIC_BASES.filter(function (base) {
          return Number.isFinite(Number(base.latitude)) && Number.isFinite(Number(base.longitude));
        })
      : [];

    if (!mapElement || !mapCanvas) return;
    if (!bases.length) {
      showResearchMapError("地图数据加载失败，已展示静态分布图");
      return;
    }

    researchMapBases = bases;

    loadTencentMapSdk()
      .then(function (TMap) {
        try {
          researchMap = new TMap.Map(mapElement, {
            center: new TMap.LatLng(26.647, 106.6302),
            zoom: 8,
            viewMode: "2D"
          });

          researchMapMarkers = new TMap.MarkerCluster({
            map: researchMap,
            minimumClusterSize: 2,
            gridSize: 54,
            zoomOnClick: false,
            geometries: bases.map(function (base, index) {
              return {
                id: String(index),
                position: new TMap.LatLng(base.latitude, base.longitude)
              };
            })
          });

          researchMapMarkers.on("click", function (event) {
            var cluster = event.cluster;
            var geometries = cluster && cluster.geometries;

            if (geometries && geometries.length > 1) {
              closeResearchBaseInfo();
              if (cluster.bounds && researchMap.fitBounds) {
                researchMap.fitBounds(cluster.bounds, {
                  padding: { top: 82, right: 44, bottom: 52, left: 44 },
                  maxZoom: 14
                });
              }
              return;
            }

            var geometry = (geometries && geometries[0]) || event.geometry;
            var baseIndex = Number(geometry && geometry.id);
            if (Number.isFinite(baseIndex) && researchMapBases[baseIndex]) {
              openResearchBaseInfo(researchMapBases[baseIndex], baseIndex);
            }
          });

          mapCanvas.classList.remove("is-loading", "is-error");
          mapCanvas.classList.add("is-ready");
          mapElement.setAttribute("aria-hidden", "false");
          window.setTimeout(function () {
            if (researchMap) researchMap.resize();
          }, 80);
        } catch (error) {
          showResearchMapError("地图初始化失败，已展示静态分布图");
        }
      })
      .catch(function () {
        showResearchMapError("地图资源暂不可用，已展示静态分布图");
      });
  }

  window.addEventListener("resize", resizeCharts);
  initCharts();
  initResearchMap();
})();
