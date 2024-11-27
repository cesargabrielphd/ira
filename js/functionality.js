let periodoCount = 1; // Para contar os períodos
let disciplinaCounts = {}; // Para contar as disciplinas por período

// Função para criar um novo período
function criaPeriodo() {
  periodoCount++; // Incrementa o contador de períodos
  disciplinaCounts[periodoCount] = 0; // Inicializa o contador de disciplinas para o novo período

  const novoPeriodo = document.createElement("div");
  novoPeriodo.id = `periodo${periodoCount}`;
  novoPeriodo.innerHTML = `
        <div class="d-flex justify-content-between">
            <h3>${periodoCount}º Período</h3>
            <button class="btn btn-primary" onclick="adicionarDisciplina(${periodoCount})">Adicionar Disciplina</button>
        </div>
        <div id="periodo${periodoCount}-disciplinas"></div>
    `;
  document.getElementById("container").appendChild(novoPeriodo);
}

// Função chamada ao carregar a página para garantir que o primeiro período seja criado
window.onload = function () {
  if (!document.getElementById("periodo1")) {
    criaPeriodo(); // Cria o primeiro período se ainda não existir
  }
};

// Função para adicionar uma disciplina ao período
function adicionarDisciplina(periodo) {
  const periodoDiv = document.getElementById(`periodo${periodo}-disciplinas`);
  if (!periodoDiv) {
    console.error(
      `Elemento com id "periodo${periodo}-disciplinas" não encontrado.`
    );
    return; // Retorna para evitar erro
  }

  disciplinaCounts[periodo]++; // Incrementa o contador de disciplinas para o período específico

  const novaDisciplina = document.createElement("div");
  novaDisciplina.id = `periodo${periodo}-disciplina${disciplinaCounts[periodo]}`;
  novaDisciplina.classList.add("row", "g-3");
  novaDisciplina.innerHTML = `
        <div class="col-sm-2">
            <input type="text" id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-codigo" class="form-control" placeholder="Código da Disciplina" />
        </div>
                  <div class="col-sm-2">
            <select
              id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-resultado"
              class="form-control"
              aria-placeholder="Resultado"
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
            <select id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-resultado" class="form-control" onchange="atualizarStatus(${periodo}, ${disciplinaCounts[periodo]})">
            <option value="Menção" selected>Menção</option>
                <option value="SR">SR</option>
                <option value="II">II</option>
                <option value="MI">MI</option>
                <option value="MM">MM</option>
                <option value="MS">MS</option>
                <option value="SS">SS</option>
            </select>
        </div>
        <div class="col-sm-2" id="status-col-${periodo}-${disciplinaCounts[periodo]}">
            <span id="status-${periodo}-${disciplinaCounts[periodo]}">Status</span>
        </div>
    `;
  periodoDiv.appendChild(novaDisciplina);
}

// Função para calcular a menção com base na nota
function calcularNota(nota) {
  let resultado = "";
  if (nota >= 9 && nota <= 10) {
    resultado = "SS";
  } else if (nota >= 7 && nota < 9) {
    resultado = "MS";
  } else if (nota >= 5 && nota < 7) {
    resultado = "MM";
  } else if (nota >= 3 && nota < 5) {
    resultado = "MI";
  } else if (nota >= 0.1 && nota < 3) {
    resultado = "II";
  } else if (nota === 0) {
    resultado = "SR";
  }
  return resultado;
}

// Função para calcular o resultado baseado na nota
function calcularResultado(periodo, disciplina) {
  const notaInput = document.getElementById(
    `periodo${periodo}-disciplina${disciplina}-nota1`
  );
  const resultadoSelect = document.getElementById(
    `periodo${periodo}-disciplina${disciplina}-resultado`
  );
  const nota = parseFloat(notaInput.value);

  if (isNaN(nota) || nota < 0 || nota > 10) {
    resultadoSelect.value = ""; // Limpa o campo de menção
    return;
  }

  const resultado = calcularNota(nota); // Calcula a menção com base na nota
  resultadoSelect.value = resultado; // Atualiza o campo de menção
  atualizarStatus(periodo, disciplina, resultado); // Atualiza o status com a menção calculada
}

function atualizarStatus(periodo, disciplina, resultado) {
    // Busca os elementos HTML
    const statusCol = document.getElementById(`status-col-${periodo}-${disciplina}`);
    const statusSpan = document.getElementById(`status-${periodo}-${disciplina}`);

    // Verifica se os elementos foram encontrados (optional)
    if (statusCol && statusSpan) {
        // Define o status com base no resultado
        const status = resultado === "SS" || resultado === "MS" || resultado === "MM" ? "Aprovado" : "Reprovado";

        // Atualiza o texto do span e exibe a coluna
        statusSpan.textContent = status;
        statusCol.style.display = "block";
    } else {
        console.error(
            `Elementos não encontrados para o período ${periodo} e disciplina ${disciplina}`
        );
    }
}