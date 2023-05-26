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

let easyGeneral, hardGeneral, easyWho, hardWho, easyWhen, hardWhen, albums;

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

function populateQuiz(hardMode) {  
  console.log(easyGeneral[0].q);
  console.log(hardGeneral[0].q);
  console.log(easyWho[0].q);
  console.log(hardWho[0].q);
  console.log(easyWhen[0].q);
  console.log(hardWhen[0].q);
  console.log(albums[0].album);
}

window.onload = function() {
  initQueries();

  document.getElementById("formdif").addEventListener("submit", function(event) {
    event.preventDefault();
    firstName = document.getElementById("name").value;
    endFirstName = firstName.indexOf(" ");
    firstName = firstName.slice(0, endFirstName);
    createQuiz(firstName);
    if (document.getElementById("ez").checked) {
      populateQuiz(false);
    } else {
      populateQuiz(true);
    }
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


modificarea stilului unui element sau al unui grup de elemente
folosirea și modificarea evenimentelor generate de mouse si tastatură
modificare de proprietăți
inputuri funcționale (de exemplu: input de tip text/range/number/radio/checkbox, select, textarea)
folosirea setTimeout sau setInterval
folosirea localStorage (să se pastreze în localStorage o colecție de elemente)
folosirea a cel puțin unei metode din clasele: Math, Array, Date
schimbarea aleatoare a valorilor unor proprietăți (de exemplu: culoare, dimensiuni, poziție)
folosirea proprietăților classList, target sau currentTarget
folosirea metodelor getComputedStyle și stopPropagation
 */