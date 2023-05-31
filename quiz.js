let easyGeneral, hardGeneral, easyWho, hardWho, easyWhen, hardWhen, albums;
const noQueries = 5;

function createFiled(idName, fieldName, fieldRule) {
  form = document.getElementById("quiz");
  field = document.createElement("fieldset");
  field.id = idName + "id";
  legend = document.createElement("legend");
  rule = document.createElement("h4");
  rule.innerHTML = fieldRule;
  rule.id = idName + "ruleid";
  legend.innerHTML = fieldName;
  field.appendChild(legend);
  field.appendChild(rule);
  form.appendChild(field);
}

function createQuiz(firstName) {
  oldForm = document.getElementById("quiz");
  if (oldForm) {
    oldForm.remove();
    let br = document.getElementById("0br");
    br.remove();
    br = document.getElementById("1br");
    br.remove();
  }
  form = document.createElement("form");
  form.target = "_self";
  form.method = "post";
  form.id = "quiz";
  for (let i = 0; i < 2; i++) {
    brLine = document.createElement("br");
    brLine.id = i.toString() + "br";
    document.querySelector("main").appendChild(brLine);
  }
  document.querySelector("main").appendChild(form);
  createFiled("intro", "Bun venit!", "Bine ai venit, " + firstName + "!. Ne bucurăm să te vedem. Spor la quiz și sperăm să te vedem în top!");
  createFiled("general", "Întrebări generale despre trupă", "Alegeți răspunsul corect!");
  createFiled("when", "Întrebări despre când s-au întrâmplat evenimente din istoria trupei", "Trebuie să fiți cât mai aproape de anul corect!");
  createFiled("who", "Întrebări despre cine e autorul unei fapte / piese", "Alegeți răspunsul corect!");
  createFiled("album", "Alegeți albumul din care face parte fiecare piesă", "Selectați albumul din care face parte fiecare piesă.");

  button = document.createElement("input");
  button.type = "submit";
  button.value = "Evaluează!";
  button.id = "submit";
}

function initQueries() {
  let url = "general.json";
  var generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    easyGeneral = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "general_hard.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    hardGeneral = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "who.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    easyWho = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "who_hard.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    hardWho = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "when.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    easyWhen = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "when_hard.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    hardWhen = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });

  url = "songs.json";
  generalEasyFetch = fetch(url);
  generalEasyFetch.then(function(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
  }).then(function(text) {
    albums = JSON.parse(text);
  }).catch(function(err) {
    alert(err);
  });
}

function generateRandomPerm() {
  let arr = Array.from(Array(4).keys());
  for (let i = 3; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateQueryOfFirstType(target, idName, shuffle) {
  let N = target.length;
  let pos = Math.floor(Math.random() * N);
  let copy = {"q": target[pos].q, "c": target[pos].c, "w1": target[pos].w1, "w2": target[pos].w2, "w3": target[pos].w3};
  let tmp = {"q": target[pos].q, "c": target[pos].c, "w1": target[pos].w1, "w2": target[pos].w2, "w3": target[pos].w3};
  perm = generateRandomPerm();
  if (shuffle) {
    for (let i = 0; i < perm.length; i++) {
      let b;
      if (perm[i] == 0) {
        b = tmp.c;
      } else if (perm[i] == 1) {
        b = tmp.w1;
      } else if (perm[i] == 2) {
        b = tmp.w2;
      } else {
        b = tmp.w3;
      }
      if (i == 0) {
        copy.c = b;
      } else if (i == 1) {
        copy.w1 = b;
      } else if (i == 2) {
        copy.w2 = b;
      } else {
        copy.w3 = b;
      }
    }
  }

  query = document.createElement("fieldset");
  text = document.createElement("legend");
  if (document.getElementById(idName + "_query" + pos.toString())) {
    generateQueryOfFirstType(target, idName, shuffle);
    return;
  } 
  query.id = idName + "_query" + pos.toString();
  text.innerHTML = copy.q;
  query.appendChild(text);
  for (let i = 0; i < 4; i++) {
    p = document.createElement("p");
    input = document.createElement("input");
    input.type = "radio";
    input.name = query.id;

    label = document.createElement("label");
    if (i == 0) {
      label.innerHTML = copy.c;
    } else if (i == 1) {
      label.innerHTML = copy.w1;
    } else if (i == 2) {
      label.innerHTML = copy.w2;
    } else {
      label.innerHTML = copy.w3;
    }

    if (label.innerHTML == tmp.c) {
      input.classList.add("corect" + idName);
    }
    p.appendChild(input);
    p.appendChild(label);
    query.appendChild(p);
  }

  document.getElementById(idName + "id").appendChild(query);
}

function generateQueryOfSecondType(target, idName, index) {
  let pos = Math.floor(Math.random() * target.length);
  
  query = document.createElement("fieldset");
  text = document.createElement("legend");
  text.innerHTML = target[pos].q;
  query.appendChild(text);
  label = document.createElement("label");
  label.for = idName + query.toString();
  label.innerHTML = "Alegeți anul: ";
  input = document.createElement("input");
  input.type = "number";
  input.name = idName + pos.toString();
  input.id = idName + "_query" + index.toString();

  input.style.backgroundColor = "#413737";
  input.style.color = "bisque";

  p = document.createElement("p");
  query.appendChild(p);
  p.appendChild(label);
  p.appendChild(input);

  input.classList.add(target[pos].c);

  document.getElementById(idName + "id").appendChild(query);
}

function generateQueryOfThirdType(index) {
  root = document.getElementById("albumid");
  let albumPos = Math.floor(Math.random() * albums.length);
  let songPos = Math.floor(Math.random() * albums[albumPos].songs.length);
  p = document.createElement("p");
  label = document.createElement("label");
  label.for = index + toString() + "album_query";
  label.innerHTML = albums[albumPos].songs[songPos] + "\n";
  select = document.createElement("select");
  select.name = label.for;
  cls = albums[albumPos].album.replace(/ /g, '');
  select.classList.add(cls);
  for (let i = 0; i < albums.length; i++) {
    option = document.createElement("option");
    option.innerHTML = albums[i].album;
    option.classList.add("optstyle");
    select.appendChild(option);
  }
  p.appendChild(label);
  p.appendChild(select);
  root.appendChild(p);
}

function genPopUp(standings, i) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  distr = "[";
  for (let j = 0; j < standings[i][2].length; j++) {
    if (j > 0) {
      distr += ", ";
    }
    distr += standings[i][2][j];
  }
  distr += "]";
  let text = standings[i][0] + " a făcut " + standings[i][1] + " puncte " + distr + " în data de " + standings[i][5] + "/" + standings[i][4] + "/" + standings[i][3] + " jucând " + standings[i][6];
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 5000);
}

function displayStandings(pos) {
  standings = JSON.parse(localStorage.getItem("best"));

  filed = document.createElement("fieldset");
  legend = document.createElement("legend");
  legend.innerHTML = "Cele mai bune rezultate";
  filed.appendChild(legend);

  table =  document.createElement("table");
  table.id = "standings";
  th = document.createElement("thead");
  table.appendChild(th);
  head = document.createElement("tr");
  thName = document.createElement("th");
  thName.innerHTML = "Nume";
  thScore = document.createElement("th");
  thScore.innerHTML = "Scor";
  thData = document.createElement("th");
  thData.innerHTML = "Anul";
  head.appendChild(thName);
  head.appendChild(thScore);
  head.appendChild(thData);
  th.appendChild(head);
  for (let i = 0; i < standings.length; i++) {
    let line = document.createElement("tr");
    let name = document.createElement("td");
    name.innerHTML = standings[i][0];
    line.appendChild(name);
    let score = document.createElement("td");
    score.innerHTML = standings[i][1].toString();
    line.appendChild(score);
    let year = document.createElement("td");
    year.innerHTML = standings[i][3];
    line.appendChild(year);

    if (i == pos) {
      line.style.fontWeight= "bold";
      for (let k = 0; k < 5; k++) {
        setTimeout(function() {
          while (true) {
            let color = ["red", "blue", "yellow", "purple", "pink", "green"];
            if (getComputedStyle(line).color != colors[Math.floor(Math.random() * color.length)]) {
              line.style.borderColor = colors[Math.floor(Math.random() * color.length)];
            }
          }
        }, 500);
      }
    }
    line.addEventListener("click", function(event) {
      event.stopPropagation();
      genPopUp(standings, i);
    });
    setTimeout(function() {
      table.appendChild(line);
    }, i * 1000);
  }

  document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case "1":
        genPopUp(standings, 1);
        break;
      case "2":
        genPopUp(standings, 2);
        break;
      case "3":
        genPopUp(standings, 3);
        break;
      case "4":
        genPopUp(standings, 4);
        break;
      case "5":
        genPopUp(standings, 5);
        break;
      default:
        break;
    }
  });

  filed.appendChild(table);
  document.getElementById("results").appendChild(filed);
}

function updateStorage(a, b, c, d, fullName, mode) {
  let standings;
  if (localStorage.getItem("best")) {
    standings = JSON.parse(localStorage.getItem("best"));
  } else {
    standings = []
    for (let i = 0; i < 5; i++) {
      let NAArray = ["NA", 0, [0, 0, 0, 0], "2003", "3", "19", "NA"];
      standings.push(NAArray);
    }
  }

  let score = a + b + c + d, change = -1;
  for (let i = 0; i < standings.length; i++) {
    if (score >= standings[i][1]) {
      change = i;
      break;
    }
  }
  if (change != -1) {
    for (let i = standings.length - 1; i > change; i--) {
      standings[i] = standings[i - 1];
    }
    let currDate = new Date();
    let newScoreArr = [fullName, score, [a, b, c, d], currDate.getFullYear(), parseInt(currDate.getMonth() + 1).toString(), currDate.getDate(), mode];
    standings[change] = newScoreArr;
  }

  localStorage.setItem("best", JSON.stringify(standings));
  return change;
}

function showResults(a, b, c, d, mode) {
  let currScore = a + b + c + d;

  root = document.querySelectorAll("main")[0];
  root.appendChild(document.createElement("br"));
  root.appendChild(document.createElement("br"));

  f = document.createElement("form");
  f.id = "results";
  field = document.createElement("fieldset");
  legend = document.createElement("legend");
  legend.innerHTML = "Rezultate";
  f.appendChild(field);
  field.appendChild(legend);

  currResult = document.createElement("fieldset");
  currLegend = document.createElement("legend");
  currLegend.innerHTML = "Rezultatul tău";
  currResult.appendChild(currLegend);
  yourScoreText = document.createElement("h4");
  yourScoreText.innerHTML = "Scorul tău este " + currScore.toString() + "! Distribuția scorului este: întrebări generale " + a.toString() + " puncte, întrebări de ghicit anul " + b.toString() + "puncte, întrebări despre cine a făcut o acțiune " + c.toString() + " puncte și întrebări despre albumul pieselor " + d.toString() + " puncte!";
  currResult.appendChild(yourScoreText);
  field.appendChild(currResult);

  root.appendChild(f);
  let pos = updateStorage(a, b, c, d, document.getElementById("name").value, mode);
  displayStandings(pos);
}

function evaluate(mode) {
  let generalCorrect = 0, whoCorrect = 0, whenCorrect = 0, albumCorrect = 0;
  generalFiled = document.getElementById("generalid");
  for (let i = 2; i < generalFiled.children.length; i++) {
    for (let j = 1; j < generalFiled.children[i].children.length; j++) {
      let query = generalFiled.children[i].children[j];
      if (query.firstChild.checked && query.firstChild.classList.contains("corectgeneral")) {
        generalCorrect += 4;
      }
    }
  }
  whoFiled = document.getElementById("whoid");
  for (let i = 2; i < whoFiled.children.length; i++) {
    for (let j = 1; j < whoFiled.children[i].children.length; j++) {
      let query = whoFiled.children[i].children[j];
      if (query.firstChild.checked && query.firstChild.classList.contains("corectwho")) {
        whoCorrect += 3;
      }
    }
  }

  whenField = document.getElementById("whenid");
  for (let i = 2; i < whenField.children.length; i++) {
    query = whenField.children[i].children[1];
    if (query.children[1].value) {
      let answer = parseInt(query.children[1].value);
      let correct = parseInt(query.children[1].classList[0]);
      if (Math.abs(correct - answer) <= 3) {
        whenCorrect += 4 - Math.abs(correct - answer);
      }
    }
  }

  albumFiled = document.getElementById("albumid");
  for (let i = 2; i < albumFiled.children.length; i++) {
    query = albumFiled.children[i].children[1];
    modified = query.value.replace(/ /g, '');
    if (query.classList.contains(modified)) {
      albumCorrect += 3;
    }
  }
  showResults(generalCorrect, whenCorrect, whoCorrect, albumCorrect, mode);
  document.getElementById("submit_quiz").remove();
}

function populateQuiz(hardMode) {  
  let easy = 4, hard;
  if (hardMode) {
    easy = 2;
  } 
  hard = noQueries - easy;
  for (let i = 0; i < easy; i++) {
    generateQueryOfFirstType(easyGeneral, "general", true);
    generateQueryOfFirstType(easyWho, "who", false);
  }
  for (let i = 0; i < hard; i++) {
    generateQueryOfFirstType(hardGeneral, "general", true);
    generateQueryOfFirstType(hardWho, "who", false);
  }

  easy = 3;
  if (hardMode) {
    easy = 1;
  }
  hard = noQueries - easy;
  for (let i = 0; i < easy; i++) {
    generateQueryOfSecondType(easyWhen, "when", i);
  }
  for (let i = 0; i < hard; i++) {
    generateQueryOfSecondType(hardWhen, "when", i);
  }
  for (let i = 0; i < noQueries * 2; i++) {
    generateQueryOfThirdType("alb", i);
  }

  form = document.getElementById("quiz");
  button = document.createElement("input");
  button.type = "submit";
  button.value = "Evaluează!";
  button.id = "submit_quiz";

  form.appendChild(button);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    mode = "Easy Mode";
    if (hardMode) {
      mode = "Hard Mode";
    }
    evaluate(mode);
  });
}

window.onload = function() {
  initQueries();

  document.getElementById("formdif").addEventListener("submit", function(event) {
    event.preventDefault();
    firstName = document.getElementById("name").value;
    endFirstName = firstName.indexOf(" ");
    firstName = firstName.slice(0, endFirstName);
    createQuiz(firstName);
    let color;
    if (document.getElementById("ez").checked) {
      populateQuiz(false);
      color = "bisque";
    } else {
      populateQuiz(true);
      color = "black";
    }
    document.querySelectorAll('input[type="radio"]').forEach(function(item) {
      item.style.accentColor = color;
    })
    document.querySelectorAll('input[type="range"]').forEach(function(item) {
      item.style.backgorundColor = color;
    })
    document.getElementById("formdif").style.display = "none";
  });
}

/*
fișier separat pentru codul JavaScript:
  - fișier quiz.js
validarea datelor dintr-un formular folosind expresii regulate:
  - în quiz.js, la validarea numelui
manipularea DOM-ului (selectare după id, tag, clasă, folosind selectori CSS):
  - slecetie dupa id in windowd.onload
  - quierySelectAll in createQuiz
crearea și stergerea de elemente HTML:
  - createElemet in createQuiz
  - remove in createQuiz
folosirea a cel puțin unei metode din clasele: Math, Array, String, Date
  - String: in eventListener pentru submit la primul formlar, pentru a obtine prenumele
  - Math: Math.Random(), Math.Floor() in generarea de intrebari, Math.abs() pentru raspunsuri la intrebari de tip an
  - Array: Array.from() - generez nuemrele de la 0 la N
  - Date - getFullYear(), getMonth(), etc in updateTable();
inputuri funcționale (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea)
  - functia de generare a query-urlor
modificare de proprietăți
  - modificarea proprietaatilor ale unor obiecte JSON in functiile de generare de query-uri
modificarea stilului unui element sau al unui grup de elemente:
  - modificarea culorii la radio-buttons si la range-uri in functie de dificultate
folosirea proprietăților classList, target sau currentTarget:
  - folosirea classList pentru gasirea raspunsurilor corecte mai usor (in functiile generaateQueryOfFirstType() si generateQueryOfSecondType())
folosirea localStorage (să se pastreze în localStorage o colecție de elemente)
  - functia updateStorage(), tin minte cele mai bune rezultate
folosirea setTimeout sau setInterval:
  - cand afisez tabelul, apare prima data locul 1, dupa 2, dupa 3, etc, etc - in functia displayStandings()
folosirea și modificarea evenimentelor generate de mouse si tastatură:
  - la click-ul pe mouse se declanseasza un popup - in functia displayStandings() 
  - la apasarea unei taste (1, 2, 3, 4, 5)  se afiseaza popul-ul pentru respectiva pozitie displayStandings
folosirea metodelor getComputedStyle și stopPropagation:
  - in momentul in care dau click, dau stopPropagation
  - getComputedStyle cand modific culoarea la border
 */