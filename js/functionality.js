let periodoCount = 0; // Contador global para períodos
let disciplinaCount = {}; // Contador de disciplinas por período

// Função para inicializar o primeiro período
function criaPeriodo() {
    periodoCount++;
    disciplinaCount[periodoCount] = 0;

    const container = document.getElementById("container");

    // Cria o elemento do novo período
    const periodoDiv = document.createElement("div");
    periodoDiv.id = `periodo${periodoCount}`;
    periodoDiv.innerHTML = `
    <div class="d-flex justify-content-between">
      <h3>${periodoCount}º Período</h3>
      <button
        class="btn btn-primary"
        onclick="adicionarDisciplina(${periodoCount})"
      >
        Adicionar Disciplina
      </button>
    </div>
    <div id="periodo${periodoCount}-disciplinas" class="row g-3"></div>
  `;

    container.appendChild(periodoDiv);
}

// Função para adicionar uma disciplina em um período
function adicionarDisciplina(periodoId) {
    disciplinaCount[periodoId]++;
    const disciplinaId = disciplinaCount[periodoId];
    const disciplinasDiv = document.getElementById(
        `periodo${periodoId}-disciplinas`
    );

    // Cria o elemento da nova disciplina
    const disciplinaDiv = document.createElement("div");
    disciplinaDiv.className = "row g-3";
    disciplinaDiv.innerHTML = `
    <div class="col-sm-4">
      <input
        type="text"
        id="periodo${periodoId}-disciplina${disciplinaId}-codigo"
        class="form-control"
        placeholder="Código da Disciplina"
      />
    </div>
    <div class="col-sm-4">
      <select
        id="periodo${periodoId}-disciplina${disciplinaId}-creditos"
        class="form-control"
      >
        <option value="" selected disabled>Selecione os Créditos</option>
        <option value="2">2 Créditos</option>
        <option value="3">3 Créditos</option>
        <option value="4">4 Créditos</option>
        <option value="6">6 Créditos</option>
        <option value="8">8 Créditos</option>
        <option value="10">10 Créditos</option>
        <option value="12">12 Créditos</option>
        <option value="16">16 Créditos</option>
        <option value="22">22 Créditos</option>
        <option value="40">40 Créditos</option>
        <option value="52">52 Créditos</option>
        <option value="64">64 Créditos</option>
      </select>
    </div>
    <div class="col-sm-2">
      <select
        id="periodo${periodoId}-disciplina${disciplinaId}-mencao"
        class="form-control"
        onchange="atualizarStatus(${periodoId}, ${disciplinaId})"
      >
        <option value="" selected disabled>Menção</option>
        <option value="SR">SR</option>
        <option value="II">II</option>
        <option value="MI">MI</option>
        <option value="MM">MM</option>
        <option value="MS">MS</option>
        <option value="SS">SS</option>
      </select>
    </div>
    <div class="col-sm-2" id="status-col-${periodoId}-${disciplinaId}">
      <span id="status-${periodoId}-${disciplinaId}">Status</span>
    </div>
  `;

    disciplinasDiv.appendChild(disciplinaDiv);
}

// Função para calcular o status e atualizar o resultado
function atualizarStatus(periodoId, disciplinaId) {
    const mencao = document.getElementById(
        `periodo${periodoId}-disciplina${disciplinaId}-mencao`
    ).value;

    const statusSpan = document.getElementById(`status-${periodoId}-${disciplinaId}`);
    if (!mencao) {
        statusSpan.textContent = "Incompleto";
        return;
    }

    const status = determinarStatus(mencao);
    statusSpan.textContent = status;
    atualizarIRA(); // Atualiza o IRA para refletir apenas disciplinas válidas
}

// Função para determinar se o aluno está "Aprovado" ou "Reprovado"
function determinarStatus(mencao) {
    const aprovadas = ["MM", "MS", "SS"];
    return aprovadas.includes(mencao) ? "Aprovado" : "Reprovado";
}

// Função para atualizar o IRA geral
function atualizarIRA() {
    let totalCreditos = 0;
    let creditosAprovados = 0;

    for (let p = 1; p <= periodoCount; p++) {
        for (let d = 1; d <= (disciplinaCount[p] || 0); d++) {
            const mencao = document.getElementById(
                `periodo${p}-disciplina${d}-mencao`
            )?.value;
            const creditos = parseInt(
                document.getElementById(`periodo${p}-disciplina${d}-creditos`)?.value || 0
            );

            if (mencao && creditos) {
                totalCreditos += creditos;
                if (determinarStatus(mencao) === "Aprovado") {
                    creditosAprovados += creditos;
                }
            }
        }
    }

    const mp = totalCreditos > 0 ? creditosAprovados : 0;
    const iraDisplay = document.getElementById("ira-mp");
    iraDisplay.textContent = `MP: ${mp} Créditos`;
}
