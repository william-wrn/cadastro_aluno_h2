const FRONT = 'http://localhost:8080/';
const API = 'http://localhost:8080/api/alunos/';

window.onload = function (e) {
    listarAlunos();
};

function criarTabela(alunos) {
    const corpoTabela = document.querySelector('#alunos');
    corpoTabela.innerHTML = '';

    if (alunos) {
        const linhas = alunos.map(aluno => {
            const tdId = document.createElement('td');
            tdId.innerHTML = aluno.id;
    
            const tdNome = document.createElement('td');
            tdNome.innerHTML = aluno.nome;
    
            const tdNascimento = document.createElement('td');
            let shortDate = new Date(aluno.nascimento+" 00:00:00 GMT-03:00")
            tdNascimento.innerHTML = new Intl.DateTimeFormat('pt-BR').format(shortDate)

            const tdSalario = document.createElement('td');
            tdSalario.innerHTML = aluno.salario.toLocaleString('pt-BR', 
                                                            { 
                                                                currency: 'BRL', 
                                                                style: 'currency'
                                                            });
    
            const acaoAlterar = document.createElement('a');
            acaoAlterar.innerHTML = 'Alterar';
            acaoAlterar.setAttribute('href', FRONT + 'alterar_aluno.html?id=' + aluno.id);
            acaoAlterar.classList.add('btn', 'btn-primary', 'me-2');
    
            const acaoExcluir = document.createElement('a');
            acaoExcluir.innerHTML = 'Excluir';
            acaoExcluir.classList.add('btn', 'btn-danger');

            acaoExcluir.addEventListener('click', function (event) {
                if (confirm('Tem certeza que deseja excluir?')) {
                    axios.delete(API + aluno.id, { })
                        .then(res => {
                            //alert(res.data.mensagem);
                            listarAlunos();
                        });
                } 
            }, false);
    
            const tdAcoes = document.createElement('td');
            tdAcoes.appendChild(acaoAlterar);
            tdAcoes.appendChild(acaoExcluir);
    
            const tr = document.createElement('tr');
            tr.appendChild(tdId);
            tr.appendChild(tdNome);
            tr.appendChild(tdNascimento);
            tr.appendChild(tdSalario);
            tr.appendChild(tdAcoes);
    
            return tr;
        });
        
        linhas.forEach(linha => corpoTabela.appendChild(linha));
    }
}

async function listarAlunos() {
    const res = await axios.get(API, {});

    console.log('Resposta do servidor:', res);
    criarTabela(res.data);
}