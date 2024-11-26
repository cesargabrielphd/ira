// Variável global para acompanhar o número de períodos criados
let numeroPeriodos = 1;

// Função para inicializar o primeiro período ao carregar a página
window.onload = function () {
    criarPrimeiroPeriodo();
};

// Função que cria o primeiro período quando a página carrega
function criarPrimeiroPeriodo() {
    // Cria o primeiro período com as opções de adicionar disciplinas
    const periodoContainer = document.getElementById('periodosContainer');

    const periodoHTML = `
        <div id="periodo${numeroPeriodos}" class="periodo">
            <div class="alinhado">
                <h3>${numeroPeriodos}º Período</h3>
                <button class="btn btn-primary" onclick="adicionarDisciplina(${numeroPeriodos})">Adicionar Disciplina</button>
            </div>
            <div id="periodo${numeroPeriodos}-disciplinas">
                <!-- Disciplinas serão adicionadas aqui -->
            </div>
        </div>
    `;

    periodoContainer.innerHTML = periodoHTML;
}

// Função para criar um novo período ao clicar no botão
function criaPeriodo() {
    numeroPeriodos++;

    const novoPeriodo = document.createElement('div');
    novoPeriodo.id = `periodo${numeroPeriodos}`;
    novoPeriodo.classList.add('periodo');

    novoPeriodo.innerHTML = `
        <div class="alinhado">
            <h3>${numeroPeriodos}º Período</h3>
            <button class="btn btn-primary" onclick="adicionarDisciplina(${numeroPeriodos})">Adicionar Disciplina</button>
        </div>
        <div id="periodo${numeroPeriodos}-disciplinas">
            <!-- Disciplinas serão adicionadas aqui -->
        </div>
    `;

    const periodosContainer = document.getElementById('periodosContainer');
    periodosContainer.appendChild(novoPeriodo);
}

// Função para adicionar disciplina ao período específico
function adicionarDisciplina(periodo) {
    const numeroDisciplinas = document.querySelectorAll(`#periodo${periodo}-disciplinas .row`).length + 1;

    const novaDisciplina = document.createElement('div');
    novaDisciplina.classList.add('row', 'g-3');
    novaDisciplina.id = `periodo${periodo}-disciplina${numeroDisciplinas}`;

    novaDisciplina.innerHTML = `
        <div class="col-sm-4">
            <input type="text" id="periodo${periodo}-disciplina${numeroDisciplinas}-codigo" class="form-control" placeholder="Código da Disciplina">
        </div>
        <div class="col-sm-4">
            <input type="text" id="periodo${periodo}-disciplina${numeroDisciplinas}-nome" class="form-control" placeholder="Nome da Disciplina">
        </div>
        <div class="col-sm-2">
            <input type="number" id="periodo${periodo}-disciplina${numeroDisciplinas}-nota1" class="form-control" placeholder="Nota 1" min="0" max="10">
        </div>
        <div class="col-sm-2">
            <select id="periodo${periodo}-disciplina${numeroDisciplinas}-resultado" class="form-select">
                <option value="-1">Resultado</option>
                <option value="0">SR</option>
                <option value="1">II</option>
                <option value="2">MI</option>
                <option value="3">MM</option>
                <option value="4">MS</option>
                <option value="5">SS</option>
            </select>
        </div>
    `;

    const periodoDisciplinas = document.getElementById(`periodo${periodo}-disciplinas`);
    periodoDisciplinas.appendChild(novaDisciplina);
}

// Função para salvar os dados no localStorage (opcional)
function salvarPeriodos() {
    const periodos = [];
    const periodosElements = document.querySelectorAll('.periodo');
    periodosElements.forEach(periodoElement => {
        const periodoId = periodoElement.id.replace('periodo', '');
        const disciplinasElements = periodoElement.querySelectorAll('.row');
        const disciplinas = [];
        disciplinasElements.forEach(disciplinaElement => {
            const disciplinaId = disciplinaElement.id.replace(`periodo${periodoId}-disciplina`, '');
            const codigo = document.getElementById(`periodo${periodoId}-disciplina${disciplinaId}-codigo`).value;
            const nome = document.getElementById(`periodo${periodoId}-disciplina${disciplinaId}-nome`).value;
            const nota1 = document.getElementById(`periodo${periodoId}-disciplina${disciplinaId}-nota1`).value;
            const resultado = document.getElementById(`periodo${periodoId}-disciplina${disciplinaId}-resultado`).value;
            disciplinas.push({ id: disciplinaId, codigo, nome, nota1, resultado });
        });
        periodos.push({ id: periodoId, disciplinas });
    });
    localStorage.setItem('periodos', JSON.stringify(periodos));
}

// Função para verificar o localStorage ao carregar a página
function checkLocalStorage() {
    const periodosSalvos = JSON.parse(localStorage.getItem('periodos'));
    if (periodosSalvos) {
        periodosSalvos.forEach(periodo => {
            numeroPeriodos++;
            const novoPeriodo = document.createElement('div');
            novoPeriodo.id = `periodo${numeroPeriodos}`;
            novoPeriodo.classList.add('periodo');

            novoPeriodo.innerHTML = `
                <div class="alinhado">
                    <h3>${numeroPeriodos}º Período</h3>
                    <button class="btn btn-primary" onclick="adicionarDisciplina(${numeroPeriodos})">Adicionar Disciplina</button>
                </div>
                <div id="periodo${numeroPeriodos}-disciplinas">
                    ${periodo.disciplinas.map(disciplina => `
                        <div class="row g-3" id="periodo${numeroPeriodos}-disciplina${disciplina.id}">
                            <div class="col-sm-4">
                                <input type="text" id="periodo${numeroPeriodos}-disciplina${disciplina.id}-codigo" class="form-control" value="${disciplina.codigo}" placeholder="Código da Disciplina">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" id="periodo${numeroPeriodos}-disciplina${disciplina.id}-nome" class="form-control" value="${disciplina.nome}" placeholder="Nome da Disciplina">
                            </div>
                            <div class="col-sm-2">
                                <input type="number" id="periodo${numeroPeriodos}-disciplina${disciplina.id}-nota1" class="form-control" value="${disciplina.nota1}" placeholder="Nota 1" min="0" max="10">
                            </div>
                            <div class="col-sm-2">
                                <select id="periodo${numeroPeriodos}-disciplina${disciplina.id}-resultado" class="form-select">
                                    <option value="-1">Resultado</option>
                                    <option value="0" ${disciplina.resultado === 0 ? 'selected' : ''}>SR</option>
                                    <option value="1" ${disciplina.resultado === 1 ? 'selected' : ''}>II</option>
                                    <option value="2" ${disciplina.resultado === 2 ? 'selected' : ''}>MI</option>
                                    <option value="3" ${disciplina.resultado === 3 ? 'selected' : ''}>MM</option>
                                    <option value="4" ${disciplina.resultado === 4 ? 'selected' : ''}>MS</option>
                                    <option value="5" ${disciplina.resultado === 5 ? 'selected' : ''}>SS</option>
                                </select>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            document.getElementById('periodosContainer').appendChild(novoPeriodo);
        });
    }
}
