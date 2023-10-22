onLoad();

var saveButton = document.getElementById("save-availability");
saveButton.addEventListener("click", () => {});

async function checkStorage() {
  const lsUser = localStorage["user"];
  const ssUser = sessionStorage["user"];
  var parsedUser = {};
  if (ssUser) {
    parsedUser = JSON.parse(ssUser);
    if (parsedUser.availability) {
      return parsedUser.availability;
    }
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

async function onLoad() {
  var actionButtonsCounter = 0,
    timeEntryCounter = 0;
  const storedAvailability = await checkStorage();
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
  updateActionButtonEventListener();
}

function populate(divClass, templateIdArray, divPosition, relationship = null, relationIndex = 0) {
  // If divPosition == null > template will be appended to all elements with specified class
  const nodeList = document.querySelectorAll(divClass);
  if (divPosition || divPosition === 0) {
    templateIdArray.forEach((templateId) => {
      const template = document.querySelector(templateId);
      const content = document.importNode(template.content, true);

      if (relationship === "first") {
        nodeList[divPosition].insertBefore(content, nodeList[divPosition].firstChild);
      } else if (relationship === "sibling" && relationIndex >= 0 && relationIndex < nodeList[divPosition].children.length) {
        nodeList[divPosition].children[relationIndex].parentNode.insertBefore(content, nodeList[divPosition].children[relationIndex + 1]);
      } else {
        nodeList[divPosition].appendChild(content);
      }
    });
  } else {
    nodeList.forEach((element) => {
      templateIdArray.forEach((templateId) => {
        const template = document.querySelector(templateId);
        const content = document.importNode(template.content, true);

        if (relationship === "first") {
          element.insertBefore(content, element.firstChild);
        } else {
          element.appendChild(content);
        }
      });
    });
  }
}

function updateEntryMapping() {
  var timeEntryMapping = {},
    timeEntryWrappingMapping = {},
    counter = 0,
    timeEntryCounterMapping = {},
    timeEntryCounter = 0,
    timeEntryWrapper = document.querySelectorAll(".time-entry-wrapper");
  timeEntryWrapper.forEach((element, wrapperId) => {
    var timeEntryElements = element.querySelectorAll(".time-entry");
    timeEntryElements.forEach((tElement, entryId) => {
      var arrowBoxElements = tElement.querySelectorAll(".arrow-box");
      timeEntryCounterMapping[counter] = arrowBoxElements.length > 0 ? ++timeEntryCounter : timeEntryCounter;
      timeEntryWrappingMapping[counter] = wrapperId;
      timeEntryMapping[counter++] = entryId;
    });
  });
  return [timeEntryWrappingMapping, timeEntryMapping, timeEntryCounterMapping];
}

function updateActionButtonEventListener() {
  addEventListener();

  function removePreviousEventListeners() {
    var addButtons = document.querySelectorAll(".add-time-button");
    addButtons.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
    var removeButtons = document.querySelectorAll(".remove-time-button");
    removeButtons.forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
  }

  function addEventListener() {
    var addButtons = document.querySelectorAll(".add-time-button");
    addButtons.forEach((element, id) => {
      element.addEventListener("click", addButtonClick(id), true);
    });
    var removeButtons = document.querySelectorAll(".remove-time-button");
    removeButtons.forEach((element, id) => {
      element.addEventListener("click", removeButtonClick(id), true);
    });
  }

  function updateListeners() {
    removePreviousEventListeners();
    addEventListener();
  }

  function addButtonClick(id) {
    return function () {
      var [timeEntryWrappingMapping, timeEntryMapping, timeEntryCounterMapping] = updateEntryMapping();

      var selectedElement = document.querySelectorAll(".time-entry")[id];
      populate(".time-entry-wrapper", ["#day-entry"], timeEntryWrappingMapping[id], "sibling", timeEntryMapping[id]);
      populate(".action-buttons", ["#add-time-icon", "#remove-time-icon"], id + 1);
      populate(".arrow-box", ["#right-arrow"], timeEntryCounterMapping[id]);
      newElement = document.querySelectorAll(".time-entry")[id + 1];
      createTimeSelectorHtmlElements(newElement);
      populateSpecificTimeSelector(newElement, [21, 25]); // 10:00 e 12:00
      if (selectedElement.querySelectorAll(".time-range-box").length == 0) selectedElement.remove();
      updateListeners();

      addAvailabilityWindow(id);
    };
  }

  function removeButtonClick(id) {
    return function () {
      var parentWrapper = document.querySelectorAll(".time-range-box")[id].parentElement.parentElement;

      if (parentWrapper.children.length == 1) {
        var template = document.querySelector("#day-entry-placeholder");
        var content = document.importNode(template.content, true);
        parentWrapper.appendChild(content);
        template = document.querySelector("#add-time-icon");
        content = document.importNode(template.content, true);
        parentWrapper.children[1].children[1].appendChild(content);
      }

      function findIndex(parentWrapper) {
        var actionButtonsElements = document.querySelectorAll(".action-buttons");
        for (var id = 0; id < actionButtonsElements.length; id++) {
          if (actionButtonsElements[id] === parentWrapper.children[1].children[1]) {
            return id;
          }
        }
      }

      removeAvailabilityWindow(findIndex(parentWrapper));

      document.querySelectorAll(".time-range-box")[id].parentElement.remove();
      updateListeners();
    };
  }
}

function removeAvailabilityWindow(id) {
  var [timeEntryWrappingMapping, timeEntryMapping] = updateEntryMapping();
  var dayName = document.querySelectorAll(".day-entry")[timeEntryWrappingMapping[id]].id;
  const user = JSON.parse(sessionStorage.getItem("user"));
  user.availability.counter--;
  user.availability.details[dayName].splice(timeEntryMapping[id - 1], 1);
  sessionStorage.setItem("user", JSON.stringify(user));
}

function addAvailabilityWindow(id) {
  var [timeEntryWrappingMapping, timeEntryMapping] = updateEntryMapping();
  var dayName = document.querySelectorAll(".day-entry")[timeEntryWrappingMapping[id]].id;
  const user = JSON.parse(sessionStorage.getItem("user"));
  user.availability.counter++;
  user.availability.details[dayName].splice(timeEntryMapping[id + 1], 0, ["10", "12"]);
  sessionStorage.setItem("user", JSON.stringify(user));
}

function createTimeSelectorHtmlElements(parentElement) {
  var timeSelectorTemplate = document.querySelector("#times-to-select");
  if (parentElement) {
    var timeSelectors = parentElement.querySelectorAll(".time-selector");
  } else {
    var timeSelectors = document.querySelectorAll(".time-selector");
  }

  timeSelectors.forEach((element, index) => {
    const content = document.importNode(timeSelectorTemplate.content, true);
    element.appendChild(content);
    const selectElement = element.querySelector("select");
    element.addEventListener("click", () => {
      const selectedValue = selectElement.value; // Obtenha o valor da opção selecionada

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
      user.availability.details[daysString[dayIndex]][Math.trunc(index / 2)][index % 2] = selectedValue;
      sessionStorage.setItem("user", JSON.stringify(user));
      break;
    } else {
      index -= availabilityWindows * 2;
    }
  }
}

function populateSpecificTimeSelector(element, selectionArray) {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = element.getElementsByClassName("time-selector");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selectionArray[i]].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
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
      a.innerHTML = "--:--";
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
              availability[day][slotIndex].shift(); // Marcar como selecionado
            } else {
              availability[day][slotIndex] = null; // Marcar como selecionado
            }
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
      selElmnt.selectedIndex = parseInt(time);
    } else {
      a.innerHTML = "--:--";
    }

    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute("data-index", j);
      c.addEventListener("click", function (e) {
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
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {
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

document.addEventListener("click", closeAllSelect);
