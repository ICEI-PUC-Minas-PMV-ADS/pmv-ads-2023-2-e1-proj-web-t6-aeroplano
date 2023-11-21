onLoad();

async function onLoad() {
  const user = JSON.parse(localStorage["user"]);
  const userFlights = user?.flightSchedule?.flights;
  if (userFlights?.length > 0) {
    const flightTable = document.createElement("table");
    flightTable.id = "tableFlights";
    document.getElementById("schedule-box").appendChild(flightTable);

    const flightTableHeader = document.createElement("tr");
    flightTableHeader.innerHTML = `
        <th><button onclick="sortTable(0)">Data</button></th>
        <th><button onclick="sortTable(1)">Hora</button></th>
        <th><button onclick="sortTable(2)">Aeronave</button></th>
        <th><button onclick="sortTable(3)">Aluno</button></th>
        <th><button onclick="sortTable(4)">Instrutor</button></th>
      `;
    document.getElementById("tableFlights").appendChild(flightTableHeader);

    userFlights.forEach((flight) => {
      const startDateTime = new Date(flight.start);
      const endDateTime = new Date(flight.end);

      const startDate = startDateTime.toISOString().split("T")[0];
      const startTime = startDateTime.toISOString().split("T")[1].slice(0, 5);
      const endTime = endDateTime.toISOString().split("T")[1].slice(0, 5);

      const flightRow = document.createElement("tr");
      flightRow.innerHTML = `
          <td>${startDate}</td>
          <td>${startTime} - ${endTime}</td>
          <td>${flight.aircraft}</td>
          <td>${flight.student}</td>
          <td>${flight.instructor}</td>
        `;
      document.getElementById("tableFlights").appendChild(flightRow);
    });
  } else {
    console.log("Nenhum voo encontrado");
    const noFlights = document.createElement("div");
    noFlights.innerHTML = `
        <h3>Nenhum voo encontrado</h3>
        <p>Cadastre sua disponibilidade hoje mesmo!</p>
        <p>Você será notificado quando novos voos forem adicionados à sua escala</p>
        `;
    document.getElementById("schedule-box").appendChild(noFlights);
  }
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("tableFlights");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
