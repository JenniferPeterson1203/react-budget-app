import { useState } from 'react'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import {Stack} from 'react-bootstrap'
import BudgetCard from './components/BudgetCard.jsx'
import AddBudgetModal from './components/AddBudgetModal.jsx'
import AddExpenseModal from './components/AddExpenseModal.jsx'
import ViewExpensesModal from './components/ViewExpensesModal.jsx'
// import { BudgetsProvider } from './contexts/BudgetsContext.jsx'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext.jsx'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard.jsx'
import TotalBudgetCard from './components/TotalBudgetCard.jsx'
function App() {
  const {budgets, expenses, getBudgetExpenses} = useBudgets()
const [showAddBugetModal, setShowAddBudgetModal] = useState(false) 
const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)

function openAddExpenseModal(budgetId) {
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}
  return (
    <>
  <Container className='my-4'>
    <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className='me-auto'>Budgets</h1>
        {/* ADD BUDGET */}
        <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)}>Add Budget</Button>
        {/* ADD EXPENSE */}
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{display: "grid", gridTemplateRows: "repeat(auto:fill, minmax(300px, 1fr))", gap:"1rem", alignItems: "flex-start"}}>

      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => 
          total + expense.amount
        , 0)
        return (
          <BudgetCard
          key={budget.id}
          name={budget.name}
          amount={amount}
          max={budget.max}
          onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}

   
          />
        )
      })}
      
      <UncategorizedBudgetCard 
      onAddExpenseClick={openAddExpenseModal}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
      />
      <TotalBudgetCard />


    </div>
  
  </Container>
<AddBudgetModal show={showAddBugetModal} handleClose={()=> {
  setShowAddBudgetModal(false)
}}/>
<AddExpenseModal show={showAddExpenseModal} 
defaultBudgetId={addExpenseModalBudgetId}
handleClose={()=> {
  setShowAddExpenseModal(false)
}}/>
<ViewExpensesModal budgetId={viewExpensesModalBudgetId}
show={viewExpensesModalBudgetId != null}
handleClose={()=> {
  setViewExpensesModalBudgetId()
}}/>


    </>
 )
}

export default App
