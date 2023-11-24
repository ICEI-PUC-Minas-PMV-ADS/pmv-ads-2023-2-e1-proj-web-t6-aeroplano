onLoad();

async function onLoad() {
  const storedAvailability = await checkStoredAvailability();

  if (storedAvailability) {
    populateStoredAvailability(storedAvailability);
  } else {
    appendChildElement(".time-entry-wrapper", ["#day-entry-placeholder"]);
    appendChildElement(".action-buttons", ["#add-time-icon"]);
  }

  createTimeSelectorHtmlElements();
  populateTimeSelectorsOptions(storedAvailability?.details);
  updateActionButtonEventListener();
  loadTimezone();
  populateWeeklyAvailability();

  var saveButton = document.getElementById("save-availability");
  saveButton.replaceWith(saveButton.cloneNode(true));
  saveButton = document.getElementById("save-availability");
  saveButton.addEventListener("click", saveAvailability);
}

function saveAvailability() {
  console.log("Saving availability");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const usersArray = JSON.parse(localStorage.getItem("usersArray"));
  const userIndex = usersArray.findIndex((element) => element.email === user.email);
  usersArray[userIndex].availability = user.availability;
  localStorage.setItem("usersArray", JSON.stringify(usersArray));
  localStorage.setItem("user", JSON.stringify(user));
}

function populateWeeklyAvailability() {
  const decrementBtn = document.getElementById("decrementBtn");
  const incrementBtn = document.getElementById("incrementBtn");
  const integerInput = document.getElementById("integerInput");
  // Prevent manual input of negative values
  integerInput.addEventListener("input", () => {
    if (parseInt(integerInput.value) < 0) {
      integerInput.value = 0;
    }
    const parsedValue = parseInt(integerInput.value);
    if (isNaN(parsedValue)) {
      // Input is not a valid integer, reset to the nearest integer
      integerInput.value = 0;
    } else {
      // Input is a valid integer
      integerInput.value = parsedValue;
    }
  });
  decrementBtn.addEventListener("click", () => {
    // Decrease the value in the input field
    parseInt(integerInput.value) > 0 ? (integerInput.value = parseInt(integerInput.value) - 1) : (integerInput.value = 0);
  });

  incrementBtn.addEventListener("click", () => {
    // Increase the value in the input field
    parseInt(integerInput.value) > 0 ? (integerInput.value = parseInt(integerInput.value) + 1) : (integerInput.value = 1);
  });
}

function loadTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneOffset = new Date().getTimezoneOffset() / -60;
  document.getElementById("timezone-name").innerText = timezone;
  document.getElementById("timezone-offset").innerText = timezoneOffset;
}

function populateStoredAvailability(storedAvailability) {
  let actionButtonsCounter = 0;
  let timeEntryCounter = 0;

  Object.entries(storedAvailability.details).forEach(([day, dayAvailability], dayIndex) => {
    const availabilityKeys = Object.keys(dayAvailability);

    if (availabilityKeys.length === 0) {
      appendChildElement(".time-entry-wrapper", ["#day-entry-placeholder"], dayIndex);
      appendChildElement(".action-buttons", ["#add-time-icon"], actionButtonsCounter++);
    } else {
      availabilityKeys.forEach(() => {
        appendChildElement(".time-entry-wrapper", ["#day-entry"], dayIndex);
        appendChildElement(".arrow-box", ["#right-arrow"], timeEntryCounter++);
        appendChildElement(".action-buttons", ["#add-time-icon", "#remove-time-icon"], actionButtonsCounter++);
      });
    }
  });
}

async function checkStoredAvailability() {
  const ssUser = sessionStorage.getItem("user");
  const lsUser = localStorage.getItem("user");

  let parsedUser = {};

  if (ssUser) {
    parsedUser = JSON.parse(ssUser);
    if (parsedUser.availability?.counter > 0) {
      return parsedUser.availability;
    }
  }

  if (lsUser) {
    parsedUser = JSON.parse(lsUser);
    if (parsedUser.availability?.counter > 0) {
      sessionStorage.setItem("user", lsUser);
      return parsedUser.availability;
    } else {
      parsedUser.availability = {
        counter: 0,
        details: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      };
      sessionStorage.setItem("user", JSON.stringify(parsedUser));
    }
  }

  return false;
}

function appendChildElement(divClass, templateIdArray, divPosition = null, siblingPosition = "last") {
  const nodeList = document.querySelectorAll(divClass);

  nodeList.forEach((selectedNode, index) => {
    if (divPosition !== null && divPosition !== index) {
      return;
    }

    templateIdArray.forEach((templateId) => {
      const template = document.querySelector(templateId);
      const content = document.importNode(template.content, true);

      if (selectedNode.children.length > 0 && siblingPosition === "first") {
        const firstChild = selectedNode.children[0];
        selectedNode.insertBefore(content, firstChild);
      } else {
        selectedNode.appendChild(content);
      }
    });
  });
}

function appendSiblingElement(divClass, templateIdArray, divPosition = null, siblingPosition = "after") {
  const nodeList = document.querySelectorAll(divClass);

  nodeList.forEach((selectedNode, index) => {
    if (divPosition !== null && divPosition !== index) {
      return;
    }

    const parentNode = selectedNode.parentNode;
    const parentNodeLength = parentNode.children.length;
    const lastSibling = parentNode.children[parentNodeLength - 1];

    templateIdArray.forEach((templateId) => {
      const template = document.querySelector(templateId);
      const content = document.importNode(template.content, true);

      if (siblingPosition === "before") {
        selectedNode.parentNode.insertBefore(content, selectedNode);
      } else if (selectedNode === lastSibling) {
        parentNode.appendChild(content);
      } else {
        selectedNode.parentNode.insertBefore(content, nodeList[divPosition + 1]);
      }
    });
  });
}

function updateEntryMapping() {
  let timeEntryMapping = {};
  let timeEntryWrappingMapping = {};
  let timeEntryCounterMapping = {};
  let counter = 0;
  let timeEntryCounter = 0;

  document.querySelectorAll(".time-entry-wrapper").forEach((element, wrapperId) => {
    element.querySelectorAll(".time-entry").forEach((tElement, entryId) => {
      const arrowBoxElements = tElement.querySelectorAll(".arrow-box");
      timeEntryCounterMapping[counter] = arrowBoxElements.length > 0 ? ++timeEntryCounter : timeEntryCounter;
      timeEntryWrappingMapping[counter] = wrapperId;
      timeEntryMapping[counter++] = entryId;
    });
  });

  return [timeEntryWrappingMapping, timeEntryMapping, timeEntryCounterMapping];
}

function updateActionButtonEventListener() {
  addEventListener();

  function updateActionButtonListeners() {
    removePreviousEventListeners();
    addEventListener();
  }

  function addEventListener() {
    const buttonClasses = [".add-time-button", ".remove-time-button"];
    const buttonMethods = [addButtonClick, removeButtonClick];

    buttonClasses.forEach((buttonClass, ClassId) => {
      const buttons = document.querySelectorAll(buttonClass);
      buttons.forEach((element, id) => {
        element.addEventListener("click", () => buttonMethods[ClassId](id), true);
      });
    });
  }

  function removePreviousEventListeners() {
    const buttonClasses = [".add-time-button", ".remove-time-button"];
    buttonClasses.forEach((buttonClass) => {
      const buttons = document.querySelectorAll(buttonClass);
      buttons.forEach((element) => {
        element.replaceWith(element.cloneNode(true));
      });
    });
  }

  function addButtonClick(id) {
    const [, , timeEntryCounterMapping] = updateEntryMapping();

    const currentElement = document.querySelectorAll(".time-entry")[id];

    appendSiblingElement(".time-entry", ["#day-entry"], id);
    appendChildElement(".action-buttons", ["#add-time-icon", "#remove-time-icon"], id + 1);
    appendChildElement(".arrow-box", ["#right-arrow"], timeEntryCounterMapping[id]);

    const newElement = document.querySelectorAll(".time-entry")[id + 1];

    createTimeSelectorHtmlElements(newElement);
    populateSpecificTimeSelector(newElement, [21, 25]); // 10:00 e 12:00 - Nota: Tornar isso dinamico

    // Clear "no availability" placeholder
    if (currentElement.querySelectorAll(".time-range-box").length == 0) currentElement.remove();

    updateActionButtonListeners();
    addAvailabilityWindow(id);
  }

  function removeButtonClick(id) {
    const parentWrapper = document.querySelectorAll(".time-range-box")[id].parentElement.parentElement;

    if (parentWrapper.children.length == 1) {
      // Add "No availability" placeholder

      const dayEntryTemplate = document.querySelector("#day-entry-placeholder");
      const dayEntryContent = document.importNode(dayEntryTemplate.content, true);
      parentWrapper.appendChild(dayEntryContent);

      const addTimeButtonTemplate = document.querySelector("#add-time-icon");
      const addTimeButtonContent = document.importNode(addTimeButtonTemplate.content, true);
      parentWrapper.children[1].children[1].appendChild(addTimeButtonContent);
    }

    function findIndex(parentWrapper) {
      const actionButtonsElements = document.querySelectorAll(".action-buttons");
      return Array.from(actionButtonsElements).findIndex((element) => element === parentWrapper.children[1].children[1]);
    }

    removeAvailabilityWindow(findIndex(parentWrapper));

    document.querySelectorAll(".time-range-box")[id].parentElement.remove();
    updateActionButtonListeners();
  }
}

function addAvailabilityWindow(id) {
  const [timeEntryWrappingMapping, timeEntryMapping] = updateEntryMapping();
  const dayName = document.querySelectorAll(".day-entry")[timeEntryWrappingMapping[id]].id;

  const user = JSON.parse(sessionStorage.getItem("user"));
  user.availability.counter++;
  const dayAvailability = user.availability.details[dayName];
  dayAvailability.splice(timeEntryMapping[id + 1], 0, ["10", "12"]);
  sessionStorage.setItem("user", JSON.stringify(user));
}

function removeAvailabilityWindow(id) {
  const [timeEntryWrappingMapping, timeEntryMapping] = updateEntryMapping();
  const dayName = document.querySelectorAll(".day-entry")[timeEntryWrappingMapping[id]].id;

  const user = JSON.parse(sessionStorage.getItem("user"));
  user.availability.counter--;
  const dayAvailability = user.availability.details[dayName];
  dayAvailability.splice(timeEntryMapping[id - 1], 1);
  sessionStorage.setItem("user", JSON.stringify(user));
}

function createTimeSelectorHtmlElements(parentElement = null) {
  const timeSelectorTemplate = document.querySelector("#times-to-select");
  const timeSelectors = parentElement ? parentElement.querySelectorAll(".time-selector") : document.querySelectorAll(".time-selector");

  timeSelectors.forEach((element) => {
    const content = document.importNode(timeSelectorTemplate.content, true);
    element.appendChild(content);
  });

  updateListeners();

  function updateListeners() {
    removePreviousEventListeners();
    addEventListener();
  }

  function addEventListener() {
    const selectorClasses = [".time-selector"];

    selectorClasses.forEach((selectorClass) => {
      const selectors = document.querySelectorAll(selectorClass);
      selectors.forEach((element, index) => {
        const selectElement = element.querySelector("select");
        element.addEventListener("click", () => {
          const selectedValue = selectElement.value;
          selectionParse(index, selectedValue);
        });
      });
    });
  }

  function removePreviousEventListeners() {
    const selectorClasses = [".time-selector"];
    selectorClasses.forEach((selectorClass) => {
      const selectors = document.querySelectorAll(selectorClass);
      selectors.forEach((element) => {
        element.replaceWith(element.cloneNode(true));
      });
    });
  }
}

function selectionParse(index, selectedValue) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const availability = user.availability.details;
  const daysString = Object.keys(availability);

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    let availabilityWindows = Object.keys(availability[daysString[dayIndex]]).length;
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
  const timeSelectors = element.querySelectorAll(".time-selector");

  timeSelectors.forEach((timeSelector, index) => {
    const selectElement = timeSelector.querySelector("select");
    const selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");
    selectedDiv.innerHTML = selectElement.options[selectionArray[index]].innerHTML;
    timeSelector.appendChild(selectedDiv);

    const selectItems = document.createElement("DIV");
    selectItems.setAttribute("class", "select-items select-hide");

    for (let j = 1; j < selectElement.length; j++) {
      const option = selectElement.options[j];
      const optionDiv = document.createElement("DIV");
      optionDiv.innerHTML = option.innerHTML;
      optionDiv.addEventListener("click", () => {
        selectElement.selectedIndex = j;
        selectedDiv.innerHTML = option.innerHTML;
        const sameAsSelected = optionDiv.parentNode.querySelectorAll(".same-as-selected");
        sameAsSelected.forEach((element) => {
          element.removeAttribute("class");
        });
        optionDiv.setAttribute("class", "same-as-selected");
        selectedDiv.click();
        updateAllEventSelectors();
      });
      selectItems.appendChild(optionDiv);
    }

    timeSelector.appendChild(selectItems);

    selectedDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      closeAllSelect(selectedDiv);
      selectItems.classList.toggle("select-hide");
      selectedDiv.classList.toggle("select-arrow-active");
    });
  });
}

function updateAllEventSelectors() {
  const eventSelectors = document.querySelectorAll(".event-selector");
  eventSelectors.forEach((eventSelector) => {
    const timeSelectors = eventSelector.querySelectorAll(".time-selector");
    const selectedTimes = [];
    timeSelectors.forEach((timeSelector) => {
      const selectElement = timeSelector.querySelector("select");
      selectedTimes.push(selectElement.selectedIndex);
    });
    populateSpecificTimeSelector(eventSelector, selectedTimes);
  });
}

function populateTimeSelectorsOptions(availability) {
  const timeSelectors = document.querySelectorAll(".time-selector");
  // Remove all elements added by a previous call

  function findNextNonEmptySlot() {
    for (let day in availability) {
      if (availability[day] && Object.keys(availability[day]).length > 0) {
        for (let slotIndex in availability[day]) {
          const slot = availability[day][slotIndex];
          if (Array.isArray(slot) && slot.length > 0) {
            availability[day][slotIndex] = slot.slice(1);
            return slot[0];
          }
        }
      }
    }
    return null;
  }

  function stringifyTime(time) {
    const hour = Math.trunc(time);
    const minute = (time - hour) * 60;
    return `${hour}:${minute < 10 ? "0" : ""}${minute}`;
  }

  timeSelectors.forEach((timeSelector) => {
    const selectElement = timeSelector.querySelector("select");
    const selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");

    const nextSlot = findNextNonEmptySlot();
    if (nextSlot) {
      selectedDiv.innerHTML = stringifyTime(nextSlot);
      selectElement.selectedIndex = Math.trunc(nextSlot);
    } else {
      selectedDiv.innerHTML = "--:--";
    }

    timeSelector.appendChild(selectedDiv);

    const selectItems = document.createElement("DIV");
    selectItems.setAttribute("class", "select-items select-hide");

    for (let i = 1; i < selectElement.length; i++) {
      const option = selectElement.options[i];
      const optionDiv = document.createElement("DIV");
      optionDiv.innerHTML = option.innerHTML;
      optionDiv.setAttribute("data-index", i);
      optionDiv.addEventListener("click", () => {
        selectElement.selectedIndex = optionDiv.getAttribute("data-index");
        selectedDiv.innerHTML = optionDiv.innerHTML;
        optionDiv.parentNode.querySelectorAll(".same-as-selected").forEach((element) => {
          element.removeAttribute("class");
        });
        optionDiv.setAttribute("class", "same-as-selected");
        selectedDiv.click();
      });
      selectItems.appendChild(optionDiv);
    }

    timeSelector.appendChild(selectItems);

    selectedDiv.addEventListener("click", (event) => {
      event.stopPropagation();
      closeAllSelect(selectedDiv);
      selectItems.classList.toggle("select-hide");
      selectedDiv.classList.toggle("select-arrow-active");
    });
  });
}

function closeAllSelect(elmnt) {
  let x,
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
