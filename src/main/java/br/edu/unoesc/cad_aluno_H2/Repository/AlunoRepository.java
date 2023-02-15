package br.edu.unoesc.cad_aluno_H2.Repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.edu.unoesc.cad_aluno_H2.Model.Aluno;

public interface AlunoRepository extends CrudRepository<Aluno, Integer> {
	public List<Aluno> findByNomeContainingIgnoreCase(String nome);

	@Query("Select a from Aluno a where a.salario >= :salario")
	public List<Aluno> porSalario(@Param("salario") BigDecimal salario);

	@Query("Select a from Aluno a where a.nome like %:filtro% order by nome")
	public List<Aluno> findParteNome(@Param("filtro") String filtro);
}