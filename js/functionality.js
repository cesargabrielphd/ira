let periodoCount = 0; 
let disciplinaCount = {};

function criaPeriodo() {
  periodoCount++;
  disciplinaCount[periodoCount] = 0;

  const container = document.getElementById("container");

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

  adicionarDisciplina(periodoCount);
}

function adicionarDisciplina(periodoId) {
  disciplinaCount[periodoId]++;
  const disciplinaId = disciplinaCount[periodoId];
  const disciplinasDiv = document.getElementById(
    `periodo${periodoId}-disciplinas`
  );

  const disciplinaDiv = document.createElement("div");
  disciplinaDiv.className = "row g-3";
  disciplinaDiv.innerHTML = `
    <div class="col-sm-4">
      <input
        type="text"
        id="periodo${periodoId}-disciplina${disciplinaId}-codigo"
        class="form-control"
        placeholder="Código da Disciplina"
        pattern="[A-Z]{3}[0-9]{4}" 
  title="O código deve ter 3 letras maiúsculas seguidas de 4 dígitos (ex.: ABC1234)."
  oninput="this.setCustomValidity('')" 
  onchange="validarCodigo(this)"
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

  adicionarEventosParaMonitoramento(periodoId, disciplinaId);
}
function determinarStatus(mencao) {
  const aprovadas = ["MM", "MS", "SS"];
  return aprovadas.includes(mencao) ? "Aprovado" : "Reprovado";
}
function atualizarStatus(periodoId, disciplinaId) {
  const mencao = document.getElementById(
    `periodo${periodoId}-disciplina${disciplinaId}-mencao`
  ).value;

  const statusSpan = document.getElementById(
    `status-${periodoId}-${disciplinaId}`
  );
  if (!mencao) {
    statusSpan.textContent = "Incompleto";
    return;
  }

  const status = determinarStatus(mencao);
  statusSpan.textContent = status;
  atualizarIRA();
}
function calcularIRA() {
  const dados = coletaDados();
  let numeradorIra = 0;
  let denominadorIra = 0;
  const valoresMencao = {
    SR: 0, 
    II: 1, 
    MI: 2, 
    MM: 3, 
    MS: 4, 
    SS: 5, 
  };
  for (const periodo in dados) {
    const disciplinas = dados[periodo];
    const semestre = Math.max(6 - parseInt(periodo.split(" ")[1]) + 1, 1);
    for (const disciplina of disciplinas) {
      const {
        creditos,
        mencao
      } = disciplina;
      if (!valoresMencao[mencao] || creditos <= 0) continue;
      const valorMencao = valoresMencao[mencao];
      numeradorIra += valorMencao * creditos * semestre;
      denominadorIra += creditos * semestre;
    }
  }
  const ira = denominadorIra > 0 ? numeradorIra / denominadorIra : 0;
  const iraDisplay = document.getElementById("ira-mp");
  if (iraDisplay) {
    iraDisplay.textContent = `IRA: ${ira.toFixed(2)}`;
  }
  console.log(`IRA calculado: ${ira.toFixed(2)}`); // Exibe no console
  return ira;
}
function coletaDados() {
  const dados = {};
  for (let p = 1; p <= periodoCount; p++) {
    const periodoDiv = document.getElementById(`periodo${p}`);
    if (!periodoDiv) continue;
    dados[`Periodo ${p}`] = [];
    for (let d = 1; d <= (disciplinaCount[p] || 0); d++) {
      const codigo = document.getElementById(
        `periodo${p}-disciplina${d}-codigo`
      )?.value || "";
      const creditos = parseInt(
        document.getElementById(`periodo${p}-disciplina${d}-creditos`)?.value || 0
      );
      const mencao = document.getElementById(
        `periodo${p}-disciplina${d}-mencao`
      )?.value || "";
      const status = document.getElementById(
        `status-${p}-${d}`
      )?.textContent || "Incompleto";
      if (codigo && creditos > 0 && mencao) {
        dados[`Periodo ${p}`].push({
          codigo: codigo,
          mencao: mencao,
          creditos: creditos,
          status: status
        });
      }
    }
  }

  console.log(dados);
  return dados;
}
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
function adicionarEventosParaMonitoramento(periodo, disciplina) {
  const codigo = document.getElementById(`periodo${periodo}-disciplina${disciplina}-codigo`);
  const creditos = document.getElementById(`periodo${periodo}-disciplina${disciplina}-creditos`);
  const mencao = document.getElementById(`periodo${periodo}-disciplina${disciplina}-mencao`);

  codigo.addEventListener("input", () => {
    coletaDados();
    calcularIRA();
  });
  creditos.addEventListener("change", () => {
    coletaDados();
    calcularIRA();
  });
  mencao.addEventListener("change", () => {
    coletaDados();
    calcularIRA();
  });
}

