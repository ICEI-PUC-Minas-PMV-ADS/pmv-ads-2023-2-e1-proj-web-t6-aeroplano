onLoad();

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "UTC",
    locale: "pt-br",
    firstDay: 1,
    slotDuration: "00:15:00",
    slotLabelInterval: "01:00:00",
    height: 800,
    initialView: "timeGridWeek",
    customButtons: {
      filterBtn: {
        text: "Filtrar",
        click: () => {
          var customButtonsOption = calendar.getOption("customButtons");

          document.getElementById("overlayFilter").style.display = "block";
          document.getElementById("saveFilterButton").addEventListener("click", function () {
            const filterValue = document.getElementById("filter-value").value;
            const filterType = document.getElementById("filter-type").value;
            if (filterValue === "default") {
              calendar.setOption("customButtons", {
                ...customButtonsOption,
                filterBtn: {
                  ...customButtonsOption.filterBtn,
                  text: `Filtrar`,
                },
              });
            } else {
              calendar.setOption("customButtons", {
                ...customButtonsOption,
                filterBtn: {
                  ...customButtonsOption.filterBtn,
                  text: `Visualizando calendário de ${filterValue}`,
                },
              });
            }
            calendar.removeAllEvents();
            if (filterType === "instructor" || filterType === "student") {
              let usersArray = JSON.parse(localStorage.getItem("usersArray"));
              let user = usersArray.find((user) => user.name === filterValue);
              let availability = user.availability.details;
              let businessHours = [];
              const days = {
                sunday: 0,
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5,
                saturday: 6,
              };
              for (let day in availability) {
                availability[day].forEach((window) => {
                  businessHours.push({
                    daysOfWeek: [days[day]],
                    startTime: parseTime(window[0]),
                    endTime: parseTime(window[1]),
                  });
                });
              }
              calendar.setOption("businessHours", businessHours);
            }
            calendar.addEventSource((fetchInfo, successCallback, failureCallback) => {
              const events = JSON.parse(sessionStorage.getItem("flightsArray"));
              if (events) {
                successCallback(
                  events
                    .filter((event) => {
                      if (filterValue === "default") {
                        return true;
                      } else {
                        return event.student === filterValue || event.instructor === filterValue || event.aircraft === filterValue;
                      }
                    })
                    .map((event) => {
                      return {
                        id: event.id,
                        title: `Aula de voo de ${event.student} 
                                com ${event.instructor}
                                no ${event.aircraft}`,
                        start: event.start,
                        end: event.end,
                        constraint: "businessHours",
                        student: event.student,
                        instructor: event.instructor,
                        aircraft: event.aircraft,
                        description: event.description,
                      };
                    })
                );
              } else {
                successCallback([]);
              }
            });
            hideElement("overlayFilter");
            removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
          });
          document.getElementById("resetFilterButton").addEventListener("click", function () {
            document.getElementById("filter-type").value = "default";
            document.getElementById("filter-value").innerHTML = `<option value="default">-</option>`;
            calendar.setOption("customButtons", {
              ...customButtonsOption,
              filterBtn: {
                ...customButtonsOption.filterBtn,
                text: `Filtrar`,
              },
            });
            hideElement("overlayFilter");
            calendar.setOption("businessHours", [
              {
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: "0:00",
                endTime: "24:00",
              },
            ]);
            removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
            calendar.removeAllEvents();
            calendar.addEventSource((fetchInfo, successCallback, failureCallback) => {
              const events = JSON.parse(sessionStorage.getItem("flightsArray"));
              if (events) {
                successCallback(
                  events.map((event) => {
                    return {
                      id: event.id,
                      title: `Aula de voo de ${event.student} 
                              com ${event.instructor}
                              no ${event.aircraft}`,
                      start: event.start,
                      end: event.end,
                      constraint: "businessHours",
                      student: event.student,
                      instructor: event.instructor,
                      aircraft: event.aircraft,
                      description: event.description,
                    };
                  })
                );
              } else {
                successCallback([]);
              }
            });
          });

          document.getElementById("closeFilterButton").addEventListener("click", function () {
            hideElement("overlayFilter");
            removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
          });
        },
      },
      saveBtn: {
        text: "Salvar alterações",
        click: () => handleSaveBtnClick(),
      },
    },
    headerToolbar: {
      left: "prev,next today filterBtn",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    footerToolbar: {
      left: "saveBtn",
    },
    titleFormat: { year: "numeric", month: "short", day: "numeric" },
    businessHours: [
      {
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        startTime: "0:00",
        endTime: "24:00",
      },
    ],
    eventClick: (info) => editEvent(info.event),
    eventDrop: (info) => dragAndDrop(info.event),
    eventResize: (info) => dragAndDrop(info.event),
    selectable: true,
    editable: true,
    nowIndicator: true,
    now: () => {
      const dateTime = new Date();

      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      const time = dateTime.toTimeString().split(" ")[0].slice(0, 8);
      return `${year}-${month}-${day}T${time}`;
    },
    events: (fetchInfo, successCallback, failureCallback) => {
      const events = JSON.parse(sessionStorage.getItem("flightsArray"));
      if (events) {
        successCallback(
          events.map((event) => {
            return {
              id: event.id,
              title: `Aula de voo de ${event.student} 
              com ${event.instructor}
              no ${event.aircraft}`,
              start: event.start,
              end: event.end,
              constraint: "businessHours",
              student: event.student,
              instructor: event.instructor,
              aircraft: event.aircraft,
              description: event.description,
            };
          })
        );
      } else {
        successCallback([]);
      }
    },
    select: (info) => {
      const filterType = document.getElementById("filter-type").value;
      const filterValue = document.getElementById("filter-value").value;
      info = setDefaultEventProperties(info, calendar.getEvents().length);
      info = setFilterProperties(info, filterType, filterValue);
      info = adjustEventDuration(info);

      calendar.addEvent(info);

      const event = calendar.getEvents().find((event) => event.startStr === info.startStr);
      editEvent(event);
    },
  });
  calendar.render();
});

document.getElementById("filter-type").addEventListener("change", function () {
  const filterType = this.value;
  const filterValue = document.getElementById("filter-value");

  filterValue.innerHTML = "";

  var usersObject = JSON.parse(localStorage.getItem("usersArray"));
  var aircraftsObject = JSON.parse(localStorage.getItem("aircraftsArray"));

  switch (filterType) {
    case "student":
    case "instructor":
      populateFilterValueWithUsers(filterType, usersObject, filterValue);
      break;
    case "aircraft":
      populateFilterValueWithAircrafts(aircraftsObject, filterValue);
      break;
    default:
      addOptionToSelect(filterValue, "default", "-");
  }
});

function setDefaultEventProperties(info, eventsCount) {
  return {
    ...info,
    id: `${eventsCount}${Date.now()}`,
    constraint: "businessHours",
    student: "Não definido",
    instructor: "Não definido",
    aircraft: "Não definido",
    description: "",
  };
}

function parseTime(time) {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function setFilterProperties(info, filterType, filterValue) {
  if (filterType !== "default" && filterValue !== "default") {
    switch (filterType) {
      case "student":
        info.student = filterValue;
        break;
      case "instructor":
        info.instructor = filterValue;
        break;
      case "aircraft":
        info.aircraft = filterValue;
        break;
    }
  }
  return info;
}

function adjustEventDuration(info) {
  var start = info.start.getTime();
  var end = info.end.getTime();
  var duration = end - start;

  if (Math.round(duration / 60000) === 15) {
    info.end = new Date(info.start);
    info.end.setHours(info.end.getHours() + 1);
  }
  return info;
}

function populateFilterValueWithUsers(role, usersObject, selectorElement) {
  const users = usersObject.filter((user) => {
    return Object.values(user.school).some((school) => school.role === role);
  });
  const usersArray = users.map((user) => user.name);

  usersArray.forEach((user) => {
    addOptionToSelect(selectorElement, user, user);
  });
}

function populateFilterValueWithAircrafts(aircraftsObject, selectorElement) {
  aircraftsObject.forEach((aircraft) => {
    const text = aircraft.registration + " - " + aircraft.type;
    addOptionToSelect(selectorElement, aircraft.registration, text);
  });
}

function addOptionToSelect(selectElement, value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  selectElement.add(option);
}

function editEvent(event) {
  setEventTime(event);
  displayElement("overlayFlightEdit");

  loadDropdowns();
  setFields(event);

  document.getElementById("saveFlightButton").addEventListener("click", () => updateEvent(event));
  document.getElementById("closeFlightButton").addEventListener("click", () => {
    hideElement("overlayFlightEdit");
    removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
  });
  document.getElementById("deleteFlightButton").addEventListener("click", () => deleteEvent(event));
}

function loadDropdowns() {
  const usersObject = JSON.parse(localStorage.getItem("usersArray"));
  const aircraftsObject = JSON.parse(localStorage.getItem("aircraftsArray"));

  const dropdowns = ["edit-student", "edit-instructor", "edit-aircraft"];

  dropdowns.forEach((dropdown) => clearDropdown(dropdown));

  populateFilterValueWithUsers("student", usersObject, document.getElementById("edit-student"));
  populateFilterValueWithUsers("instructor", usersObject, document.getElementById("edit-instructor"));
  populateFilterValueWithAircrafts(aircraftsObject, document.getElementById("edit-aircraft"));
}

function setFields(event) {
  document.getElementById("edit-student").value = event._def.extendedProps.student;
  document.getElementById("edit-instructor").value = event._def.extendedProps.instructor;
  document.getElementById("edit-aircraft").value = event._def.extendedProps.aircraft;
  document.getElementById("edit-description").value = event._def.extendedProps.description;
}

function clearDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = `<option value="default"></option>`;
}

function setEventTime(event) {
  document.getElementById("start").value = getTime(event.startStr);
  document.getElementById("end").value = getTime(event.endStr);
}

function getTime(dateTimeStr) {
  return dateTimeStr.split("T")[1].slice(0, 5);
}

function displayElement(elementId) {
  document.getElementById(elementId).style.display = "block";
}

function hideElement(elementId) {
  document.getElementById(elementId).style.display = "none";
}

function removeListener(elementsId) {
  elementsId.forEach((elementId) => {
    const element = document.getElementById(elementId);
    element.replaceWith(element.cloneNode(true));
  });
}

function onLoad() {
  let flightsArray = localStorage.getItem("flightsArray");
  if (flightsArray) {
    sessionStorage.setItem("flightsArray", flightsArray);
  }
}

function createFlight(event) {
  return {
    id: event.id,
    start: event.start,
    end: event.end,
    student: event.student,
    instructor: event.instructor,
    aircraft: event.aircraft,
    description: event.description,
  };
}

function addFlightToSchedule(schedule, flight) {
  schedule.flights.push(flight);
}

function handleSaveBtnClick() {
  const events = JSON.parse(sessionStorage.getItem("flightsArray"));
  let users = JSON.parse(localStorage.getItem("usersArray"));
  let aircrafts = JSON.parse(localStorage.getItem("aircraftsArray"));

  if (events && users && aircrafts) {
    users.forEach((user) => {
      user.flightSchedule = { flights: [] };
    });
    aircrafts.forEach((aircraft) => {
      aircraft.flightSchedule = { flights: [] };
    });
    events.forEach((event) => {
      const flight = createFlight(event);
      users.forEach((user) => {
        if (user.name === event.student || user.name === event.instructor) {
          addFlightToSchedule(user.flightSchedule, flight);
        }
      });
      aircrafts.forEach((aircraft) => {
        if (aircraft.registration === event.aircraft) {
          addFlightToSchedule(aircraft.flightSchedule, flight);
        }
      });
    });

    localStorage.setItem("usersArray", JSON.stringify(users));
    localStorage.setItem("aircraftsArray", JSON.stringify(aircrafts));
    let currentUser = JSON.parse(localStorage.getItem("user"));
    let user = users.find((user) => user.id === currentUser.id);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("flightsArray", JSON.stringify(events));
  }
}

function updateEvent(event) {
  if (updateEventfieldValidation()) {
    const updatedStart = event.start.toISOString();
    const updatedEnd = event.end.toISOString();
    event.setDates(updatedStart, updatedEnd);
    event.setExtendedProp("student", document.getElementById("edit-student").value);
    event.setExtendedProp("instructor", document.getElementById("edit-instructor").value);
    event.setExtendedProp("aircraft", document.getElementById("edit-aircraft").value);
    event.setExtendedProp("description", document.getElementById("edit-description").value);
    const description = event._def.extendedProps.description ? "- Informações adicionais: " + event._def.extendedProps.description : "";
    event.setProp(
      "title",
      `Aula de voo de ${event._def.extendedProps.student} 
    com ${event._def.extendedProps.instructor}
    no ${event._def.extendedProps.aircraft} ${description}`
    );
    updateSessionStorage(event);
    hideElement("overlayFlightEdit");
    removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
  }
}

function dragAndDrop(event) {
  const updatedStart = event.start.toISOString();
  const updatedEnd = event.end.toISOString();
  event.setDates(updatedStart, updatedEnd);
  updateSessionStorage(event);
}

function updateSessionStorage(event) {
  let flights = JSON.parse(sessionStorage.getItem("flightsArray"));

  // If flightsArray does not exist, initialize it as an empty array
  if (!flights) {
    flights = [];
  }

  const index = flights.findIndex((flight) => flight.id === event.id);

  // If index is not found, add the event to the flights array
  if (index === -1) {
    flights.push({
      id: event.id,
      start: event.startStr,
      end: event.endStr,
      student: event._def.extendedProps.student,
      instructor: event._def.extendedProps.instructor,
      aircraft: event._def.extendedProps.aircraft,
      description: event._def.extendedProps.description,
    });
  } else {
    // If index is found, update the corresponding flight
    flights[index] = {
      id: event.id,
      start: event.startStr,
      end: event.endStr,
      student: event._def.extendedProps.student,
      instructor: event._def.extendedProps.instructor,
      aircraft: event._def.extendedProps.aircraft,
      description: event._def.extendedProps.description,
    };
  }

  // Update the flightsArray in sessionStorage
  sessionStorage.setItem("flightsArray", JSON.stringify(flights));
}

function updateEventfieldValidation() {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const student = document.getElementById("edit-student").value;
  const instructor = document.getElementById("edit-instructor").value;
  const aircraft = document.getElementById("edit-aircraft").value;
  var validation = {};
  if (student === "default" || student === "") {
    displayElement("warning-student");
    validation.student = false;
  } else {
    hideElement("warning-student");
  }
  if (instructor === "default" || instructor === "") {
    displayElement("warning-instructor");
    validation.instructor = false;
  } else {
    hideElement("warning-instructor");
  }
  if (aircraft === "default" || aircraft === "") {
    displayElement("warning-aircraft");
    validation.aircraft = false;
  } else {
    hideElement("warning-aircraft");
  }
  if (start === "" || end === "") {
    displayElement("warning-time");
    validation.time = false;
  } else hideElement("warning-time");
  if (Object.keys(validation).length > 0) {
    return false;
  } else {
    return true;
  }
}

function deleteEvent(event) {
  if (searchFlight(event.id)) {
    removeFlight(event.id);
  }
  event.remove();
  hideElement("overlayFlightEdit");
  removeListener(["saveFlightButton", "closeFlightButton", "deleteFlightButton"]);
}

function searchFlight(flightId) {
  const flights = JSON.parse(sessionStorage.getItem("flightsArray"));
  const flight = flights.find((flight) => flight.id === flightId);
  return flight;
}

function removeFlight(flightId) {
  const flights = JSON.parse(sessionStorage.getItem("flightsArray"));
  const index = flights.findIndex((flight) => flight.id === flightId);
  flights.splice(index, 1);
  sessionStorage.setItem("flightsArray", JSON.stringify(flights));
}

function parseDateTime(date, time) {
  const dateTime = new Date(date);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const day = dateTime.getDate() + 1;
  return `${year}-${month}-${day}T${time}:00Z`;
}
