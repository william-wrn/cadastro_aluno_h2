let id, idForm, nomeForm, nascForm, salarioForm;
const sURL = 'http://localhost:8080/api/alunos/';

window.onload = async function (e) {
    const query = window.location.search;
    const parametros = new URLSearchParams(query);
    id = parametros.get('id');

    idForm = document.querySelector('#iID');
    nomeForm = document.querySelector('#iNome');
    nascForm = document.querySelector('#iNascimento');
    salarioForm = document.querySelector('#iSalario');

    const aluno = await buscarAluno(id);
    preencherForm(aluno);
};

function preencherForm(aluno) {
    idForm.value = aluno.id;
    nomeForm.value = aluno.nome;
    nascForm.value = aluno.nascimento;
    salarioForm.value = aluno.salario;
}

async function buscarAluno(id) {
    const resposta = await axios.get(sURL + id);
    console.log(resposta);
    return resposta.data;
}

async function alterarAluno() {
    const id = idForm.value;
    const nome = nomeForm.value; 
    const nascimento = nascForm.value;
    const salario = salarioForm.value;

    axios.put(sURL, { id, nome: nome, nascimento: nascimento, salario: salario })
        .then(res => {
            alert(JSON.stringify(res.data));
            console.log(res.data);
            setTimeout(() => window.location.href = '/', 100);
        })
        .catch(res => console.log(res.response.data));
}