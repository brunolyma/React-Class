import React, { useEffect, useState } from "react"
import "./style.css"
import { Card } from "../../components/Card"

export function Home() {

  const [studentName, setStudentName] = useState('')
  const [newStudent, setNewStudent] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })
  
  function handleAddNewStudent () {
    const student = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    if(!student.name == '') {
      setNewStudent(prevState => [...prevState, student])
    }
  }

  useEffect(() => {
    async function fetchData () {
      const response = await fetch('https://api.github.com/users/brunolyma')
      const data = await response.json()

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Espera</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil GitHub BrunoLyma" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite seu nome..."
        onBlur={(event) => setStudentName(event.target.value)}
      />

      <button type="button" onClick={handleAddNewStudent}>
        Adicionar
      </button>

      {
        newStudent.map(student => <Card key={student.time} name={student.name} time={student.time}  />)
      }

    </div>
  )
}
