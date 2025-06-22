
import {Button, Form, Modal} from "react-bootstrap"
import { useRef } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext"

export default function AddExpenseModal ({show, handleClose, defaultBudgetId}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef(defaultBudgetId)
    const {addExpense, budgets} = useBudgets()

function handleSubmit(event) {
    event.preventDefault()
    addExpense({
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: budgetIdRef.current.value
    })
handleClose()
 
}
 

  return (
<Modal show={show} onHide={handleClose}>
<Form onSubmit={handleSubmit}>
<Modal.Header closeButton>
<Modal.Title>New Expense</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control ref={descriptionRef} required type="text"  />
    </Form.Group>

        <Form.Group controlId="amount" className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control ref={amountRef} required type="number" min={0} step = {0.01}  />
    </Form.Group>

 <Form.Group controlId="budgetId" className="mb-3">
        <Form.Label>Budget</Form.Label>
        <Form.Select 
        defaultValue={defaultBudgetId}
        ref={budgetIdRef} >
            <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
            {budgets.map(budget => {
                return (
                    <option key={budget.id} value={budget.id}>
                        {budget.name}
                    </option>
                )
            })}
            </Form.Select>
    </Form.Group>

       

    <div className="d-flex justified-content-end">
        <Button variant="primary" type="submit">
            Add
        </Button>
    </div>
</Modal.Body>
</Form>
</Modal> 
 )
}

