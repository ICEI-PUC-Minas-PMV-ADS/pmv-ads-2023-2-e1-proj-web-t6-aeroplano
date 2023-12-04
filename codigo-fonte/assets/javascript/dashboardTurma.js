console.log(document.getElementById("table"))

const gridContainer = document.getElementById("table");

// Limpe o contêiner
while (gridContainer.firstChild) {
  gridContainer.removeChild(gridContainer.firstChild);
}

// Agora você pode chamar render()
new gridjs.Grid({
  columns: ["Foto", "Nome", "Cargo", "Status", "Último Acesso", "Visto última vez", "Ação"],
  pagination: true,
  search: true,
  sorting: true,
  language: {
    'search': {
        'placeholder': 'Você está procurando por...'
    }    
  },
  className: {
    search: 'gridjs-search'
  },
  data: [
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    ["", "Fabiano Carlos Pereira", "Aluno", "On-line", "13/09/2023 10:52h", "14/09/2023 10:52h"],
    
  ]
