let periodoCount = 1;
let disciplinaCount = 1;

function criaPeriodo() {
    periodoCount++;
    const novoPeriodo = document.createElement('div');
    novoPeriodo.id = `periodo${periodoCount}`;
    novoPeriodo.innerHTML = `
        <div class="d-flex justify-content-between">
            <h3>${periodoCount}º Período</h3>
            <button class="btn btn-primary" onclick="adicionarDisciplina(${periodoCount})">Adicionar Disciplina</button>
        </div>
        <div id="periodo${periodoCount}-disciplina1" class="row g-3">
            <div class="col-sm-4">
                <input type="text" id="periodo${periodoCount}-disciplina1-codigo" class="form-control" placeholder="Código da Disciplina">
            </div>
            <div class="col-sm-2">
                <input type="number" id="periodo${periodoCount}-disciplina1-nota1" class="form-control" placeholder="Nota" min="0" max="10" oninput="calcularResultado(${periodoCount}, 1)">
            </div>
            <div class="col-sm-2">
                <input type="text" id="periodo${periodoCount}-disciplina1-resultado" class="form-control" placeholder="Resultado" readonly>
            </div>
        </div>
    `;
    document.getElementById("container").appendChild(novoPeriodo);
}

function adicionarDisciplina(periodo) {
    disciplinaCount++;
    const periodoDiv = document.getElementById(`periodo${periodo}`);
    const novaDisciplina = document.createElement('div');
    novaDisciplina.id = `periodo${periodo}-disciplina${disciplinaCount}`;
    novaDisciplina.classList.add("row", "g-3");
    novaDisciplina.innerHTML = `
        <div class="col-sm-4">
            <input type="text" id="periodo${periodo}-disciplina${disciplinaCount}-codigo" class="form-control" placeholder="Código da Disciplina">
        </div>
        <div class="col-sm-2">
            <input type="number" id="periodo${periodo}-disciplina${disciplinaCount}-nota1" class="form-control" placeholder="Nota" min="0" max="10" oninput="calcularResultado(${periodo}, ${disciplinaCount})">
        </div>
        <div class="col-sm-2">
            <input type="text" id="periodo${periodo}-disciplina${disciplinaCount}-resultado" class="form-control" placeholder="Resultado" readonly>
        </div>
    `;
    periodoDiv.appendChild(novaDisciplina);
}

function calcularResultado(periodo, disciplina) {
    const notaInput = document.getElementById(`periodo${periodo}-disciplina${disciplina}-nota1`);
    const resultadoInput = document.getElementById(`periodo${periodo}-disciplina${disciplina}-resultado`);
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

    resultadoInput.value = resultado;  // Atribui a menção ao campo de "Resultado"
}

function checkLocalStorage() {
    // Função para verificar e carregar dados do localStorage, se necessário
}

function salvarDados() {
    var divContainer = document.getElementById('container');
    window.localStorage.clear(); // Limpa os dados existentes

    var periodos = divContainer.children;

    for (var i = 1; i < periodos.length; i++) {
        var periodo = {};
        var disciplinas = periodos[i].children;

        for (var j = 1; j < disciplinas.length; j++) {
            var disciplina = [];
            var camposDisciplina = disciplinas[j].children;
            disciplina.push(camposDisciplina[0].children[0].selectedIndex);
            disciplina.push(camposDisciplina[1].children[0].selectedIndex);
            periodo[j] = disciplina;
        }
        window.localStorage.setItem(i, JSON.stringify(periodo));
    }
}

function calculaIRA() {
    var numPeriodo = document.getElementById("container").childElementCount - 1;
    var totalDisciplinas = 0;

    var numeradorIra = 0;
    var denominadorIra = 0;

    var numeradorMp = 0;
    var denominadorMp = 0;

    for (var i = 1; i <= numPeriodo; i++) {
        var periodo = document.getElementById("periodo" + i);
        var numDisciplinas = periodo.childElementCount - 1;

        for (var j = 1; j <= numDisciplinas; j++) {
            var numCreditos = document.getElementById("periodo" + i + "-disciplina" + j + "-creditos").value;
            var mencao = parseInt(document.getElementById("periodo" + i + "-disciplina" + j + "-mencao").value);

            if (mencao != -1 && numCreditos != -1) {
                totalDisciplinas++;

                numeradorIra += mencao * parseInt(numCreditos) * Math.min(6, i);
                denominadorIra += parseInt(numCreditos) * Math.min(6, i);

                numeradorMp += mencao * parseInt(numCreditos);
                denominadorMp += parseInt(numCreditos);
            }
        }
    }

    var ira = numeradorIra / denominadorIra;
    var mp = numeradorMp / denominadorMp;

    if (ira != NaN && ira >= 0 && mp != NaN && mp >= 0) {
        document.getElementById("ira-mp").innerText = "IRA: " + ira.toFixed(4) + " MP: " + mp.toFixed(4);
    }
}
