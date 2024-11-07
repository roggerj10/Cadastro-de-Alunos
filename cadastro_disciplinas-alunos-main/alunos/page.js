'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    setAlunos(alunosLocalStorage)
  }, [])

  const excluir = (aluno) => {
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nome}?`)) {
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      setAlunos(novaLista)
      alert("Aluno excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Matricula</th>
            <th>Nome</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Periodo</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.sobrenome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.faculdade}</td>
              <td>{aluno.curso}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/alunos/form?id=${aluno.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(aluno)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
