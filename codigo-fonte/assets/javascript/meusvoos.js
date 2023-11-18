onLoad();

async function onLoad() {
  const user = JSON.parse(localStorage["user"]);
  const userFlights = user?.flightSchedule?.flights;
  if (userFlights?.length > 0) {
    flightTable = document.createElement("table");
    flightTable.id = "tableFlights";
    document.getElementById("schedule-box").appendChild(flightTable);

    flightTableHeader = document.createElement("tr");
    flightTableHeader.innerHTML = `
        <th>Data</th>
        <th>Hora</th>
        <th>Aeronave</th>
        <th>Partida</th>
        <th>Chegada</th>
        <th>Instrutor</th>
        <th>Status</th>
      `;
    document.getElementById("tableFlights").appendChild(flightTableHeader);

    userFlights.forEach((flight) => {
      const dateTime = new Date(flight.date);

      const date = dateTime.toLocaleDateString("en-GB");
      const time = dateTime.toTimeString().split(" ")[0].slice(0, 5);
      const timezone = dateTime.toTimeString().split(" ")[1].slice(0, 6);

      var statusLabels = {
        scheduled: "Agendado",
        confirmed: "Confirmado",
        canceled: "Cancelado",
        done: "Realizado",
        missed: "Perdido",
        rescheduled: "Reagendado",
      };

      const flightRow = document.createElement("tr");
      flightRow.innerHTML = `
          <td>${date}</td>
          <td>${time} ${timezone}</td>
          <td>${flight.aircraft}</td>
          <td>${flight.departure}</td>
          <td>${flight.arrival}</td>
          <td>${flight.instructor}</td>
          <td>${statusLabels[flight.status]}</td>
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
