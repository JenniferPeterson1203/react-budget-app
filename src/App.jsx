import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import {Stack} from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Container>
    <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className='me-auto'>Budgets</h1>
        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
    </Stack>
  
  </Container>
  )
}

export default App
