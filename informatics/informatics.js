// Рендеринг сторінок розділу «Уроки інформатики». Дані — у lessons.js
(function () {
  var L = window.LESSONS || {}, TYPES = window.LESSON_TYPES, LANGS = window.LESSON_LANGS;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function findLesson(id) {
    for (var lang in L) {
      for (var i = 0; i < L[lang].length; i++) {
        if (L[lang][i].id === id) return { lang: lang, item: L[lang][i] };
      }
    }
    return null;
  }

  // Сторінка мови (python.html / cpp.html): <div id="lessons" data-lang="cpp">
  var box = document.getElementById("lessons");
  if (box) {
    var lang = box.getAttribute("data-lang"), items = L[lang] || [], html = "";
    Object.keys(TYPES).forEach(function (type) {
      var list = items.filter(function (x) { return x.type === type; });
      html += '<section class="lesson-group"><h2><ion-icon name="' + TYPES[type].icon + '"></ion-icon>' +
        esc(TYPES[type].title) + "</h2>";
      if (!list.length) {
        html += '<p class="lesson-empty">Матеріали незабаром з\'являться.</p>';
      } else {
        html += '<div class="lesson-grid">' + list.map(function (x) {
          return '<a class="lesson-card" href="view.html?id=' + encodeURIComponent(x.id) + '">' +
            "<h3>" + esc(x.title) + "</h3><p>" + esc(x.desc) + "</p>" +
            '<span class="open">Відкрити →</span></a>';
        }).join("") + "</div>";
      }
      html += "</section>";
    });
    box.innerHTML = html;
  }

  // Сторінка перегляду (view.html?id=...)
  var frame = document.getElementById("viewer-frame");
  if (frame) {
    var id = new URLSearchParams(location.search).get("id");
    var found = id && findLesson(id);
    var back = document.getElementById("viewer-back");
    var title = document.getElementById("viewer-title");
    var full = document.getElementById("viewer-full");
    if (!found) {
      title.textContent = "Матеріал не знайдено";
      back.href = "../math-info.html#lessons-info";
      back.textContent = "← До уроків";
      full.style.display = "none";
      frame.style.display = "none";
      return;
    }
    var it = found.item, src = it.file || it.url;
    document.title = it.title + " — ЛІТ";
    title.textContent = it.title;
    back.href = LANGS[found.lang].page;
    back.textContent = "← " + LANGS[found.lang].title;
    frame.src = src;
    frame.title = it.title;
    full.href = src;
  }
})();
