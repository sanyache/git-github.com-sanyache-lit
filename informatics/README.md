# Уроки інформатики

Розділ доступний зі сторінки `math-info.html` → «Уроки інформатики».

```
informatics/
  lessons.js        ← КАТАЛОГ: сюди дописувати нові уроки
  python.html       ← сторінка Python (будується автоматично з lessons.js)
  cpp.html          ← сторінка C++
  view.html         ← перегляд матеріалу (шапка сайту + сам урок)
  python/  cpp/
    presentations/  ← презентації
    visual/         ← візуалізації коду
    games/          ← інтерактивні ігри
```

## Як додати урок
1. Покладіть HTML-файл у потрібну папку, наприклад `cpp/games/quiz-loops.html`
   (назва латиницею, без пробілів).
2. У `lessons.js` допишіть у список `cpp` (або `python`):
   ```js
   { id: "cpp-quiz-loops", type: "game", title: "Вікторина: цикли", desc: "Перевір себе", file: "cpp/games/quiz-loops.html" },
   ```
   `type`: `presentation`, `visual` або `game`.
3. Для презентації Google Slides замість `file` вкажіть `url` з embed-посиланням
   («Файл → Поділитися → Опублікувати в Інтернеті → Вбудувати»).
