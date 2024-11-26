let periodoCount = 1;  // Para contar os períodos
let disciplinaCounts = {};  // Para contar as disciplinas por período

// Função para criar um novo período
function criaPeriodo() {
    periodoCount++;  // Incrementa o contador de períodos
    disciplinaCounts[periodoCount] = 1;  // Inicializa o contador de disciplinas para o novo período

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

// Função para adicionar uma disciplina ao período
function adicionarDisciplina(periodo) {
    const disciplinaCount = disciplinaCounts[periodo]++;  // Incrementa o contador de disciplinas para o período

    const periodoDiv = document.getElementById(`periodo${periodo}-disciplinas`);
    const novaDisciplina = document.createElement('div');
    novaDisciplina.id = `periodo${periodo}-disciplina${disciplinaCount}`;
    novaDisciplina.classList.add("row", "g-3");
    novaDisciplina.innerHTML = `
        <div class="col-sm-4">
            <input type="text" id="periodo${periodo}-disciplina${disciplinaCount}-codigo" class="form-control" placeholder="Código da Disciplina">
        </div>
        <div class="col-sm-2">
            <select id="periodo${periodo}-disciplina${disciplinaCount}-resultado" class="form-control">
                <option value="SR">SR</option>
                <option value="II">II</option>
                <option value="MI">MI</option>
                <option value="MM">MM</option>
                <option value="MS">MS</option>
                <option value="SS">SS</option>
            </select>
        </div>
        <div class="col-sm-2">
            <input type="number" id="periodo${periodo}-disciplina${disciplinaCount}-nota1" class="form-control" placeholder="Nota" min="0" max="10" oninput="calcularResultado(${periodo}, ${disciplinaCount})">
        </div>
    `;
    periodoDiv.appendChild(novaDisciplina);
}

// Função para calcular o resultado baseado na nota
function calcularResultado(periodo, disciplina) {
    const notaInput = document.getElementById(`periodo${periodo}-disciplina${disciplina}-nota1`);
    const resultadoSelect = document.getElementById(`periodo${periodo}-disciplina${disciplina}-resultado`);
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

    // Atualiza o select para a menção correspondente
    resultadoSelect.value = resultado;
}
