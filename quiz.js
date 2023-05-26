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
  createFiled("album", "Alegeți albumul din care face parte fiecare piesă", "Apăsați cu mouse-ul pe fiecare piesă, iar apoi apăsați numărul corespunzător fiecărui album.");

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
  query.id = idName + "_query_" + pos;
  text = document.createElement("legend");
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
    p.appendChild(input);
    p.appendChild(label);
    query.appendChild(p);
  }
  document.getElementById(idName + "id").appendChild(query);
}

function generateQueryOfSecondType(target) {
  
}

function populateQuiz(hardMode) {  
  let easy = 4, hard = 1;
  if (hardMode) {
    easy = 2;
    hard = 3;
  } 
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
  for (let i = 0; i < easy; i++) {
    generateQueryOfSecondType(easyWhen);
  }
  for (let i = 0; i < hard; i++) {
    generateQueryOfSecondType(hardWhen);
  }
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
    console.log(color);
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
  - Math: Math.Random(), Math.Floor() in generarea de intrebari
  - Array: Array.from() - generez nuemrele de la 0 la N
inputuri funcționale (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea)
  - functia de generare a query-urlor
modificare de proprietăți
  - modificarea proprietaatilor ale unor obiecte JSON in functiile de generare de query-uri
modificarea stilului unui element sau al unui grup de elemente:
  - modificarea culorii la radio-buttons si la range-uri in functie de dificultate

folosirea și modificarea evenimentelor generate de mouse si tastatură
folosirea setTimeout sau setInterval
folosirea localStorage (să se pastreze în localStorage o colecție de elemente)
folosirea a cel puțin unei metode din clasele: Math, Array, Date
schimbarea aleatoare a valorilor unor proprietăți (de exemplu: culoare, dimensiuni, poziție)
folosirea proprietăților classList, target sau currentTarget
folosirea metodelor getComputedStyle și stopPropagation
 */