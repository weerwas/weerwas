const REPORT_KEY = "dailyReports";
const REVIEW_KEY = "reviews";

const reportForm = document.getElementById("daily-report-form");
const reviewForm = document.getElementById("review-form");
const reportList = document.getElementById("daily-report-list");
const reviewList = document.getElementById("review-list");
const clearBtn = document.getElementById("clear-data");

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));

function renderTable(listEl, rows, fields) {
  listEl.innerHTML = "";
  if (!rows.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = fields.length;
    td.textContent = "ยังไม่มีข้อมูล";
    tr.appendChild(td);
    listEl.appendChild(tr);
    return;
  }

  rows
    .slice()
    .reverse()
    .forEach((row) => {
      const tr = document.createElement("tr");
      fields.forEach((field) => {
        const td = document.createElement("td");
        td.textContent = row[field] || "-";
        tr.appendChild(td);
      });
      listEl.appendChild(tr);
    });
}

function renderAll() {
  renderTable(reportList, read(REPORT_KEY), ["date", "reporter", "project", "todayWork"]);
  renderTable(reviewList, read(REVIEW_KEY), ["date", "reviewer", "target", "score"]);
}

reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reports = read(REPORT_KEY);
  reports.push({
    date: document.getElementById("report-date").value,
    reporter: document.getElementById("reporter").value,
    project: document.getElementById("project").value,
    todayWork: document.getElementById("today-work").value,
    blockers: document.getElementById("blockers").value,
    tomorrowPlan: document.getElementById("tomorrow-plan").value,
  });
  save(REPORT_KEY, reports);
  reportForm.reset();
  renderAll();
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reviews = read(REVIEW_KEY);
  reviews.push({
    date: document.getElementById("review-date").value,
    reviewer: document.getElementById("reviewer").value,
    target: document.getElementById("review-target").value,
    score: document.getElementById("score").value,
    feedback: document.getElementById("feedback").value,
  });
  save(REVIEW_KEY, reviews);
  reviewForm.reset();
  renderAll();
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(REPORT_KEY);
  localStorage.removeItem(REVIEW_KEY);
  renderAll();
});

renderAll();
