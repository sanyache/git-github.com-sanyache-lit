/*
 * КАТАЛОГ УРОКІВ З ІНФОРМАТИКИ
 * ============================
 * Щоб додати новий матеріал:
 *   1. Покладіть HTML-файл у відповідну папку, наприклад:
 *        informatics/cpp/visual/      — візуалізації коду C++
 *        informatics/cpp/games/       — інтерактивні ігри C++
 *        informatics/python/visual/   — візуалізації коду Python
 *        ...
 *      Назву файлу краще писати латиницею, без пробілів: bubble-sort.html
 *   2. Допишіть запис у потрібний список нижче (python або cpp).
 *
 * Поля запису:
 *   id    — унікальний ідентифікатор латиницею (буде в адресі сторінки)
 *   type  — "presentation" | "visual" | "game"
 *   title — назва картки
 *   desc  — короткий опис (необов'язково)
 *   file  — шлях до файлу відносно папки informatics/   (для власних HTML-файлів)
 *   url   — АБО посилання на Google Slides (embed-посилання з «Файл → Опублікувати в Інтернеті → Вбудувати»)
 */
window.LESSONS = {
  python: [
    {
      id: "py-if-else-quest",
      type: "game",
      title: "Python CodeQuest: розгалуження",
      desc: "Гра: 6 рівнів про if, if-else, if-elif-else та and, or, not і фінальна місія «Збери програму».",
      file: "python/games/if-else-game.html"
    }
    // Приклад:
    // { id: "py-bubble", type: "visual", title: "Сортування бульбашкою", desc: "Покрокова робота алгоритму", file: "python/visual/bubble-sort.html" },
  ],

  cpp: [
    {
      id: "cpp-stairs",
      type: "visual",
      title: "Зайчик і сходинки",
      desc: "Динамічне програмування: кількість способів піднятися сходами (числа Фібоначчі).",
      file: "cpp/visual/zaichyk-skhodynky.html"
    },
    {
      id: "cpp-grasshopper",
      type: "visual",
      title: "Коник: найдешевший шлях",
      desc: "Динамічне програмування: мінімальна вартість шляху та відновлення відповіді.",
      file: "cpp/visual/konyk-shliakh.html"
    }
  ]
};

window.LESSON_TYPES = {
  presentation: { title: "Презентації",    icon: "easel-outline" },
  visual:       { title: "Візуалізації коду", icon: "code-slash-outline" },
  game:         { title: "Інтерактивні ігри", icon: "game-controller-outline" }
};

window.LESSON_LANGS = {
  python: { title: "Python", page: "python.html" },
  cpp:    { title: "C++",    page: "cpp.html" }
};
