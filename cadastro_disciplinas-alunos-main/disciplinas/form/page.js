'use client'

import Pagina from '@/components/Pagina';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; 

export default function CadastroDisciplina() {
  const [disciplina, setDisciplina] = useState({
    nome: '',
    descricao: '',
    status: 'Ativo', 
    curso: '',
    professor: ''
  });

  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const cursosLocalStorage = JSON.parse(localStorage.getItem("cursos")) || [];
    setCursos(cursosLocalStorage);

    const professoresLocalStorage = JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(professoresLocalStorage);
  }, []);

  
  const [professoresFiltrados, setProfessoresFiltrados] = useState([]);
  useEffect(() => {
    if (disciplina.curso) {
      const professoresFiltrados = professores.filter(professor => professor.cursoId === disciplina.curso);
      setProfessoresFiltrados(professoresFiltrados);
    } else {
      setProfessoresFiltrados([]); // Limpa os professores se nenhum curso estiver selecionado
    }
  }, [disciplina.curso, professores]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplina({ ...disciplina, [name]: value });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const disciplinasLocalStorage = JSON.parse(localStorage.getItem("disciplinas")) || [];
    disciplina.id = Date.now(); // Gera um ID único
    disciplinasLocalStorage.push(disciplina);
    localStorage.setItem('disciplinas', JSON.stringify(disciplinasLocalStorage));
    alert("Disciplina cadastrada com sucesso!");
    router.push('/disciplinas'); 
  };

  return (
    <Pagina titulo={"Cadastro de Disciplina"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={disciplina.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" name="descricao" value={disciplina.descricao} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" name="status" value={disciplina.status} onChange={handleChange}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCurso">
          <Form.Label>Curso</Form.Label>
          <Form.Control as="select" name="curso" value={disciplina.curso} onChange={handleChange} required>
            <option value="">Selecione um curso</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProfessor">
          <Form.Label>Professor</Form.Label>
          <Form.Control as="select" name="professor" value={disciplina.professor} onChange={handleChange} required>
            <option value="">Selecione um professor</option>
            {professoresFiltrados.map(professor => (
              <option key={professor.id} value={professor.id}>{professor.nome}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Cadastrar Disciplina</Button>
      </Form>
    </Pagina>
  );
}