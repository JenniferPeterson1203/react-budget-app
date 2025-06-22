
import {Button, Modal, Stack} from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export default function ViewExpensesModal ({budgetId, show, handleClose}) {
const{ getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()

const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} : budgets.find(budget => budget.id === budgetId)
 const expenses = getBudgetExpenses(budgetId)

  return (
<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>New Budget
<Stack direction="horizontal" gap={2} className="me-auto">
    <div>
        Expenses- {budget?.name}</div>
       {budgetId !== UNCATEGORIZED_BUDGET_ID && (
  <Button onClick={() => {
      deleteBudget(budget);
      handleClose();
    }}
    variant="outline-danger" >
    Delete
  </Button>
)}

</Stack>

</Modal.Title>
</Modal.Header>
<Modal.Body>

<Stack direction="vertical" gap="3">
    {expenses.map(expense => (
        <Stack direction="horizontal" gap="2" key={expense.id}> 
        <div className="me-auto fs-4">{expense.description}</div>
        <div className="me-auto fs-5">{currencyFormatter.format(expense.amount)}</div>
    <Button size="sm" variant="outline-danger">&times;</Button>
        </Stack>
    ))}
</Stack>
    </Modal.Body>
</Modal>  )
}

