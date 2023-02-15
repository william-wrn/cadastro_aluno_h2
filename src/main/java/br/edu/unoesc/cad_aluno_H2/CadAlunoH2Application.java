package br.edu.unoesc.cad_aluno_H2;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.edu.unoesc.cad_aluno_H2.Model.Aluno;
import br.edu.unoesc.cad_aluno_H2.Repository.AlunoRepository;

@SpringBootApplication
public class CadAlunoH2Application {

	public static void main(String[] args) {
		SpringApplication.run(CadAlunoH2Application.class, args);
	};

	@Bean
	CommandLineRunner commandLineRunner (AlunoRepository repositorio) {
		return args -> {
			Aluno a = new Aluno(null,"Ms. Adam",new BigDecimal("999.45"),LocalDate.of(2000,3,6));
			repositorio.save(a);
			a = new Aluno(null,"Ms. Brown",new BigDecimal("99499.99"),LocalDate.of(1876,1,31));
			repositorio.save(a);
			System.out.println(repositorio.findAll());
			Optional<Aluno> a2 = repositorio.findById(3);
			if (a2.isEmpty()) {
				System.out.println("Não encontrado");
			} else {
				System.out.println(a2.get());
				repositorio.delete(a2.get());
			}
		};

	}


}
