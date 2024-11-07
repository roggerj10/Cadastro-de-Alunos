'use client'

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; // Atualizado para usar o caminho correto

export default function CadastroAluno() {
  const [aluno, setAluno] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    faculdade: '',
    curso: '',
    periodo: '',
    matricula: '',
    foto: ''
  });

  const [faculdades, setFaculdades] = useState([]);
  const [cursos, setCursos] = useState([]);
  
  const router = useRouter(); // Use o useRouter aqui

  // Carregar faculdades do localStorage
  useEffect(() => {
    const faculdadesLocalStorage = JSON.parse(localStorage.getItem("faculdades")) || [];
    setFaculdades(faculdadesLocalStorage);
  }, []);

  // Filtrar cursos quando a faculdade for selecionada
  useEffect(() => {
    if (aluno.faculdade) {
      const cursosLocalStorage = JSON.parse(localStorage.getItem("cursos")) || [];
      const cursosFiltrados = cursosLocalStorage.filter(c => c.faculdadeId === aluno.faculdade);
      setCursos(cursosFiltrados);
    } else {
      setCursos([]); // Limpa os cursos se nenhuma faculdade estiver selecionada
    }
  }, [aluno.faculdade]);

  // Manipular mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  // Manipular o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || [];
    aluno.id = Date.now(); // Gera um ID único
    alunosLocalStorage.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(alunosLocalStorage));
    alert("Aluno cadastrado com sucesso!");
    router.push('/alunos'); // Redireciona para a lista de alunos
  };

  return (
    <Pagina titulo={"Cadastro de Aluno"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={aluno.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formSobrenome">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control type="text" name="sobrenome" value={aluno.sobrenome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={aluno.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control type="date" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="tel" name="telefone" value={aluno.telefone} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formFaculdade">
          <Form.Label>Faculdade</Form.Label>
          <Form.Control as="select" name="faculdade" value={aluno.faculdade} onChange={handleChange} required>
            <option value="">Selecione uma faculdade</option>
            {faculdades.map(faculdade => (
              <option key={faculdade.id} value={faculdade.id}>{faculdade.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control as="select" name="curso" value={aluno.curso} onChange={handleChange} required>
            <option value="">Selecione um curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPeriodo">
          <Form.Label>Período</Form.Label>
          <Form.Control type="text" name="periodo" value={aluno.periodo} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formMatricula">
          <Form.Label>Matrícula</Form.Label>
          <Form.Control type="text" name="matricula" value={aluno.matricula} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formFoto">
          <Form.Label>Foto</Form.Label>
          <Form.Control type="text" name="foto" value={aluno.foto} onChange={handleChange} placeholder="URL da foto" />
        </Form.Group>
        <Button variant="primary" type="submit">Cadastrar Aluno</Button>
      </Form>
    </Pagina>
  );
}
