onLoad();

var saveButton = document.getElementById("save-availability");
saveButton.addEventListener("click", () => {});

function checkStorage() {
  const lsUser = localStorage["user"];
  const ssUser = sessionStorage["user"];
  var parsedUser = {};
  if (ssUser) {
    parsedUser = JSON.parse(ssUser);
    if (parsedUser.availability && parsedUser.availability.counter > 0) return parsedUser.availability;
  }
  if (lsUser) {
    parsedUser = JSON.parse(lsUser);
    if (parsedUser.availability && parsedUser.availability.counter > 0) {
      sessionStorage.setItem("user", lsUser);
      return parsedUser.availability;
    } else {
      parsedUser.availability = {
        counter: 0,
        details: {
          monday: {},
          tuesday: {},
          wednesday: {},
          thursday: {},
          friday: {},
          saturday: {},
          sunday: {},
        },
      };
      sessionStorage.setItem("user", JSON.stringify(parsedUser));
    }
  }
  return false;
}

function onLoad() {
  var actionButtonsCounter = 0,
    timeEntryCounter = 0;
  const storedAvailability = checkStorage();
  if (storedAvailability) {
    const days = Object.keys(storedAvailability.details);
    for (var i = 0; i < days.length; i++) {
      var dayAvailability = storedAvailability.details[days[i]];
      var availabilityKeys = Object.keys(dayAvailability);
      if (availabilityKeys.length == 0) {
        populate(".time-entry-wrapper", ["#day-entry-placeholder"], i);
        populate(".action-buttons", ["#add-time-icon"], actionButtonsCounter++);
      } else {
        for (var j = 0; j < availabilityKeys.length; j++) {
          populate(".time-entry-wrapper", ["#day-entry"], i);
          populate(".arrow-box", ["#right-arrow"], timeEntryCounter++);
          populate(".action-buttons", ["#add-time-icon", "#remove-time-icon"], actionButtonsCounter++);
        }
      }
    }
  } else {
    populate(".time-entry-wrapper", ["#day-entry-placeholder"]);
    populate(".action-buttons", ["#add-time-icon"]);
  }

  createTimeSelectorHtmlElements();
  populateTimeSelectorsOptions(storedAvailability.details);
}

function populate(divClass, templateIdArray, divPosition) {
  // If divPosition == null > template will be appended to all elements with specified class
  const nodeList = document.querySelectorAll(divClass);
  if (divPosition || divPosition == 0) {
    templateIdArray.forEach((templateId) => {
      const template = document.querySelector(templateId);
      const content = document.importNode(template.content, true);
      nodeList[divPosition].appendChild(content);
    });
  } else {
    nodeList.forEach((element) => {
      templateIdArray.forEach((templateId) => {
        const template = document.querySelector(templateId);
        const content = document.importNode(template.content, true);
        element.appendChild(content);
      });
    });
  }
}

var actionButtons = document.querySelectorAll(".action-buttons");
actionButtons.forEach((element, id) => {
  element.addEventListener("click", () => {
    populate(".time-entry-wrapper", ["#day-entry"], id);
    populate(".action-buttons", ["#add-time-icon", "#remove-time-icon"], id + 1);
    populate(".arrow-box", ["#right-arrow"], id + 1);
    createTimeSelectorHtmlElements();
    populateTimeSelectorsOptions();
  });
});

function createTimeSelectorHtmlElements() {
  var timeSelectorTemplate = document.querySelector("#times-to-select");
  var timeSelectors = document.querySelectorAll(".time-selector");

  timeSelectors.forEach((element, index) => {
    const content = document.importNode(timeSelectorTemplate.content, true);
    element.appendChild(content);
    const selectElement = element.querySelector("select");
    element.addEventListener("click", () => {
      const selectedValue = selectElement.value; // Obtenha o valor da opção selecionada

      // console.log("Índice: " + index);
      // console.log(`Opção selecionada: ${selectedValue}`);
      // console.log("Id: " + timeSelectors[index].parentElement.parentElement.parentElement.parentElement.id);
      selectionParse(index, selectedValue);
    });
  });
}

function selectionParse(index, selectedValue) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  var availability = user.availability.details;
  const daysString = Object.keys(availability);
  for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
    var availabilityWindows = Object.keys(availability[daysString[dayIndex]]).length;
    if (index < availabilityWindows * 2) {
      user.availability.details[daysString[dayIndex]][Math.trunc(index / 2)][index % 2] = parseFloat(selectedValue);
      sessionStorage.setItem("user", JSON.stringify(user));
      break;
    } else {
      index -= availabilityWindows * 2;
    }
  }
}

function populateTimeSelectorsOptions(availability) {
  var x, i, j, l, selElmnt, a, b, c;
  x = document.getElementsByClassName("time-selector");
  l = x.length;

  function findNextNonEmptySlot() {
    for (var day in availability) {
      if (availability[day] && Object.keys(availability[day]).length > 0) {
        for (var slotIndex in availability[day]) {
          if (availability[day][slotIndex]) {
            var slot = availability[day][slotIndex];
            availability[day][slotIndex] = null;
            return slot;
          }
        }
      }
    }
    return null;
  }

  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");

    var nextSlot = findNextNonEmptySlot();
    if (nextSlot) {
      var start = nextSlot[0];
      var end = nextSlot[1];
      a.innerHTML = start + " - " + end;
      x[i].appendChild(a);

      // Create and populate two select elements
      for (var k = 0; k < 2; k++) {
        b = document.createElement("select");
        for (j = start; j <= end; j++) {
          var option = document.createElement("option");
          option.text = j;
          b.appendChild(option);
        }
        x[i].appendChild(b);
      }
    } else {
      a.innerHTML = "N/A";
      x[i].appendChild(a);
    }
  }
}

function populateTimeSelectorsOptions(availability) {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("time-selector");
  l = x.length;

  // Função para encontrar o próximo valor não nulo em availability
  function findNextNonEmptySlot() {
    for (var day in availability) {
      if (availability[day] && Object.keys(availability[day]).length > 0) {
        for (var slotIndex in availability[day]) {
          if (availability[day][slotIndex] && Array.isArray(availability[day][slotIndex]) && availability[day][slotIndex].length > 0) {
            var slot = availability[day][slotIndex][0];
            if (availability[day][slotIndex][length] > 1) {
              availability[day][slotIndex].shift();
            } else {
              availability[day][slotIndex] = null;
            } // Marcar como selecionado
            return slot;
          }
        }
      }
    }
    return null; // Todos os slots foram selecionados
  }

  function stringifyTime(time) {
    if (Number.isInteger(time)) {
      return `${time}:00`;
    } else {
      return `${Math.trunc(time)}:30`;
    }
  }

  for (i = 0; i < l; i++) {
    var nextSlot = findNextNonEmptySlot();
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");

    if (nextSlot) {
      var time = nextSlot;
      a.innerHTML = stringifyTime(parseFloat(time));
      selElmnt.selectedIndex = parseInt(time); // Selecionar o valor correspondente
    } else {
      a.innerHTML = "N/A"; // Ou alguma outra mensagem quando todos os slots foram selecionados
    }

    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute("data-index", j);
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;

        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
