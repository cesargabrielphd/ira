let periodoCount = 1;  // Para contar os períodos
let disciplinaCounts = {};  // Para contar as disciplinas por período

// Função para criar um novo período
function criaPeriodo() {
    periodoCount++;  // Incrementa o contador de períodos
    disciplinaCounts[periodoCount] = 0;  // Inicializa o contador de disciplinas para o novo período

    const novoPeriodo = document.createElement('div');
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
    if (!document.getElementById('periodo1')) {
        criaPeriodo();  // Cria o primeiro período se ainda não existir
    }
};

// Função para calcular o resultado baseado na nota
function calcularResultado(periodo, disciplina) {
    const notaInput = document.getElementById(`periodo${periodo}-disciplina${disciplina}-nota1`);
    const resultadoSpan = document.getElementById(`periodo${periodo}-disciplina${disciplina}-resultado`);
    const nota = parseFloat(notaInput.value);

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

    // Atualiza o span para a menção correspondente
    resultadoSpan.textContent = resultado;
}

function adicionarDisciplina(periodo) {
    // Verifique se o periodoDiv existe
    const periodoDiv = document.getElementById(`periodo${periodo}-disciplinas`);
    console.log(periodoDiv);  // Adicione essa linha para depurar

    if (!periodoDiv) {
        console.error(`Elemento com id "periodo${periodo}-disciplinas" não encontrado.`);
        return;  // Retorna para evitar erro
    }

    disciplinaCounts[periodo]++;  // Incrementa o contador de disciplinas para o período específico

    const novaDisciplina = document.createElement('div');
    novaDisciplina.id = `periodo${periodo}-disciplina${disciplinaCounts[periodo]}`;
    novaDisciplina.classList.add("row", "g-3");
    novaDisciplina.innerHTML = `
        <div class="col-sm-4">
            <input type="text" id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-codigo" class="form-control" placeholder="Código da Disciplina">
        </div>
        <div class="col-sm-2">
            <select id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-resultado" class="form-control" onchange="atualizarStatus(${periodo}, ${disciplinaCounts[periodo]})">
              <option value="" selected disabled>Menção</option>
                <option value="SR">SR</option>
                <option value="II">II</option>
                <option value="MI">MI</option>
                <option value="MM">MM</option>
                <option value="MS">MS</option>
                <option value="SS">SS</option>
            </select>
        </div>
        <div class="col-sm-2" id="resultado-col-${periodo}-${disciplinaCounts[periodo]}" style="display: block;">
            <span id="periodo${periodo}-disciplina${disciplinaCounts[periodo]}-resultado">Resultado</span>
        </div>
    `;
    periodoDiv.appendChild(novaDisciplina);
}


// Função para atualizar o status de Aprovado/Reprovado
function atualizarStatus(periodo, disciplina) {
    const resultadoSelect = document.getElementById(`periodo${periodo}-disciplina${disciplina}-resultado`);
    const statusCol = document.getElementById(`status-col-${periodo}-${disciplina}`);
    const statusSpan = document.getElementById(`status-${periodo}-${disciplina}`);
    const resultadoSpan = document.getElementById(`periodo${periodo}-disciplina${disciplina}-resultado`);

    const resultado = resultadoSelect.value;

    // Exibe o status de Aprovado ou Reprovado com base na menção
    let status = "";

    if (resultado === "SS" || resultado === "MS" || resultado === "MM") {
        status = "Aprovado";
    } else if (resultado === "II" || resultado === "MI" || resultado === "SR") {
        status = "Reprovado";
    }

    // Atualiza o status na coluna de status
    statusSpan.textContent = status;
    statusCol.style.display = "block"; // Exibe a coluna de status

    // Atualiza o span de resultado
    resultadoSpan.textContent = resultado;
}
