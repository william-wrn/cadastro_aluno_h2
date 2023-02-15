let idForm, nomeForm, nascForm, salarioForm;
const sURL = 'http://localhost:8080/api/alunos/';

window.onload = function (e) {
    idForm = document.querySelector('#iID');
    nomeForm = document.querySelector('#iNome');
    nascForm = document.querySelector('#iNascimento');
    salarioForm = document.querySelector('#iSalario');
};

async function incluirAlunos() {
    const id = idForm.value;
    const nome = nomeForm.value; 
    const nascimento = nascForm.value;
    console.log(nascimento);
    const salario = salarioForm.value;

    axios.post(sURL, { id, nome: nome, nascimento: nascimento, salario: salario })
        .then(res => {
            res.data.toString = function() {
                return 'ID: ' + this.id + '\nNome: ' + this.nome +
                    '\nNascimento: ' + this.nascimento + '\nSalário: ' + this.salario;
                }

            alert(res.data.toString());
            console.log(res.data);
            setTimeout(() => window.location.href = '/', 100);
        })
        .catch(res => console.log(res.response.data));
}