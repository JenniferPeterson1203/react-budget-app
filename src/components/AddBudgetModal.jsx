
import {Button, Form, Modal} from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export default function AddBudgetModal ({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addBudget} = useBudgets()

function handleSubmit(event) {
    event.preventDefault()
    addBudget(
        {name:nameRef.current.value,
    max: parseFloat(maxRef.current.value)
})
handleClose()
    nameRef.current.value = ""
    maxRef.current.value = ""
}
 

  return (
<Modal show={show} onHide={handleClose}>
<Form onSubmit={handleSubmit}>
<Modal.Header closeButton>
<Modal.Title>New Budget</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Form.Group controlId="name" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control ref={nameRef} required type="text"  />
    </Form.Group>

        <Form.Group controlId="max" className="mb-3">
        <Form.Label>Maximum Spending</Form.Label>
        <Form.Control ref={maxRef} required type="number" min={0} step = {0.01}  />
    </Form.Group>
    <div className="d-flex justified-content-end">
        <Button variant="primary" type="submit">
            Add
        </Button>
    </div>
</Modal.Body>
</Form>
</Modal>  )
}

