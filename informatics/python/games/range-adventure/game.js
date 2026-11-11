(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const screens = ["intro-screen", "map-screen", "game-screen", "complete-screen", "final-screen"];
  const missions = [
    {
      title: "Три ключі від лабораторії", icon: "🗝️", description: "Навчись читати три форми range().",
      tip: "range(stop) починається з 0. У range(start, stop) початок задаєш сам. stop не включається.",
      tasks: [
        {q:"Яку послідовність створить range(5)?",code:"range(5)",opts:["0, 1, 2, 3, 4","1, 2, 3, 4, 5","0, 1, 2, 3, 4, 5"],a:0,why:"Коли вказано лише stop, початок дорівнює 0. Число 5 не включається.",hint:"Згадай: якщо start не вказаний, Python використовує 0."},
        {q:"Яку послідовність створить range(2, 7)?",code:"range(2, 7)",opts:["0, 1, 2, 3, 4, 5, 6","2, 3, 4, 5, 6","2, 3, 4, 5, 6, 7"],a:1,why:"Починаємо з 2 і рухаємося з кроком 1, зупиняючись перед 7.",hint:"Перше число — 2. Останнє можливе — на одиницю менше за 7."},
        {q:"Яку послідовність створить range(1, 10, 2)?",code:"range(1, 10, 2)",opts:["1, 3, 5, 7, 9","1, 2, 3, 4, 5, 6, 7, 8, 9","1, 3, 5, 7, 9, 11"],a:0,why:"Починаємо з 1 і щоразу додаємо 2. Число 10 не включається.",hint:"Почни з 1 та кілька разів додай крок 2, не доходячи до 10."}
      ]
    },
    {
      title:"Міст числових кроків",icon:"🌉",description:"Навчись керувати кроком step і рухатися назад.",
      tip:"Додатний step збільшує числа, від’ємний — зменшує. Для руху назад start має бути більшим за stop.",
      tasks:[
        {q:"Які числа надрукує цей цикл?",code:"for i in range(2, 12, 3):\\n    print(i, end=' ')",opts:["2 3 4 5 6 7 8 9 10 11","2 5 8","2 5 8 11"],a:1,why:"Отримуємо 2, 5, 8. Наступне число 11? Воно менше за 12, отже також має бути включене: правильна послідовність — 2, 5, 8, 11.",hint:"Почни з 2 і додавай 3. Перевір, чи 11 менше за 12." ,a:2},
        {q:"Який результат виконання коду?",code:"for i in range(10, 0, -2):\\n    print(i, end=' ')",opts:["10 8 6 4 2","10 8 6 4 2 0","0 2 4 6 8"],a:0,why:"Крок -2 зменшує число. До 0 не доходимо, бо stop не включається.",hint:"Віднімай 2 від 10, доки наступне число залишається більшим за 0."},
        {q:"Який виклик range() виведе 9, 6, 3?",code:"",opts:["range(9, 3, -3)","range(9, 2, -3)","range(9, 0, 3)"],a:1,why:"Потрібен від’ємний крок -3, а stop має бути меншим за 3, щоб число 3 потрапило до послідовності.",hint:"Потрібен крок -3. Пам’ятай, що stop не включається."}
      ]
    },
    {
      title:"Лабораторія виправлень",icon:"🛠️",description:"Знайди помилки в командах Баг-Х.",
      tip:"Щоб включити потрібне останнє число, зазвичай встановлюй stop на одиницю далі (для цілого кроку 1).",
      tasks:[
        {q:"Потрібно надрукувати числа від 1 до 10 включно. Як виправити код?",code:"for i in range(1, 10):\\n    print(i)",opts:["range(1, 11)","range(0, 10)","Залишити без змін"],a:0,why:"Число 10 має потрапити до послідовності, тому stop дорівнює 11.",hint:"stop не включається. Яке значення має стояти після 10?"},
        {q:"Потрібно отримати 5, 10, 15, 20. Який виклик правильний?",code:"",opts:["range(5, 20, 5)","range(5, 21, 5)","range(5, 21)"],a:1,why:"Крок 5, а stop = 21, щоб число 20 було включене.",hint:"Крок має бути 5. Зроби stop трохи більшим за 20."},
        {q:"Потрібно отримати 8, 6, 4, 2. Який виклик правильний?",code:"",opts:["range(8, 2, -2)","range(8, 1, -2)","range(8, 1, 2)"],a:1,why:"Використовуємо від’ємний крок -2 і stop = 1, щоб 2 увійшло до послідовності.",hint:"Рухаємося назад, отже step від’ємний. Число 2 має бути більшим за stop."}
      ]
    },
    {
      title:"Робот-кур’єр",icon:"🤖",description:"Склади команди для робота та його маршрутів.",
      tip:"Під час складання range() перевір три речі: звідки стартуємо, перед яким числом зупиняємося і яким кроком рухаємося.",
      tasks:[
        {q:"Робот має відвідати кімнати з номерами від 0 до 6. Що записати замість пропуску?",code:"for room in range(____):\\n    print(room)",type:"input",answers:["7","range(7)"],display:"Введи значення stop або весь виклик range().",why:"range(7) створює числа від 0 до 6.",hint:"Потрібно отримати 7 чисел: 0, 1, 2, 3, 4, 5, 6."},
        {q:"Робот збирає парні числа від 2 до 20 включно. Який виклик потрібен?",code:"for i in range(?, ?, ?):\\n    print(i)",opts:["range(2, 20, 2)","range(2, 21, 2)","range(0, 21, 2)"],a:1,why:"Початок 2, stop 21, крок 2. Так отримаємо 2, 4, ..., 20.",hint:"Початок 2, крок 2. Щоб включити 20, stop має бути більшим за 20."},
        {q:"Робот повертається назад: 15, 13, 11, 9, 7, 5. Який виклик правильний?",code:"",opts:["range(15, 5, -2)","range(15, 4, -2)","range(15, 4, 2)"],a:1,why:"Крок -2, а stop = 4, тому останнім числом буде 5.",hint:"Використай від’ємний крок і stop, менший за 5."}
      ]
    },
    {
      title:"Ядро системи",icon:"💎",description:"Фінальна перевірка: доведи, що ти майстер range().",
      tip:"Ти вже знаєш головне: start входить, stop не входить, step задає напрямок і величину кроку.",
      tasks:[
        {q:"Скільки разів виконається цикл?",code:"for i in range(3, 15, 3):",opts:["3","4","5","6"],a:1,why:"Значення i: 3, 6, 9, 12. Отже, чотири повторення.",hint:"Випиши всі числа, починаючи з 3 і додаючи 3, поки не досягнеш 15."},
        {q:"Який список утворить list(range(5, 0, -1))?",code:"list(range(5, 0, -1))",opts:["[5, 4, 3, 2, 1]","[5, 4, 3, 2, 1, 0]","[0, 1, 2, 3, 4]"],a:0,why:"Крок -1, а 0 не включається.",hint:"Рухайся від 5 вниз до числа, яке ще більше за 0."},
        {q:"Який виклик створить послідовність 4, 7, 10, 13?",code:"",opts:["range(4, 13, 3)","range(4, 14, 3)","range(4, 15, 2)"],a:1,why:"Починаємо з 4, крок 3, stop = 14 — число 14 не включається.",hint:"Після 13 наступне число — 16. Вибери stop між 13 і 16."},
        {q:"Що виведе цей код?",code:"for i in range(4):\\n    print(i * 2, end=' ')",opts:["0 2 4 6","2 4 6 8","0 1 2 3"],a:0,why:"i набуває значень 0, 1, 2, 3. Після множення на 2 отримаємо 0, 2, 4, 6.",hint:"Спочатку знайди значення i, а потім помнож кожне на 2."},
        {q:"Що поверне range(10, 2, 2)?",code:"range(10, 2, 2)",opts:["10, 8, 6, 4","10, 12","Порожню послідовність"],a:2,why:"Крок додатний, але start більший за stop. Рух у бік stop неможливий, тому послідовність порожня.",hint:"Крок +2 збільшує число. Чи можна так дійти від 10 до 2?"}
      ]
    }
  ];

  let score=0, completed=0, level=0, taskIndex=0, selected=null, answered=false, hintUsed=false, soundOn=false;
  const audioCtx = window.AudioContext ? new AudioContext() : null;
  function beep(freq=520,duration=.08){if(!soundOn||!audioCtx)return;try{if(audioCtx.state==="suspended")audioCtx.resume();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=freq;o.type="sine";g.gain.value=.045;o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+duration)}catch(e){}}
  function showScreen(id){screens.forEach(s=>$("#"+s).classList.toggle("active",s===id));window.scrollTo({top:0,behavior:"smooth"});}
  function updateStats(){$("#score").textContent=score;$("#stars").textContent=completed+"/5";$("#game-score").textContent=score;$("#progress-label").textContent=completed+" із 5 місій";$("#progress-bar").style.width=(completed/5*100)+"%";$("#module-icons").innerHTML=missions.map((_,i)=>`<span class="${i<completed?"filled":""}">${i<completed?"★":"○"}</span>`).join("");}
  function updateMap(){document.querySelectorAll(".location-node").forEach((node,i)=>{node.classList.toggle("done",i<completed);node.classList.toggle("locked",i>completed);node.classList.toggle("current",i===completed);node.querySelector("em").textContent=i<completed?"Пройдена":i===completed?"Відкрита":"Заблокована";node.querySelector(".node-emoji").textContent=i<completed?"⭐":missions[i].icon;});$("#continue-btn").textContent=completed===5?"Переглянути результат →":"До доступної місії →";updateStats();}
  function startLevel(n){if(n>completed||n>=5)return;level=n;taskIndex=0;renderTask();showScreen("game-screen");}
  function renderTask(){const m=missions[level],t=m.tasks[taskIndex];selected=null;answered=false;hintUsed=false;$("#mission-number").textContent=`МІСІЯ ${level+1} / 5`;$("#mission-progress-bar").style.width=((taskIndex/m.tasks.length)*100)+"%";$("#mission-art").textContent=m.icon;$("#mission-kicker").textContent=`ЛОКАЦІЯ ${level+1} · ВИПРОБУВАННЯ`;$("#mission-title").textContent=m.title;$("#mission-description").textContent=m.description;$("#challenge-counter").textContent=`ЗАВДАННЯ ${taskIndex+1} / ${m.tasks.length}`;$("#question-text").textContent=t.q;$("#question-extra").innerHTML=t.code?`<pre class="code-box">${escapeHtml(t.code.replace(/\\n/g,"\n"))}</pre>`:"";$("#feedback").className="feedback";$("#feedback").textContent="";$("#tip-text").textContent=m.tip;$("#hint-btn").disabled=false;$("#hint-btn").classList.remove("hidden");$("#check-btn").classList.remove("hidden");$("#next-btn").classList.add("hidden");
    const area=$("#answer-area");area.innerHTML="";
    if(t.type==="input"){const input=document.createElement("input");input.className="answer-input";input.id="typed-answer";input.placeholder=t.display;input.autocomplete="off";input.setAttribute("aria-label","Ваша відповідь");area.appendChild(input);}
    else t.opts.forEach((opt,i)=>{const b=document.createElement("button");b.type="button";b.className="answer-option";b.innerHTML=`<span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHtml(opt)}</span>`;b.addEventListener("click",()=>{if(answered)return;selected=i;area.querySelectorAll(".answer-option").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");});area.appendChild(b);});
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function checkAnswer(){if(answered)return;const t=missions[level].tasks[taskIndex];let correct=false;if(t.type==="input"){const val=$("#typed-answer").value.trim().replace(/\s/g,"").toLowerCase();correct=t.answers.some(a=>a.replace(/\s/g,"").toLowerCase()===val);}else correct=selected===t.a;if(t.type!=="input"&&selected===null){$("#feedback").className="feedback bad";$("#feedback").textContent="Спочатку обери один варіант відповіді.";return;}if(t.type==="input"&&!$("#typed-answer").value.trim()){ $("#feedback").className="feedback bad";$("#feedback").textContent="Введи відповідь у поле.";return;}
    answered=true;const fb=$("#feedback");if(correct){const points=hintUsed?7:10;score+=points;fb.className="feedback good";fb.textContent=`✓ Правильно! +${points} балів. ${t.why}`;beep(760,.12);}else{fb.className="feedback bad";fb.textContent=`✗ Не зовсім. ${t.why}`;beep(220,.16);}
    if(t.type!=="input"){const opts=$("#answer-area").querySelectorAll(".answer-option");opts.forEach((b,i)=>{if(i===t.a)b.classList.add("correct");else if(i===selected&&!correct)b.classList.add("wrong");});}
    $("#check-btn").classList.add("hidden");$("#next-btn").classList.remove("hidden");$("#hint-btn").classList.add("hidden");$("#game-score").textContent=score;
  }
  function showHint(){const t=missions[level].tasks[taskIndex];hintUsed=true;$("#tip-text").textContent="Підказка: "+t.hint;$("#hint-btn").disabled=true;$("#hint-btn").textContent="Підказку використано";}
  function nextTask(){if(taskIndex<missions[level].tasks.length-1){taskIndex++;renderTask();}else completeLevel();}
  function completeLevel(){if(level===completed){completed++;score+=10;}updateStats();$("#complete-icon").textContent=level===4?"🏆":"🌟";$("#complete-title").textContent=level===4?"Ти врятував цифровий світ!":"Чудова робота!";$("#complete-text").textContent=level===4?"Усі п’ять модулів відновлено. Ти став Майстром циклів Python!":"Ти відновив модуль «"+missions[level].title+"». Наступна локація вже чекає!";$("#earned-points").textContent="+10";$("#earned-stars").textContent="⭐";$("#complete-continue").textContent=level===4?"Отримати сертифікат →":"Наступна локація →";updateMap();showScreen("complete-screen");beep(880,.2);}
  function afterComplete(){if(completed===5){$("#final-score").textContent=score;showScreen("final-screen");}else showScreen("map-screen");}
  $("#start-btn").addEventListener("click",()=>{updateMap();showScreen("map-screen");});
  document.querySelectorAll(".location-node").forEach(n=>n.addEventListener("click",()=>{const i=Number(n.dataset.level);if(i<=completed)startLevel(i);}));
  $("#continue-btn").addEventListener("click",()=>{if(completed===5){$("#final-score").textContent=score;showScreen("final-screen");}else startLevel(completed);});
  $("#back-map").addEventListener("click",()=>{updateMap();showScreen("map-screen");});
  $("#check-btn").addEventListener("click",checkAnswer);$("#next-btn").addEventListener("click",nextTask);$("#hint-btn").addEventListener("click",showHint);
  $("#complete-continue").addEventListener("click",afterComplete);$("#complete-map").addEventListener("click",()=>{updateMap();showScreen("map-screen");});
  $("#restart-btn").addEventListener("click",()=>{score=0;completed=0;level=0;taskIndex=0;updateMap();showScreen("intro-screen");});
  $("#print-btn").addEventListener("click",()=>window.print());
  $("#sound-toggle").addEventListener("click",()=>{soundOn=!soundOn;$("#sound-toggle").textContent=soundOn?"🔊 Звук: увімкнено":"🔊 Звук: вимкнено";$("#sound-toggle").setAttribute("aria-pressed",String(soundOn));beep(600,.08);});
  updateStats();
})();