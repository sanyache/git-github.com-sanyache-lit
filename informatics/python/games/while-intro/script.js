const $ = (s) => document.querySelector(s);
const screens = {intro:$("#introScreen"),game:$("#gameScreen"),result:$("#resultScreen")};
let score=0, completed=new Set(), level=0, soundOn=true, answered=false, selectedAnswer=null, breakChoice=null;
const maxScore=20;
const levels=[
 {title:"Лабораторія повторень",glyph:"🔁",kind:"quiz",intro:"Щоб відновити систему, потрібно навчитися керувати повтореннями. Цикл while виконує команди доти, доки умова істинна.",tasks:[
  {q:"Для чого використовується оператор while?",opts:["Виконує команду лише один раз","Повторює команди, поки умова істинна","Перевіряє, чи є число парним","Завершує програму"],a:1,ex:"while перевіряє умову перед кожним повторенням. Якщо вона True — тіло циклу виконується; якщо False — цикл завершується."},
  {q:"Що станеться після запуску програми?",code:"i = 1\nwhile i <= 5:\n    print(i)",opts:["Виведе числа від 1 до 5","Виведе числа від 1 до 4","Нескінченно виводитиме число 1","Виникне синтаксична помилка"],a:2,ex:"Значення i не змінюється. Умова i <= 5 завжди істинна, тому цикл нескінченний."},
  {q:"Яку команду потрібно додати, щоб вивести числа від 1 до 5?",code:"i = 1\nwhile i <= 5:\n    print(i)\n    ???",opts:["i = i + 1","i = 1","i = i - 1"],a:0,ex:"Збільшуючи i на 1, ми наближаємося до моменту, коли умова стане хибною."}
 ]},
 {title:"Кімната передбачень",glyph:"🔎",kind:"quiz",intro:"Не запускай код — виконай його подумки. Стеж за зміною значень змінних після кожної ітерації.",tasks:[
  {q:"Які числа будуть виведені?",code:"i = 2\nwhile i <= 8:\n    print(i)\n    i += 2",opts:["2 4 6 8","2 4 6","2 3 4 5 6 7 8","2 4 6 8 10"],a:0,ex:"Значення i послідовно дорівнюють 2, 4, 6 і 8. Після цього стає 10, а умова 10 <= 8 — хибна."},
  {q:"Який результат виконання програми?",code:"x = 10\nwhile x > 0:\n    print(x)\n    x -= 3",opts:["10 7 4 1","10 7 4","10 9 8 7 6 5 4 3 2 1","10 7 4 1 -2"],a:0,ex:"Після виведення 1 змінна x стає -2. Умова x > 0 вже хибна, тому -2 не виводиться."},
  {q:"Скільки разів виконається тіло циклу?",code:"i = 5\nwhile i < 5:\n    print('Hello')\n    i += 1",opts:["0 разів","1 раз","5 разів","Нескінченно багато"],a:0,ex:"Умова перевіряється до першого виконання тіла циклу. 5 < 5 — хибно, отже тіло не виконається."}
 ]},
 {title:"Лабіринт break",glyph:"🛑",kind:"break",intro:"Аварійна кнопка break миттєво завершує найближчий цикл. Знайди правильне місце для неї.",tasks:[
  {q:"Що буде виведено?",code:"i = 1\nwhile i <= 10:\n    print(i)\n    if i == 4:\n        break\n    i += 1",opts:["1 2 3 4","1 2 3","1 2 3 4 5 6 7 8 9 10","4"],a:0,ex:"Коли i дорівнює 4, число спочатку виводиться, а потім break завершує цикл."},
  {q:"Яку дію виконує break?",opts:["Пропускає одну ітерацію","Завершує найближчий цикл","Повертається на початок циклу","Змінює значення змінної"],a:1,ex:"break негайно виходить із найближчого циклу, навіть якщо його умова ще істинна."},
  {q:"Встав break у правильне місце. Програма повинна вивести числа від 1 до 7 включно, а потім зупинитися.",code:"x = 1\nwhile x <= 10:\n    x += 1\n    if x == 7:\n        [МІСЦЕ ДЛЯ break]\n    print(x)",breakTask:true,ex:"Правильно: після print(x). Спочатку число 7 виводиться, потім break завершує цикл."}
 ]},
 {title:"Сектор continue",glyph:"⏭️",kind:"quiz",intro:"У цьому секторі потрібно пропускати перешкоди. continue завершує лише поточну ітерацію та переходить до наступної перевірки умови.",tasks:[
  {q:"Що буде виведено?",code:"i = 0\nwhile i < 5:\n    i += 1\n    if i == 3:\n        continue\n    print(i)",opts:["1 2 3 4 5","1 2 4 5","1 2","3 4 5"],a:1,ex:"Коли i дорівнює 3, continue пропускає print(i). Цикл продовжується, тому виводяться 1, 2, 4 і 5."},
  {q:"У чому головна відмінність break і continue?",opts:["Вони виконують однакову дію","break завершує цикл, а continue пропускає поточну ітерацію","continue завершує цикл, а break пропускає ітерацію","break працює лише з числами"],a:1,ex:"break — вихід із циклу. continue — перехід до наступної ітерації без виконання решти тіла поточної."},
  {q:"Який оператор потрібно вставити, щоб пропускати парні числа?",code:"i = 0\nwhile i < 9:\n    i += 1\n    if i % 2 == 0:\n        ???\n    print(i)",opts:["break","continue","i += 2"],a:1,ex:"continue пропускає print(i) для парних значень. На екран потрапляють 1, 3, 5, 7, 9."}
 ]},
 {title:"Майстерня програміста",glyph:"🧰",kind:"workshop",intro:"Побудуй правильну послідовність команд. Зверни увагу: умова while має стояти перед командами, які повторюються.",tasks:[
  {q:"Розташуй команди у правильному порядку, щоб вивести числа від 1 до 4.",blocks:true},
  {q:"Який оператор пропускає поточну ітерацію, але не завершує весь цикл?",opts:["while","break","continue"],a:2,ex:"continue пропускає решту команд поточної ітерації та переходить до наступної перевірки умови."}
 ]},
 {title:"Фінальна місія: Відгадай число!",glyph:"🔐",kind:"final",intro:"Головний комп'ютер заблоковано! Склади програму з готових блоків. Вона має повторювати введення числа, давати підказки та зупинятися після правильної відповіді.",tasks:[]}
];
function showScreen(name){Object.values(screens).forEach(s=>s.classList.remove("active"));screens[name].classList.add("active");}
function updateStats(){$("#scoreTop").textContent=score;$("#keysTop").textContent=`${completed.size}/5`;$("#mapProgress").textContent=`${completed.size}/6`;document.querySelectorAll(".map-stop").forEach((b,i)=>{b.classList.toggle("current",i===level);b.classList.toggle("done",completed.has(i));b.classList.toggle("locked",i>level);});}
function start(){score=0;completed.clear();level=0;answered=false;showScreen("game");renderLevel();}
function renderLevel(){
 $("#checkBtn").onclick=checkLevel;
 $("#checkBtn").textContent="Перевірити ✓";
 answered=false;selectedAnswer=null;breakChoice=null;$("#feedback").textContent="Виконай завдання та натисни «Перевірити».";$("#feedback").className="feedback";$("#checkBtn").disabled=false;
 const L=levels[level];$("#levelEyebrow").textContent=`ЛОКАЦІЯ 0${level+1} · ${level===5?"ФІНАЛЬНА МІСІЯ":"ВИПРОБУВАННЯ"}`;$("#levelTitle").textContent=L.title;$("#levelGlyph").textContent=L.glyph;$("#storyText").textContent=L.intro;updateStats();
 if(L.kind==="quiz")renderQuizLevel(L);
 else if(L.kind==="break")renderBreakLevel(L);
 else if(L.kind==="workshop")renderWorkshop(L);
 else renderFinal();
}
function codeHTML(code){return code?`<pre class="code-box">${code.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])).replace(/\b(while|if|elif|else|break|continue|True|False)\b/g,'<span class="kw">$1</span>').replace(/\b(print|input|int)\b/g,'<span class="fn">$1</span>').replace(/\b(\d+)\b/g,'<span class="num">$1</span>')}</pre>`:"";}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderQuizLevel(L){
 let html=`<div class="lesson-box"><h3>💡 Пригадай</h3><p>${L.intro}</p></div>`;
 L.tasks.forEach((t,i)=>{html+=`<div class="task" data-task="${i}"><p class="question">${i+1}. ${t.q}</p>${codeHTML(t.code)}<div class="answers">${t.opts.map((o,j)=>`<button class="answer" data-task="${i}" data-answer="${j}"><span class="letter">${String.fromCharCode(65+j)}</span>${o}</button>`).join("")}</div><p class="explanation" hidden></p></div>`;});
 $("#levelContent").innerHTML=html;
 $("#levelContent").querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(answered)return;const task=+b.dataset.task;$("#levelContent").querySelectorAll(`.answer[data-task="${task}"]`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected");b.dataset.chosen="1";}));
}
function renderBreakLevel(L){
 let html=`<div class="lesson-box"><h3>💡 Запам'ятай</h3><p><b>break</b> повністю завершує найближчий цикл. Уважно подумай, чи має число 7 встигнути вивестися на екран.</p></div>`;
 L.tasks.forEach((t,i)=>{html+=`<div class="task" data-task="${i}"><p class="question">${i+1}. ${t.q}</p>${codeHTML(t.code)}${t.breakTask?`<div class="break-choice"><label><input type="radio" name="breakPlace" value="before"> Перед командою print(x)</label><label><input type="radio" name="breakPlace" value="after"> Після команди print(x)</label><label><input type="radio" name="breakPlace" value="outside"> Поза умовою if</label></div>`:`<div class="answers">${t.opts.map((o,j)=>`<button class="answer" data-task="${i}" data-answer="${j}"><span class="letter">${String.fromCharCode(65+j)}</span>${o}</button>`).join("")}</div>`}<p class="explanation" hidden></p></div>`;});
 $("#levelContent").innerHTML=html;
 $("#levelContent").querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(answered)return;const task=+b.dataset.task;$("#levelContent").querySelectorAll(`.answer[data-task="${task}"]`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected");}));
}
const workshopCorrect=["while i <= 4:","print(i)","i += 1","i = 1"]; // canonical order corrected below
function renderWorkshop(L){
 const initial=["i = 1","    print(i)","while i <= 4:","    i += 1"];
 $("#levelContent").innerHTML=`<div class="lesson-box"><h3>🧩 Конструктор команд</h3><p>Вибери блок і перемісти його стрілками. Потрібно отримати програму, яка виведе 1, 2, 3, 4.</p></div>
 <div class="task"><p class="question">1. Розташуй блоки у правильному порядку</p><div class="block-workspace"><p class="block-hint">Твоя програма · вибери блок, потім натисни ↑ або ↓</p><div class="block-list" id="workBlocks">${initial.map((x,i)=>blockHTML(x,i)).join("")}</div><div class="block-actions"><button class="mini-btn" id="workUp">↑ Угору</button><button class="mini-btn" id="workDown">↓ Вниз</button></div></div></div>
 <div class="task"><p class="question">2. Який оператор пропускає поточну ітерацію, але не завершує цикл?</p><div class="answers">${["while","break","continue"].map((o,j)=>`<button class="answer" data-task="1" data-answer="${j}"><span class="letter">${String.fromCharCode(65+j)}</span>${o}</button>`).join("")}</div></div>`;
 let order=[...initial],sel=0;
 function paint(){const el=$("#workBlocks");el.innerHTML=order.map((x,i)=>blockHTML(x,i,sel===i)).join("");el.querySelectorAll(".code-block").forEach((b,i)=>b.addEventListener("click",()=>{sel=i;paint();}));$("#workUp").disabled=sel===0;$("#workDown").disabled=sel===order.length-1;}
 paint();
 $("#workUp").onclick=()=>{if(sel>0){[order[sel-1],order[sel]]=[order[sel],order[sel-1]];sel--;paint();}};
 $("#workDown").onclick=()=>{if(sel<order.length-1){[order[sel+1],order[sel]]=[order[sel],order[sel+1]];sel++;paint();}};
 $("#levelContent").querySelectorAll(".answer").forEach(b=>b.addEventListener("click",()=>{if(answered)return;$("#levelContent").querySelectorAll(".answer").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");}));
 window.workshopOrder=()=>order;
}
function blockText(x){const n=x.length-x.trimStart().length;return `<span class="block-text" style="padding-left:${n*0.6}em">${escapeHTML(x.trimStart())}</span>`;}
function blockHTML(x,i,selected=false){return `<div class="code-block ${selected?"selected":""}" data-i="${i}"><span class="grip">⠿</span>${blockText(x)}</div>`;}
const finalBlocks=[
 "secret = 13","guess = 0","while guess != secret:","guess = int(input('Введи число: '))",
 "if guess < secret:","print('Загадане число більше')","elif guess > secret:","print('Загадане число менше')",
 "else:","print('Вітаю! Ви вгадали!')","break"
];
const finalCorrect=[0,1,2,3,4,5,6,7,8,9,10];
let finalOrder=[...finalCorrect],finalSelected=0,simCount=0;
function shuffledFinal(){let a;do{a=[...finalCorrect];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}}while(a.some((x,i)=>x===finalCorrect[i]));return a;}
function renderFinal(){
 finalOrder=shuffledFinal();finalSelected=0;simCount=0;
 const labels=["secret = 13","guess = 0","while guess != secret:","    guess = int(input('Введи число: '))","    if guess < secret:","        print('Загадане число більше')","    elif guess > secret:","        print('Загадане число менше')","    else:","        print('Вітаю! Ви вгадали!')","        break"];
 $("#levelContent").innerHTML=`<div class="lesson-box"><h3>🎯 Умова задачі</h3><p>Комп'ютер загадав число <b>13</b>. Склади програму, яка просить вводити числа, підказує: якщо введене число <b>менше</b> за загадане — «Загадане число більше», якщо <b>більше</b> — «Загадане число менше». Після правильної відповіді цикл має завершитися.</p></div>
 <div class="block-workspace"><p class="block-hint">ПРОГРАМА · вибери блок і переміщуй стрілками. Умови та вкладені команди мають іти в наведеному порядку.</p><div class="block-list" id="finalBlocks"></div><div class="block-actions"><button class="mini-btn" id="finalUp">↑ Угору</button><button class="mini-btn" id="finalDown">↓ Вниз</button><button class="mini-btn" id="finalReset">Перемішати знову</button></div><p class="block-hint" style="margin-top:12px">Підказка: блоки з відступом належать до попередньої умови або циклу.</p></div>
 <div class="simulator"><label for="guessInput">▶ Симуляція програми (секретне число: 13)</label><input id="guessInput" type="number" min="1" max="20" inputmode="numeric" placeholder="Введи число від 1 до 20"><button class="mini-btn" id="guessBtn">Виконати спробу</button><div class="sim-output" id="simOutput">Очікую введення числа…</div></div>`;
 const el=$("#finalBlocks");
 function paint(){el.innerHTML=finalOrder.map((id,i)=>`<div class="code-block ${i===finalSelected?"selected":""}" data-index="${i}"><span class="grip">⠿</span>${blockText(labels[id])}</div>`).join("");el.querySelectorAll(".code-block").forEach((b,i)=>b.onclick=()=>{finalSelected=i;paint();});$("#finalUp").disabled=finalSelected===0;$("#finalDown").disabled=finalSelected===finalOrder.length-1;}
 paint();
 $("#finalUp").onclick=()=>{if(finalSelected>0){[finalOrder[finalSelected-1],finalOrder[finalSelected]]=[finalOrder[finalSelected],finalOrder[finalSelected-1]];finalSelected--;paint();}};
 $("#finalDown").onclick=()=>{if(finalSelected<finalOrder.length-1){[finalOrder[finalSelected+1],finalOrder[finalSelected]]=[finalOrder[finalSelected],finalOrder[finalSelected+1]];finalSelected++;paint();}};
 $("#finalReset").onclick=()=>{finalOrder=shuffledFinal();finalSelected=0;paint();$("#simOutput").textContent="Блоки перемішано. Склади програму заново."};
 $("#guessBtn").onclick=()=>{const v=Number($("#guessInput").value);const out=$("#simOutput");if(!Number.isInteger(v)||v<1||v>20){out.textContent="Введи ціле число від 1 до 20.";return;}simCount++;out.textContent=v<13?"Загадане число більше. Спробуй ще раз.":v>13?"Загадане число менше. Спробуй ще раз.":"Вітаю! Ви вгадали! Цикл завершено через break.";if(v===13){out.textContent+="\nКількість спроб: "+simCount;$("#guessBtn").disabled=true;window.simWon=true;}};
 window.finalIsCorrect=()=>{const o=[...finalOrder];if(o[0]===1&&o[1]===0){o[0]=0;o[1]=1;}return o.every((x,i)=>x===finalCorrect[i]);};window.simWon=false;
}
function checkLevel(){
 if(answered)return;
 const L=levels[level];let earned=0,allCorrect=true,details=[];
 if(L.kind==="quiz"||L.kind==="break"){
  L.tasks.forEach((t,i)=>{
   if(t.breakTask){const choice=$('input[name="breakPlace"]:checked');const ok=choice&&choice.value==="after";if(ok)earned++;else allCorrect=false;details.push(ok);}
   else{const chosen=$(`.answer[data-task="${i}"].selected`);const ok=chosen&&+chosen.dataset.answer===t.a;if(ok)earned++;else allCorrect=false;details.push(ok);}
  });
  if(L.kind==="quiz"){$("#levelContent").querySelectorAll(".task").forEach((el,i)=>{const t=L.tasks[i];const chosen=el.querySelector(".answer.selected");el.querySelectorAll(".answer").forEach((b,j)=>{if(j===t.a)b.classList.add("correct");else if(b===chosen)b.classList.add("wrong");});const ex=el.querySelector(".explanation");ex.hidden=false;ex.textContent=t.ex;});}
  else{$("#levelContent").querySelectorAll(".task").forEach((el,i)=>{const t=L.tasks[i];if(t.breakTask){const ex=el.querySelector(".explanation");ex.hidden=false;ex.textContent=t.ex;}else{const chosen=el.querySelector(".answer.selected");el.querySelectorAll(".answer").forEach((b,j)=>{if(j===t.a)b.classList.add("correct");else if(b===chosen)b.classList.add("wrong");});const ex=el.querySelector(".explanation");ex.hidden=false;ex.textContent=t.ex;}});}
 }else if(L.kind==="workshop"){
  const order=window.workshopOrder();const okOrder=order.join("|")==="i = 1|while i <= 4:|    print(i)|    i += 1";
  const chosen=$("#levelContent .answer.selected");const okAnswer=chosen&&+chosen.dataset.answer===2;
  if(okOrder)earned+=1;else allCorrect=false;if(okAnswer)earned+=1;else allCorrect=false;
  $("#levelContent .block-workspace .block-hint").textContent=okOrder?"Послідовність правильна!":"Перевір порядок: спочатку i = 1, потім while, далі print(i) та i += 1.";
  if(chosen){chosen.classList.add(okAnswer?"correct":"wrong");}
 }else{
  const ok=window.finalIsCorrect();const won=window.simWon;earned=(ok?5:0)+(won?1:0);allCorrect=ok&&won;
  $("#simOutput").textContent += ok?"\nПорядок блоків правильний.":"\nПеревір порядок блоків: спочатку початкові значення, потім while, введення, умови, підказки та break.";
  if(!ok){$("#feedback").textContent="Програма має помилки. Перестав блоки та перевір знову.";$("#feedback").className="feedback bad";return;}
  if(!won){$("#feedback").textContent="Блоки розташовано правильно. Тепер виконай симуляцію та відгадай 13.";$("#feedback").className="feedback info";return;}
 }
 if(!completed.has(level)) score+=earned;completed.add(level);answered=true;updateStats();$("#checkBtn").disabled=true;
 $("#feedback").textContent=allCorrect?`Чудово! Усі відповіді правильні. +${earned} бал(ів).`:`Завдання перевірено. Ти отримав ${earned} бал(ів). Прочитай пояснення та рухайся далі.`;$("#feedback").className=allCorrect?"feedback good":"feedback info";
 $("#checkBtn").textContent=level===5?"Показати результат":"Наступна локація →";
 $("#checkBtn").disabled=false;$("#checkBtn").onclick=nextLevel;
}
function nextLevel(){if(level===5){showResult();return;}level++;$("#checkBtn").textContent="Перевірити ✓";$("#checkBtn").onclick=checkLevel;renderLevel();window.scrollTo({top:0,behavior:"smooth"});}
function showResult(){showScreen("result");$("#finalScore").textContent=score;$("#scoreBar").style.width=(score/maxScore*100)+"%";$("#resultMessage").textContent=score>=18?"Неймовірно! Ти справжній майстер циклів!":score>=14?"Чудова робота! Основи while тобі підкорилися.":"Гарний початок! Повтори пояснення та спробуй ще раз.";$("#resultBadges").innerHTML=["while — повторення","break — зупинка циклу","continue — пропуск ітерації","Python — конструювання алгоритму"].map(x=>`<span>✓ ${x}</span>`).join("");}
$("#startBtn").onclick=start;$("#restartBtn").onclick=()=>{ $("#checkBtn").onclick=checkLevel;$("#checkBtn").textContent="Перевірити ✓";start();};$("#homeLink").onclick=e=>{e.preventDefault();if(confirm("Повернутися на початок? Поточний прогрес буде втрачено.")){showScreen("intro");}};$("#checkBtn").onclick=checkLevel;$("#soundToggle").onclick=()=>{soundOn=!soundOn;$("#soundToggle").textContent=soundOn?"🔊":"🔇";};
document.querySelectorAll(".map-stop").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.level;if(i<=level&&i<6){level=i;renderLevel();}}));
