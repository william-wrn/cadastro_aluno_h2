package br.edu.unoesc.cad_aluno_H2.Controller;

import java.util.List;
import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.edu.unoesc.cad_aluno_H2.Model.Aluno;
import br.edu.unoesc.cad_aluno_H2.Repository.AlunoRepository;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {
	@Autowired
	private AlunoRepository repositorio;

	@GetMapping("/find")
	List<Aluno> listarComFiltro(@RequestParam("filtro") String filtro){
		return repositorio.findParteNome(filtro);
	}

	//Add aluno
	@PostMapping
	public Aluno salvarAluno(@RequestBody Aluno aluno) {
		repositorio.save(aluno);
		return aluno;
	}

	// Busca aluno
	@GetMapping(value="/{id}")
	public Aluno findById(@PathVariable Integer id) {
		Optional<Aluno> a = repositorio.findById(id);
		if (!a.isEmpty()){
			return a.get();
		}
		return new Aluno();
	}

	//Alterar aluno
	@PutMapping
	public Aluno atualizarAluno(@RequestBody Aluno aluno) {
		Aluno a = findById(aluno.getId());

		a.setNome(aluno.getNome());
		a.setSalario(aluno.getSalario());
		a.setNascimento(aluno.getNascimento());
		
		repositorio.save(a);

		return a;
	}

	//Remover aluno
	@DeleteMapping("/{id}")
	public void deletarAluno(@PathVariable Integer id) {
		Optional<Aluno> a = repositorio.findById(id);
		if (!a.isEmpty()){
			repositorio.deleteById(a.get().getId());
		}
	}

	@GetMapping("/salario")
	public Iterable<Aluno> listarPorSalario(@RequestParam("salario") BigDecimal salario){
		return repositorio.porSalario(salario);
	}

	@GetMapping
	public Iterable<Aluno> listarTudo(){
		return repositorio.findAll();
	}
}
